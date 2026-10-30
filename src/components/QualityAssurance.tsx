import React from 'react';
import { ShieldCheck, FileCheck, Scale, Award, Microscope, CheckCircle } from 'lucide-react';

export const QualityAssurance: React.FC = () => {
  const qualityPillars = [
    {
      title: 'Tensile & Yield Calibration',
      desc: 'All structural bolts and TMT rebars undergo pull-testing on our 1,000 kN calibrated universal test machine to verify strict BS 4449 Grade 500B and ISO 898-1 proof parameters.',
      standard: 'ISO 6892-1 / ASTM E8'
    },
    {
      title: 'Chemical & Carbon Equivalent Analysis',
      desc: 'Strict carbon equivalent (Ceq ≤ 0.51%) monitoring ensures our reinforcement steel and structural hollow sections possess outstanding site weldability without brittleness.',
      standard: 'BS 4449:2005 Annex C'
    },
    {
      title: 'Zinc Coating & Corrosion Audit',
      desc: 'Micro-thickness electromagnetic testing ensures electroplated bolts and AZ150 Aluzinc roofing coils deliver maximum tropical rust resistance under aggressive humidity.',
      standard: 'ASTM B117 / AS 3566.2'
    },
    {
      title: '80-Tonne Certified Weighbridge',
      desc: 'Our automated heavy axle weighbridge ensures 100% accurate net material tonnage on all bulk aggregate tipper trucks and steel flatbed consignments, backed by stamped scale slips.',
      standard: 'Weights & Measures Certified'
    }
  ];

  return (
    <section id="quality" className="w-full py-16 sm:py-24 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 mb-2">
            <span>Quality Verification Lab</span>
            <span aria-hidden="true">·</span>
            <span>Zero Failure Tolerance</span>
            <span aria-hidden="true">·</span>
            <span>ISO Standard Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Laboratory Testing & Mill Standards
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Every batch of fasteners, steel rebar, structural timber, and cement entering the Katerekera Bolt Co central supply yard is audited before entering site circulation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] text-amber-500">{pillar.standard}</span>
                </div>

                <h3 className="text-base font-bold text-white font-display">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-2 border-t border-slate-800/80">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Certificate Supplied with Batch</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mill Certificate Banner */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white font-display">
              Need Manufacturer Mill Test Certificates (MTC) for Project Submittals?
            </h4>
            <p className="text-xs text-slate-400 max-w-2xl">
              We provide formal EN 10204 Type 3.1 inspection certificates, chemical composition heats, and bend/re-bend test data for civil engineers and consulting structural inspectors.
            </p>
          </div>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors whitespace-nowrap"
          >
            <FileCheck className="h-4 w-4 text-amber-400" />
            <span>Request QA Submittal Pack</span>
          </a>
        </div>

      </div>
    </section>
  );
};
