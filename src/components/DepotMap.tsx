import React, { useState } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow 
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Truck, Warehouse, Phone, Clock, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';

interface DepotLocation {
  id: string;
  name: string;
  type: 'Central Yard & Weighbridge' | 'Regional Mill Depot' | 'Port / Logistics Hub';
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  features: string[];
}

const DEPOTS: DepotLocation[] = [
  {
    id: 'central-yard',
    name: 'Katerekera Central Distribution Yard & Weighbridge',
    type: 'Central Yard & Weighbridge',
    address: 'Plot 42 Heavy Industrial Zone, 6th Street Industrial Area, Kampala',
    lat: 0.3136,
    lng: 32.5811,
    phone: '+256 701 448 920',
    hours: 'Mon - Fri: 7:00 AM - 6:00 PM | Sat: 7:30 AM - 4:00 PM',
    features: ['80-Tonne Automated Weighbridge', '4 Overhead Gantry Cranes', 'Grade 8.8 Bolts & Steel Rebar Stock']
  },
  {
    id: 'namanve-depot',
    name: 'Namanve Heavy Steel & Roofing Logistics Hub',
    type: 'Regional Mill Depot',
    address: 'Namanve Industrial Business Park, South Corridor, Sector 4',
    lat: 0.3541,
    lng: 32.6982,
    phone: '+256 772 319 804',
    hours: 'Mon - Sat: 7:00 AM - 5:30 PM',
    features: ['Flatbed Fleet Dispatch', 'Heavy IBR Roofing Coils & Slitting', 'Structural IPE Beams']
  },
  {
    id: 'jinja-mill',
    name: 'Jinja Highway Primary Rebar Mill Stockyard',
    type: 'Regional Mill Depot',
    address: 'Jinja Road Industrial Corridor, Plot 12B, Mukono Logistics Yard',
    lat: 0.3582,
    lng: 32.7533,
    phone: '+256 750 992 100',
    hours: '24/7 Mill Loading by Booking',
    features: ['BS 4449 Grade 500B Rebars', 'Direct Rail & High-Tonnage Offloading', 'Batch MTC Lab']
  },
  {
    id: 'entebbe-expressway',
    name: 'Entebbe Airport Highway Civil Supply Depot',
    type: 'Port / Logistics Hub',
    address: 'Expressway Interchange Sector 2, Kajjansi Supply Yard',
    lat: 0.2185,
    lng: 32.5358,
    phone: '+256 772 491 802',
    hours: 'Mon - Fri: 7:30 AM - 5:00 PM',
    features: ['Concrete Anchor Assembly Point', '42.5N Cement Storage', 'Express Courier Dispatch']
  }
];

export const DepotMap: React.FC = () => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [selectedDepot, setSelectedDepot] = useState<DepotLocation | null>(DEPOTS[0]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0.3136, lng: 32.5811 });
  const [mapZoom, setMapZoom] = useState<number>(11);

  const handleSelectDepot = (depot: DepotLocation) => {
    setSelectedDepot(depot);
    setMapCenter({ lat: depot.lat, lng: depot.lng });
    setMapZoom(13);
  };

  if (!apiKey) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center text-xs text-slate-400">
        Google Maps API key not configured. Set VITE_GOOGLE_MAPS_API_KEY in your environment to view live dispatch locations.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden text-slate-100 shadow-xl">
      
      {/* Depot Header & Selector */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 mb-1">
            <Navigation className="h-4 w-4" />
            <span>Interactive Logistics Network</span>
            <span aria-hidden="true">·</span>
            <span>Google Maps Platform</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Central Distribution Yards & Mill Loading Depots
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a distribution hub below to pinpoint GPS coordinates, crane loading bays, and live truck dispatch radius.
          </p>
        </div>

        {/* Quick Hub Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {DEPOTS.map((depot) => {
            const isSelected = selectedDepot?.id === depot.id;
            return (
              <button
                key={depot.id}
                onClick={() => handleSelectDepot(depot)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {depot.name.split(' ')[0]} {depot.name.split(' ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map + Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Google Map Viewport (CF2: Explicit height mandatory) */}
        <div className="lg:col-span-8 relative h-[460px] w-full bg-slate-950">
          <APIProvider apiKey={apiKey} libraries={['marker']}>
            <Map
              mapId="DEMO_MAP_ID"
              center={mapCenter}
              zoom={mapZoom}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="h-full w-full"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              {DEPOTS.map((depot) => {
                const isSelected = selectedDepot?.id === depot.id;
                return (
                  <AdvancedMarker
                    key={depot.id}
                    position={{ lat: depot.lat, lng: depot.lng }}
                    title={depot.name}
                    onClick={() => handleSelectDepot(depot)}
                  >
                    <Pin
                      background={isSelected ? '#f59e0b' : '#0f172a'}
                      borderColor={isSelected ? '#ffffff' : '#f59e0b'}
                      glyphColor={isSelected ? '#000000' : '#f59e0b'}
                      scale={isSelected ? 1.25 : 1.0}
                    />
                  </AdvancedMarker>
                );
              })}

              {selectedDepot && (
                <InfoWindow
                  position={{ lat: selectedDepot.lat, lng: selectedDepot.lng }}
                  onCloseClick={() => setSelectedDepot(null)}
                  headerContent={
                    <div className="font-bold text-slate-950 text-xs font-display">
                      {selectedDepot.name}
                    </div>
                  }
                >
                  <div className="p-1 max-w-[240px] text-xs text-slate-800 space-y-1">
                    <p className="text-[11px] text-slate-600">{selectedDepot.address}</p>
                    <div className="font-semibold text-amber-700 text-[11px]">
                      {selectedDepot.type}
                    </div>
                    <div className="text-[11px] font-mono text-slate-700">{selectedDepot.phone}</div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>

          {/* Quick Map Overlay Controls */}
          <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] text-slate-300 pointer-events-none flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
            <span>Active Loading Dock Network · Live Fleet Radius</span>
          </div>
        </div>

        {/* Selected Hub Details Panel */}
        <div className="lg:col-span-4 p-6 bg-slate-950/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-6">
          {selectedDepot ? (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  {selectedDepot.type}
                </span>
                <h4 className="text-base font-bold text-white font-display">
                  {selectedDepot.name}
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-medium">{selectedDepot.address}</span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      GPS: {selectedDepot.lat.toFixed(4)}° N, {selectedDepot.lng.toFixed(4)}° E
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-800/80 pt-2.5">
                  <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Direct Yard Dispatch:</span>
                    <span className="text-white font-mono font-medium">{selectedDepot.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-800/80 pt-2.5">
                  <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Weighbridge & Gate Hours:</span>
                    <span className="text-slate-200">{selectedDepot.hours}</span>
                  </div>
                </div>
              </div>

              {/* Facility Capabilities */}
              <div className="border-t border-slate-800/80 pt-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Yard Features & Equipment:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedDepot.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">›</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Click a marker on the map to inspect depot loading capacity.
            </div>
          )}

          <div className="pt-4 border-t border-slate-800">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDepot?.lat || 0.3136},${selectedDepot?.lng || 32.5811}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
            >
              <Navigation className="h-4 w-4" />
              <span>Get Site Delivery Directions</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
