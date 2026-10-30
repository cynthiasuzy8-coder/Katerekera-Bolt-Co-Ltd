import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Truck, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';
import { DepotMap } from './DepotMap';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    materialCategory: 'Hardware & Fasteners',
    siteLocation: '',
    estimatedTonnage: 'Under 5 Tonnes',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 mb-2">
            <span>Direct Dispatch & Logistics</span>
            <span aria-hidden="true">·</span>
            <span>Warehouse Yard Depot</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Contact Katerekera Bolt Co Ltd & Yard Logistics
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Locate our central loading yard and regional mill stockyards on the interactive map, consult our structural material estimators, or submit your procurement schedule for bulk wholesale rate approval.
          </p>
        </div>

        {/* Interactive Google Map Component */}
        <div className="mt-10 mb-12">
          <DepotMap />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Yard Information & Emergency Hotline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Urgent Pour Hotline Card */}
            <div className="rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                <AlertCircle className="h-4 w-4" />
                <span>24/7 Concrete Pour & Emergency Site Dispatch</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Need Emergency Rebar, Fasteners, or Cement on Site?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Active slab pours cannot wait. Our emergency logistics team coordinates after-hours loading and crane dispatch for contractors with active operations.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${COMPANY_INFO.emergencyLine}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Emergency Dispatch: {COMPANY_INFO.emergencyLine}</span>
                </a>
              </div>
            </div>

            {/* Warehouse Depot Specs */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Central Distribution Yard
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">{COMPANY_INFO.address.yard}</strong>
                    <span>{COMPANY_INFO.address.city} · {COMPANY_INFO.address.region}</span>
                    <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                      GPS: {COMPANY_INFO.address.coordinates}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-800/80 pt-3">
                  <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Main Office & Sales Lines:</strong>
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-800/80 pt-3">
                  <Mail className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Email Departments:</strong>
                    <div>Orders: {COMPANY_INFO.email}</div>
                    <div>Procurement: {COMPANY_INFO.quoteEmail}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-800/80 pt-3">
                  <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Yard Loading Hours:</strong>
                    <span>{COMPANY_INFO.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-800/80 pt-3">
                  <Truck className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Yard Facilities & Fleet:</strong>
                    <span>{COMPANY_INFO.yardCapacity}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Procurement & Inquiry Form */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Direct Site Quote & Order Inquiry
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Submit your project material specifications or bill-of-quantities for same-day commercial assessment.
            </p>

            {submitted ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-8 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Inquiry Received Successfully</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A dedicated Katerekera technical sales engineer has been assigned to your request and will follow up within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eng. David Mugerwa"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Company / Contractor Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Pearl Infrastructure Ltd"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+256 7..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Primary Material Category Needed</label>
                    <select
                      value={formData.materialCategory}
                      onChange={(e) => setFormData({ ...formData, materialCategory: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Hardware & Fasteners">Structural Fasteners & Bolts (Grade 8.8 / Anchors)</option>
                      <option value="Structural Steel">Structural Steel (TMT Rebar 500B / IPE Beams)</option>
                      <option value="Cement & Aggregates">Cement (42.5N / 32.5R) & Crushed Stone</option>
                      <option value="Timber & Formwork">Marine Plywood & Pressure-Treated Timber</option>
                      <option value="Roofing & Cladding">IBR Heavy Gauge 28 Roofing Sheets</option>
                      <option value="Mixed BOQ Schedule">Comprehensive Mixed Bill of Quantities</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Estimated Order Scale / Tonnage</label>
                    <select
                      value={formData.estimatedTonnage}
                      onChange={(e) => setFormData({ ...formData, estimatedTonnage: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Under 5 Tonnes">Small Batch / Under 5 Tonnes</option>
                      <option value="5 - 20 Tonnes">Standard Site Order (5 - 20 Tonnes)</option>
                      <option value="20 - 100 Tonnes">Major Civil Contract (20 - 100 Tonnes)</option>
                      <option value="100+ Tonnes">Mega Infrastructure / Direct Mill Supply (100+ Tonnes)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Site Delivery Address or Town</label>
                  <input
                    type="text"
                    value={formData.siteLocation}
                    onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                    placeholder="e.g. Entebbe Expressway Junction / Kampala CBD / Jinja Industrial"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Project Details / Specific Sizes Needed</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide required bolt diameters (e.g., M16 x 80mm), rebar sizes (Y16, Y20), or specific delivery dates..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Inquiry to Commercial Sales</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
