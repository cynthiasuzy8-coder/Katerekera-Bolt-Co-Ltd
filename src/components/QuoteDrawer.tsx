import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  FileText, 
  Printer, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import { QuoteItem, COMPANY_INFO } from '../data/materials';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote
}) => {
  const [showFormalDoc, setShowFormalDoc] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  // Contractor details
  const [contractorName, setContractorName] = useState('Apex Civil & Structural Contractors Ltd');
  const [contactPerson, setContactPerson] = useState('Eng. Brian Katende');
  const [phone, setPhone] = useState('+256 772 491 802');
  const [email, setEmail] = useState('procurement@apexcivil.co.ug');
  const [deliverySite, setDeliverySite] = useState('Plot 18, Namanve Industrial Zone, Sector 4');
  const [deliveryMethod, setDeliveryMethod] = useState<'crane' | 'tipper' | 'pickup'>('crane');
  const [projectType, setProjectType] = useState('Commercial Warehouse & Office Complex');
  const [specialNotes, setSpecialNotes] = useState('Ensure test certificates for Grade 8.8 bolts and 500B rebar are stamped.');

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = quoteItems.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  // Approximate weight calculation for trucking
  const estimatedWeightTonnes = quoteItems.reduce((acc, item) => {
    const p = item.product;
    if (p.unit.includes('tonne')) return acc + item.quantity;
    if (p.unit.includes('50kg bag')) return acc + (item.quantity * 0.05);
    if (p.unit.includes('12m length')) return acc + (item.quantity * 0.018); // ~18kg per 12m bar avg
    if (p.unit.includes('board')) return acc + (item.quantity * 0.031); // ~31kg per board
    if (p.unit.includes('sheet')) return acc + (item.quantity * 0.007); // ~7kg per sheet
    if (p.unit.includes('piece')) return acc + (item.quantity * 0.0004); // ~0.4kg per bolt avg
    return acc + (item.quantity * 0.001);
  }, 0);

  const deliveryFee = deliveryMethod === 'pickup' ? 0 : deliveryMethod === 'crane' ? 180 : 120;
  const grandTotal = subtotal + deliveryFee;

  const quoteRefNumber = `KBC-QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedRef(ref);
    setOrderSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
      
      {/* Drawer Panel */}
      <div 
        className="relative w-full max-w-xl h-full bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-display">
              Request for Quotation (RFQ)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close quote drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 space-y-6">
          
          {quoteItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-slate-600 mb-3" />
              <h3 className="text-sm font-semibold text-white">Your quote schedule is empty</h3>
              <p className="mt-1 text-xs text-slate-400">
                Browse our building materials catalog or use the civil estimator to add fasteners, steel, cement, or timber to your request.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400"
              >
                Return to Materials
              </button>
            </div>
          ) : (
            <>
              {/* Item List Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Selected Materials ({quoteItems.length} lines)</span>
                <button
                  onClick={onClearQuote}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear Schedule
                </button>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {quoteItems.map((item) => {
                  const lineTotal = item.product.price * item.quantity;
                  return (
                    <div
                      key={item.product.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-mono text-[11px] text-amber-400">{item.product.sku}</div>
                          <div className="font-bold text-white text-sm">{item.product.name}</div>
                          <div className="text-xs text-slate-400">
                            {item.product.dimensions} · {item.product.grade}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
                        {/* Stepper */}
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">Qty:</span>
                          <div className="flex items-center rounded border border-slate-800 bg-slate-900">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(item.product.minOrder, item.quantity - (item.product.minOrder > 10 ? 10 : 1)))}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + (item.product.minOrder > 10 ? 10 : 1))}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-slate-400 text-[11px]">{item.product.unit}</span>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-amber-400 text-sm tabular-nums">
                            ${lineTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tonnage & Logistics Alert */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estimated Total Net Cargo:</span>
                  <span className="font-mono font-bold text-white">~{estimatedWeightTonnes.toFixed(2)} Metric Tonnes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Recommended Vehicle:</span>
                  <span className="text-amber-400 font-medium">
                    {estimatedWeightTonnes > 15 ? 'Multi-Axle Flatbed / Crane Truck (20T - 30T)' : estimatedWeightTonnes > 5 ? '10-Wheel Tipper / Crane Truck' : 'Medium Flatbed Dispatch'}
                  </span>
                </div>
              </div>

              {/* Project & Delivery Form */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Site Delivery & Commercial Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Company / Contractor Name:</label>
                    <input
                      type="text"
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Site Contact Person:</label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Phone / WhatsApp:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Email Address:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Delivery Destination / Site Address:</label>
                  <input
                    type="text"
                    value={deliverySite}
                    onChange={(e) => setDeliverySite(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Logistics / Offloading Mode:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('crane')}
                      className={`p-2 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                        deliveryMethod === 'crane'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Flatbed Crane Offload
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('tipper')}
                      className={`p-2 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                        deliveryMethod === 'tipper'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Tipper Truck (Aggregates)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-2 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                        deliveryMethod === 'pickup'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Central Yard Pickup
                    </button>
                  </div>
                </div>
              </div>

              {/* Financial Totals */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Materials Subtotal:</span>
                  <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Site Offloading & Dispatch:</span>
                  <span className="font-mono text-white tabular-nums">
                    {deliveryFee === 0 ? 'Customer Self-Collect ($0.00)' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold text-white">
                  <span>Estimated Total (Excl. VAT):</span>
                  <span className="font-mono text-amber-400 text-base tabular-nums">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFormalDoc(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  <span>Generate Official Quotation Document</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>

      {/* FORMAL PRINTABLE QUOTATION MODAL */}
      {showFormalDoc && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-4xl bg-white text-slate-900 rounded-xl shadow-2xl p-6 md:p-10 space-y-8 print:p-0 print:border-none print:shadow-none print-container max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Actions (Hidden in Print) */}
            <div className="no-print flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Official Trade Quotation & Order Proposal
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setShowFormalDoc(false)}
                  className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Formal Quotation Letterhead */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 border-b-2 border-slate-900 pb-6">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 font-display">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-xs font-semibold text-amber-700 tracking-wide uppercase mt-0.5">
                  {COMPANY_INFO.tagline}
                </p>
                <div className="mt-3 text-xs text-slate-600 space-y-0.5">
                  <div>{COMPANY_INFO.address.yard}</div>
                  <div>{COMPANY_INFO.address.city} · {COMPANY_INFO.address.region}</div>
                  <div>Tel: {COMPANY_INFO.phone}</div>
                  <div>Email: {COMPANY_INFO.email}</div>
                  <div className="font-mono text-[11px] pt-1">
                    Reg: {COMPANY_INFO.regNumber} | TIN: {COMPANY_INFO.taxId}
                  </div>
                </div>
              </div>

              {/* Quote Reference Box */}
              <div className="sm:text-right space-y-1 text-xs">
                <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded font-mono font-bold text-slate-900 text-sm">
                  {quoteRefNumber}
                </div>
                <div className="text-slate-500 pt-1">Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="text-slate-500">Validity: 14 Business Days</div>
                <div className="text-slate-500">Payment Terms: 50% Advance / 50% at Offloading</div>
              </div>
            </div>

            {/* Bill To & Project Destination */}
            <div className="grid grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Customer / Contractor:
                </span>
                <div className="font-bold text-slate-900 text-sm">{contractorName}</div>
                <div className="text-slate-600">Attn: {contactPerson}</div>
                <div className="text-slate-600">Tel: {phone}</div>
                <div className="text-slate-600">Email: {email}</div>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Site Delivery Logistics:
                </span>
                <div className="font-medium text-slate-900">{deliverySite}</div>
                <div className="text-slate-600 capitalize">Mode: {deliveryMethod} Dispatch with Site Offloading</div>
                <div className="text-slate-600">Project: {projectType}</div>
                <div className="text-slate-600 font-mono">Gross Cargo Weight: ~{estimatedWeightTonnes.toFixed(2)} Tonnes</div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-hidden border border-slate-300 rounded">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-mono uppercase">
                  <tr>
                    <th className="py-2 px-3">Item / SKU</th>
                    <th className="py-2 px-3">Description & Grade</th>
                    <th className="py-2 px-3 text-right">Qty</th>
                    <th className="py-2 px-3 text-right">Unit Rate</th>
                    <th className="py-2 px-3 text-right">Total ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {quoteItems.map((item, idx) => {
                    const lTotal = item.product.price * item.quantity;
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-slate-50/50'}>
                        <td className="py-2 px-3 font-mono font-bold text-slate-800">
                          {item.product.sku}
                        </td>
                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900">{item.product.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {item.product.dimensions} · {item.product.grade} · {item.product.standard}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold tabular-nums">
                          {item.quantity} {item.product.unit.replace('per ', '')}
                        </td>
                        <td className="py-2 px-3 text-right font-mono tabular-nums">
                          ${item.product.price.toFixed(2)}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold tabular-nums">
                          ${lTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Commercial Summary */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
              <div className="sm:max-w-md text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-800 uppercase tracking-wider">Commercial Conditions:</div>
                <p>1. Mill test certificates (MTC) and BS compliance sheets will be handed over with delivery note.</p>
                <p>2. Offloading includes 2 hours crane operational window at project site.</p>
                <p>3. Payments via Bank Wire / RTGS or Verified Banker&apos;s Cheque to Katerekera Bolt Co Ltd.</p>
                {specialNotes && <p className="italic text-slate-700">Special Note: &ldquo;{specialNotes}&rdquo;</p>}
              </div>

              <div className="w-full sm:w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Materials Subtotal:</span>
                  <span className="font-mono font-bold tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Site Offloading & Dispatch:</span>
                  <span className="font-mono tabular-nums">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT (18% Statutory):</span>
                  <span className="font-mono tabular-nums">${(grandTotal * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t-2 border-slate-900 pt-2 text-sm font-bold text-slate-900">
                  <span>Grand Total:</span>
                  <span className="font-mono text-base tabular-nums">${(grandTotal * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Signature & Stamp Section */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 text-xs">
              <div>
                <div className="text-slate-500 mb-10">Prepared By (Katerekera Sales Engineering):</div>
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
                  Procurement & Dispatch Officer
                </div>
                <div className="text-slate-500">Katerekera Bolt Co Ltd · Official Stamp</div>
              </div>

              <div>
                <div className="text-slate-500 mb-10">Client Acceptance Signature & Date:</div>
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
                  Authorized Signatory
                </div>
                <div className="text-slate-500">{contractorName}</div>
              </div>
            </div>

            {/* Submission Section (No Print) */}
            <div className="no-print pt-4 border-t border-slate-200">
              {orderSubmitted ? (
                <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold text-emerald-900 text-sm">
                      RFQ Transmitted Successfully!
                    </div>
                    <div className="text-xs text-emerald-700">
                      Tracking Reference: <strong className="font-mono">{submittedRef}</strong>. Our logistics yard dispatch team has reserved your items and will call {phone} to coordinate delivery arrival.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 text-white p-4 rounded-lg">
                  <div className="text-xs">
                    <div className="font-bold">Ready to dispatch materials to {deliverySite}?</div>
                    <div className="text-slate-400">Our yard team will confirm loading bay allocation immediately.</div>
                  </div>
                  <button
                    onClick={handleSubmitOrder}
                    className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase text-slate-950 hover:bg-amber-400 transition-colors whitespace-nowrap cursor-pointer shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Request to Yard Dispatch</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
