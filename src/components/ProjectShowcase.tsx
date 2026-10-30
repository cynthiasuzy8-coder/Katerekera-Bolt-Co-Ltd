import React from 'react';
import { CASE_STUDIES } from '../data/materials';
import { Building2, CheckCircle2, Calendar, MapPin } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="w-full py-16 sm:py-24 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 mb-2">
            <span>Engineering Track Record</span>
            <span aria-hidden="true">·</span>
            <span>Civil Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Spans</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Landmark Projects Supplied
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            From regional highway flyover piers to high-bay industrial distribution logistics centers, contractors count on Katerekera Bolt Co Ltd for zero-defect materials and reliable site delivery timing.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition-all"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800 mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 text-xs font-mono text-amber-400">
                    {project.year}
                  </div>
                </div>

                <div className="text-xs text-slate-400 mb-1">{project.client}</div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-display">
                  {project.title}
                </h3>

                <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-amber-400">Materials Provided:</div>
                  <div className="text-slate-300">{project.materialsSupplied}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{project.impact}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
