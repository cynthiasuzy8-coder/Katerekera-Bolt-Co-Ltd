import React from 'react';
import { Hammer, ShieldCheck, PhoneCall, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Registration */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-slate-950 font-bold">
                <Hammer className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white uppercase font-display">
                Katerekera Bolt Co.
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Industrial stockist and direct importer of high-tensile structural bolts, BS 4449 Grade 500B reinforcement rebar, cement, and building supplies.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              <div>{COMPANY_INFO.regNumber}</div>
              <div>{COMPANY_INFO.taxId}</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Materials & Services
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Hardware & High-Tensile Bolts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Structural Steel & Rebar 500B
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Portland Cement 42.5N & Aggregates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Marine Shuttering Plywood & Timber
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Heavy IBR Gauge 28 Roofing Sheets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Engineering Tools
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('estimator')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Concrete Batching & Slabs Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('estimator')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Rebar Tonnage & Wire Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('estimator')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Bolt Tightening Torque Advisor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Mill Test Certifications (MTC)
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Generate Formal RFQ Quotation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Warehouse Depot */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Central Depot
            </h4>
            <div className="space-y-1 text-slate-400 text-xs">
              <p>{COMPANY_INFO.address.yard}</p>
              <p>{COMPANY_INFO.address.city}</p>
              <p className="font-mono text-[11px] text-amber-500">{COMPANY_INFO.phone}</p>
              <p className="text-slate-500 text-[11px] pt-1">{COMPANY_INFO.operatingHours}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Registered Industrial Supplier.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BS 4449 Standard</span>
            <span aria-hidden="true">·</span>
            <span>DIN 931 / ISO 4014</span>
            <span aria-hidden="true">·</span>
            <span>EN 197-1 Cement</span>
            <span aria-hidden="true">·</span>
            <span>ASTM A792 Aluzinc</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
