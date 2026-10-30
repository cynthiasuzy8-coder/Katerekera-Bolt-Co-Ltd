import React, { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Maximize2, 
  Check, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { PRODUCTS, MaterialProduct } from '../data/materials';

interface MaterialEstimatorProps {
  onAddMultipleToQuote: (items: { product: MaterialProduct; quantity: number }[]) => void;
}

export const MaterialEstimator: React.FC<MaterialEstimatorProps> = ({ onAddMultipleToQuote }) => {
  const [activeTab, setActiveTab] = useState<'concrete' | 'rebar' | 'roofing' | 'torque'>('concrete');
  const [transferredNotice, setTransferredNotice] = useState<string | null>(null);

  // Tab 1: Concrete batching state
  const [slabLength, setSlabLength] = useState<number>(10); // meters
  const [slabWidth, setSlabWidth] = useState<number>(6); // meters
  const [slabThickness, setSlabThickness] = useState<number>(150); // mm
  const [concreteClass, setConcreteClass] = useState<'C20' | 'C25' | 'C30'>('C25');

  // Concrete calculation
  const volumeM3 = (slabLength * slabWidth * (slabThickness / 1000));
  // Standard mix factors per m3 of concrete:
  // C20 (1:2:4) -> ~6.5 bags cement (50kg), 0.55 m3 (~0.85T) sand, 0.85 m3 (~1.35T) aggregate
  // C25 (1:1.5:3) -> ~7.5 bags cement, 0.50 m3 (~0.78T) sand, 0.82 m3 (~1.30T) aggregate
  // C30 (1:1:2) -> ~9.0 bags cement, 0.45 m3 (~0.70T) sand, 0.78 m3 (~1.25T) aggregate
  const cementBagsPerM3 = concreteClass === 'C20' ? 6.5 : concreteClass === 'C25' ? 7.6 : 9.2;
  const sandTonnesPerM3 = concreteClass === 'C20' ? 0.85 : concreteClass === 'C25' ? 0.78 : 0.70;
  const stoneTonnesPerM3 = concreteClass === 'C20' ? 1.35 : concreteClass === 'C25' ? 1.30 : 1.25;

  const totalCementBags = Math.ceil(volumeM3 * cementBagsPerM3 * 1.05); // 5% site waste
  const totalSandTonnes = Math.ceil(volumeM3 * sandTonnesPerM3 * 1.05);
  const totalStoneTonnes = Math.ceil(volumeM3 * stoneTonnesPerM3 * 1.05);

  // Tab 2: Rebar estimator state
  const [rebarAreaLength, setRebarAreaLength] = useState<number>(10);
  const [rebarAreaWidth, setRebarAreaWidth] = useState<number>(6);
  const [rebarDiameter, setRebarDiameter] = useState<number>(12); // mm
  const [rebarSpacing, setRebarSpacing] = useState<number>(200); // mm
  const [rebarLayers, setRebarLayers] = useState<number>(2); // top & bottom mesh

  // Rebar calculation
  const spacingM = rebarSpacing / 1000;
  const numBarsLengthwise = Math.ceil(rebarAreaWidth / spacingM) + 1;
  const numBarsWidthwise = Math.ceil(rebarAreaLength / spacingM) + 1;
  const totalMetersOneLayer = (numBarsLengthwise * rebarAreaLength) + (numBarsWidthwise * rebarAreaWidth);
  const totalMeters = totalMetersOneLayer * rebarLayers * 1.10; // 10% lap and bend allowance
  const total12mBars = Math.ceil(totalMeters / 12);
  
  // Weight factor: d^2 / 162 kg per meter
  const unitWeightKgPerM = (rebarDiameter * rebarDiameter) / 162;
  const totalRebarWeightKg = Math.round(totalMeters * unitWeightKgPerM);
  const totalRebarTonnes = (totalRebarWeightKg / 1000).toFixed(2);
  const bindingWireCoils = Math.max(1, Math.ceil(totalRebarWeightKg / 500)); // approx 1 coil (25kg) per 500-800kg rebar

  // Tab 3: Roofing sheets estimator state
  const [roofLength, setRoofLength] = useState<number>(14); // meters along gutter
  const [slopeWidth, setSlopeWidth] = useState<number>(6); // meters from eaves to ridge
  const [roofType, setRoofType] = useState<'gable' | 'mono'>('gable');

  // IBR effective cover is 686mm (0.686m)
  const effectiveWidthM = 0.686;
  const sheetsPerRun = Math.ceil(roofLength / effectiveWidthM);
  const runsPerSlope = Math.ceil(slopeWidth / 2.8); // 3.0m sheet with 200mm end lap = 2.8m net run
  const totalSheets = sheetsPerRun * runsPerSlope * (roofType === 'gable' ? 2 : 1);
  const ridgeCapPieces = roofType === 'gable' ? Math.ceil(roofLength / 2.2) : 0; // 2.4m piece with 200mm lap
  const roofingScrewsCount = Math.ceil(totalSheets * 14); // ~14 screws per 3m sheet

  // Tab 4: Bolt torque table
  const [selectedBoltSize, setSelectedBoltSize] = useState<string>('M16');
  const [selectedBoltGrade, setSelectedBoltGrade] = useState<'4.8' | '8.8' | '10.9'>('8.8');

  const boltTorqueMap: Record<string, Record<string, { torqueNm: number; proofLoadKN: number; embedmentMm: number }>> = {
    M12: { '4.8': { torqueNm: 25, proofLoadKN: 19.3, embedmentMm: 70 }, '8.8': { torqueNm: 75, proofLoadKN: 38.5, embedmentMm: 80 }, '10.9': { torqueNm: 105, proofLoadKN: 54.8, embedmentMm: 95 } },
    M16: { '4.8': { torqueNm: 60, proofLoadKN: 36.0, embedmentMm: 90 }, '8.8': { torqueNm: 190, proofLoadKN: 72.0, embedmentMm: 110 }, '10.9': { torqueNm: 265, proofLoadKN: 103.0, embedmentMm: 125 } },
    M20: { '4.8': { torqueNm: 120, proofLoadKN: 56.0, embedmentMm: 115 }, '8.8': { torqueNm: 375, proofLoadKN: 112.0, embedmentMm: 140 }, '10.9': { torqueNm: 520, proofLoadKN: 160.0, embedmentMm: 160 } },
    M24: { '4.8': { torqueNm: 205, proofLoadKN: 80.5, embedmentMm: 140 }, '8.8': { torqueNm: 650, proofLoadKN: 161.0, embedmentMm: 175 }, '10.9': { torqueNm: 910, proofLoadKN: 230.0, embedmentMm: 200 } },
    M30: { '4.8': { torqueNm: 410, proofLoadKN: 128.0, embedmentMm: 180 }, '8.8': { torqueNm: 1300, proofLoadKN: 256.0, embedmentMm: 220 }, '10.9': { torqueNm: 1820, proofLoadKN: 365.0, embedmentMm: 260 } },
  };

  const currentTorqueData = boltTorqueMap[selectedBoltSize]?.[selectedBoltGrade] || { torqueNm: 190, proofLoadKN: 72, embedmentMm: 110 };

  // Transfer helpers
  const handleTransferConcrete = () => {
    const cementProd = PRODUCTS.find((p) => p.id === 'cement-portland-425n') || PRODUCTS[5];
    const stoneProd = PRODUCTS.find((p) => p.id === 'aggregate-blue-stone-20mm') || PRODUCTS[7];
    const sandProd = PRODUCTS.find((p) => p.id === 'aggregate-river-sand-washed') || PRODUCTS[8];

    onAddMultipleToQuote([
      { product: cementProd, quantity: totalCementBags },
      { product: stoneProd, quantity: totalStoneTonnes },
      { product: sandProd, quantity: totalSandTonnes }
    ]);
    triggerNotice('Concrete materials (Cement, Stone, Sand) added to RFQ Quote!');
  };

  const handleTransferRebar = () => {
    const rebarProd = PRODUCTS.find((p) => p.id === (rebarDiameter === 16 ? 'steel-tmt-rebar-16mm' : 'steel-tmt-rebar-12mm')) || PRODUCTS[4];
    const wireProd = PRODUCTS.find((p) => p.id === 'hardware-binding-wire-coil') || PRODUCTS[3];

    onAddMultipleToQuote([
      { product: rebarProd, quantity: total12mBars },
      { product: wireProd, quantity: bindingWireCoils }
    ]);
    triggerNotice(`Rebar (${total12mBars} pcs) & Binding Wire (${bindingWireCoils} coils) added to RFQ!`);
  };

  const handleTransferRoofing = () => {
    const roofProd = PRODUCTS.find((p) => p.id === 'roofing-ibr-gauge28-charcoal') || PRODUCTS[11];
    const screwsProd = PRODUCTS.find((p) => p.id === 'fastener-tek-roofing-screws') || PRODUCTS[2];

    const items = [
      { product: roofProd, quantity: totalSheets },
      { product: screwsProd, quantity: roofingScrewsCount }
    ];

    if (ridgeCapPieces > 0) {
      const ridgeProd = PRODUCTS.find((p) => p.id === 'roofing-ridge-cap-g28');
      if (ridgeProd) items.push({ product: ridgeProd, quantity: ridgeCapPieces });
    }

    onAddMultipleToQuote(items);
    triggerNotice(`Roofing sheets (${totalSheets} pcs), Screws, and Ridge Caps added to RFQ!`);
  };

  const triggerNotice = (msg: string) => {
    setTransferredNotice(msg);
    setTimeout(() => setTransferredNotice(null), 3000);
  };

  return (
    <section id="estimator" className="w-full py-16 sm:py-24 bg-slate-900 border-t border-slate-800 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 mb-2">
            <span>Engineering Utilities</span>
            <span aria-hidden="true">·</span>
            <span>Site Quantity Estimator</span>
            <span aria-hidden="true">·</span>
            <span>BOM Transfer</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Civil Material Estimator & Fastener Advisor
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Calculate accurate material take-offs for concrete slabs, structural reinforcement steel, IBR roofing, and high-tensile bolt torque parameters. Instantly transfer required bill-of-quantities into your RFQ schedule.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setActiveTab('concrete')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'concrete'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Concrete & Slabs Mix
          </button>

          <button
            onClick={() => setActiveTab('rebar')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'rebar'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Structural Rebar & Binding Wire
          </button>

          <button
            onClick={() => setActiveTab('roofing')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'roofing'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            IBR Roofing & Tek Screws
          </button>

          <button
            onClick={() => setActiveTab('torque')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'torque'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Bolt Tightening & Torque Advisor
          </button>
        </div>

        {/* Transferred Notification Alert */}
        {transferredNotice && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs text-emerald-400">
            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="font-medium">{transferredNotice}</span>
          </div>
        )}

        {/* Tab Content Box */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8">
          
          {/* TAB 1: CONCRETE MIX */}
          {activeTab === 'concrete' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Slab & Footing Dimensions
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Length (meters):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={slabLength}
                      onChange={(e) => setSlabLength(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Width (meters):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={slabWidth}
                      onChange={(e) => setSlabWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Thickness (mm):</label>
                    <select
                      value={slabThickness}
                      onChange={(e) => setSlabThickness(parseInt(e.target.value))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-xs font-mono text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="100">100 mm (Paving / Light Slab)</option>
                      <option value="125">125 mm (Domestic Ground Slab)</option>
                      <option value="150">150 mm (Suspended Floor Slab)</option>
                      <option value="200">200 mm (Commercial Heavy Slab)</option>
                      <option value="250">250 mm (Raft Foundation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Concrete Design Class:</label>
                    <select
                      value={concreteClass}
                      onChange={(e) => setConcreteClass(e.target.value as any)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-xs font-mono text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="C20">Class 20 (1:2:4 - Standard Footings)</option>
                      <option value="C25">Class 25 (1:1.5:3 - Suspended Slabs)</option>
                      <option value="C30">Class 30 (1:1:2 - Heavy Columns & Tanks)</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-3 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <Info className="h-3.5 w-3.5 text-amber-500" />
                    <span>Includes 5% allowance for on-site batching and compaction loss.</span>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
                <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400">Total Concrete Volume:</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {volumeM3.toFixed(2)} m³
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">Portland 42.5N Cement</div>
                      <div className="text-xs text-slate-400">50kg Valve Bags</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-white tabular-nums">{totalCementBags} Bags</div>
                      <div className="text-xs text-slate-400 font-mono tabular-nums">
                        {(totalCementBags / 20).toFixed(1)} Metric Tonnes
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">20mm Granite Blue Stone</div>
                      <div className="text-xs text-slate-400">Clean Machine-Crushed Aggregate</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-white tabular-nums">{totalStoneTonnes} Tonnes</div>
                      <div className="text-xs text-slate-400">~{Math.ceil(totalStoneTonnes / 15)} Truckloads (15T)</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">Washed River Sand</div>
                      <div className="text-xs text-slate-400">Zero-Silt Coarse Concrete Sand</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-white tabular-nums">{totalSandTonnes} Tonnes</div>
                      <div className="text-xs text-slate-400">~{Math.ceil(totalSandTonnes / 15)} Truckloads (15T)</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTransferConcrete}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>Transfer Calculated Materials to RFQ</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: REBAR */}
          {activeTab === 'rebar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Reinforcement Grid Dimensions
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Slab Length (m):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={rebarAreaLength}
                      onChange={(e) => setRebarAreaLength(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Slab Width (m):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={rebarAreaWidth}
                      onChange={(e) => setRebarAreaWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Bar Diameter:</label>
                    <select
                      value={rebarDiameter}
                      onChange={(e) => setRebarDiameter(parseInt(e.target.value))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-2 text-xs font-mono text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="10">10 mm (Y10)</option>
                      <option value="12">12 mm (Y12)</option>
                      <option value="16">16 mm (Y16)</option>
                      <option value="20">20 mm (Y20)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Grid Spacing:</label>
                    <select
                      value={rebarSpacing}
                      onChange={(e) => setRebarSpacing(parseInt(e.target.value))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-2 text-xs font-mono text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="150">150 mm c/c</option>
                      <option value="200">200 mm c/c</option>
                      <option value="250">250 mm c/c</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Layers:</label>
                    <select
                      value={rebarLayers}
                      onChange={(e) => setRebarLayers(parseInt(e.target.value))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-2 text-xs font-mono text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="1">Single Mesh</option>
                      <option value="2">Double Mesh (Top & Btm)</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-3 text-xs text-slate-400">
                  <span>Calculated with 10% standard lap splice and anchor hook factor.</span>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
                <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400">Total Steel Tonnage:</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {totalRebarTonnes} Metric Tonnes
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">
                        BS 4449 Grade 500B ({rebarDiameter}mm)
                      </div>
                      <div className="text-xs text-slate-400">12.0 Meter Standard Mill Lengths</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-white tabular-nums">{total12mBars} Bars</div>
                      <div className="text-xs text-slate-400 font-mono">{totalRebarWeightKg.toLocaleString()} kg</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">16-Gauge Annealed Binding Wire</div>
                      <div className="text-xs text-slate-400">25kg Flexible Coils</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-white tabular-nums">{bindingWireCoils} Coils</div>
                      <div className="text-xs text-slate-400 font-mono">{bindingWireCoils * 25} kg Total</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTransferRebar}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>Transfer Rebar & Wire to RFQ</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ROOFING */}
          {activeTab === 'roofing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Roof Surface Dimensions
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Building Length (m):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={roofLength}
                      onChange={(e) => setRoofLength(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Slope Width / Rafter (m):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={slopeWidth}
                      onChange={(e) => setSlopeWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-sm font-mono text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Roof Geometry:</label>
                  <select
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-xs font-mono text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                  >
                    <option value="gable">Dual Pitch Gable Roof (2 Slopes + Center Apex Ridge)</option>
                    <option value="mono">Mono-Pitch / Shed Lean-To Roof (Single Slope)</option>
                  </select>
                </div>

                <div className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-3 text-xs text-slate-400">
                  <span>Based on Heavy Gauge 28 IBR profile (686mm net effective cover width).</span>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
                <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400">Total Roofing Sheets:</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {totalSheets} Sheets (3.0m)
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">Heavy IBR G28 Charcoal Sheets</div>
                      <div className="text-xs text-slate-400">3.0 Meter Lengths</div>
                    </div>
                    <div className="text-right font-mono font-bold text-white text-lg tabular-nums">
                      {totalSheets} Pcs
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-semibold text-white text-sm">Class 3 Tek Roofing Screws</div>
                      <div className="text-xs text-slate-400">65mm with EPDM Vulcanized Washers</div>
                    </div>
                    <div className="text-right font-mono font-bold text-white text-lg tabular-nums">
                      {roofingScrewsCount} Pcs
                    </div>
                  </div>

                  {ridgeCapPieces > 0 && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <div>
                        <div className="font-semibold text-white text-sm">Roll-Top Ridge Caps (2.4m)</div>
                        <div className="text-xs text-slate-400">Color-Matched Apex Seal</div>
                      </div>
                      <div className="text-right font-mono font-bold text-white text-lg tabular-nums">
                        {ridgeCapPieces} Pcs
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleTransferRoofing}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>Transfer Roofing & Fasteners to RFQ</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: BOLT TORQUE ADVISOR */}
          {activeTab === 'torque' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    High-Tensile Structural Bolt Tightening & Torque Advisor
                  </h3>
                  <p className="text-xs text-slate-400">
                    Calculated proof load, preload clamping tension, and installation torque guidelines according to DIN 931 / ISO 898-1.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Thread Size:</label>
                    <select
                      value={selectedBoltSize}
                      onChange={(e) => setSelectedBoltSize(e.target.value)}
                      className="rounded-lg border border-slate-800 bg-slate-900 py-1.5 px-3 text-xs font-mono text-amber-400 focus:outline-none cursor-pointer"
                    >
                      <option value="M12">M12</option>
                      <option value="M16">M16</option>
                      <option value="M20">M20</option>
                      <option value="M24">M24</option>
                      <option value="M30">M30</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Steel Grade:</label>
                    <select
                      value={selectedBoltGrade}
                      onChange={(e) => setSelectedBoltGrade(e.target.value as any)}
                      className="rounded-lg border border-slate-800 bg-slate-900 py-1.5 px-3 text-xs font-mono text-amber-400 focus:outline-none cursor-pointer"
                    >
                      <option value="4.8">Grade 4.8 (Standard Commercial)</option>
                      <option value="8.8">Grade 8.8 (High-Tensile Structural)</option>
                      <option value="10.9">Grade 10.9 (Heavy Civil Friction Grip)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Torque Output Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Recommended Torque</div>
                  <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {currentTorqueData.torqueNm} Nm
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    ~{Math.round(currentTorqueData.torqueNm * 0.7375)} lbf·ft
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Proof Tension Load</div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    {currentTorqueData.proofLoadKN} kN
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    ~{(currentTorqueData.proofLoadKN * 101.97).toFixed(0)} kg force
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Concrete Embedment Depth</div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    {currentTorqueData.embedmentMm} mm
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    C20/25 Anchor Minimum
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Engineering Note:</strong> For calibrated tensioning of Grade 8.8 and 10.9 bolts on bridge joints or crane runways, ensure threads are clean and lightly oiled. If hot-dip galvanized nuts and bolts are assembled dry, apply a torque multiplier factor of 1.15 to achieve design proof preload.
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
