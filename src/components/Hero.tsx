import React from 'react';
import { ArrowDown, Calculator, Shield, Truck, Award, Layers } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenEstimator }) => {
  return (
    <div id="top" className="relative w-full overflow-hidden border-b border-slate-800 bg-slate-950">
      {/* Background Media with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg"
          alt="Katerekera Bolt Co Ltd heavy building materials and structural steel distribution yard"
          className="h-full w-full object-cover object-center brightness-[0.42] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Quiet Unboxed Editorial Kicker */}
          <div className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>Direct Mill Importer & Stockist</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2012</span>
            <span aria-hidden="true">·</span>
            <span>East Africa Logistics</span>
          </div>

          {/* Balanced Display Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-display leading-[1.1] text-balance">
            Heavy Structural Fasteners & Building Materials Built to Endure.
          </h1>

          {/* Subtitle Description */}
          <p className="mt-6 text-base text-slate-300 sm:text-lg sm:leading-relaxed max-w-2xl">
            Katerekera Bolt Co Ltd supplies commercial contractors, civil engineers, and developers with mill-certified Grade 8.8 structural bolts, BS 4449 Grade 500B steel rebar, 42.5N cement, IBR roofing, and formwork timber directly to your site.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreCatalog}
              className="flex items-center gap-2.5 rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              <span>Explore Materials Catalog</span>
              <ArrowDown className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenEstimator}
              className="flex items-center gap-2.5 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all backdrop-blur-sm cursor-pointer"
            >
              <Calculator className="h-4 w-4 text-amber-400" />
              <span>Civil Material Estimator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Column Operational Rigor Strip */}
      <div className="relative z-10 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono tabular-nums">5,000+ Tonnes</div>
                <div className="text-xs text-slate-400">Central Yard Stock Capacity</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">BS & DIN Standard</div>
                <div className="text-xs text-slate-400">Full Batch Mill Test Certs</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">Same-Day Dispatch</div>
                <div className="text-xs text-slate-400">Crane Truck Site Offloading</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">Direct Wholesale</div>
                <div className="text-xs text-slate-400">Contractor Tiered Discounts</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
