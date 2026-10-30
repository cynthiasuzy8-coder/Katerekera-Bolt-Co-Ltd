import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  FileCheck, 
  Plus, 
  Minus, 
  Scale, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MaterialProduct } from '../data/materials';

interface ProductDetailModalProps {
  product: MaterialProduct | null;
  onClose: () => void;
  onAddToQuote: (product: MaterialProduct, quantity: number) => void;
  onCompareProduct: (product: MaterialProduct) => void;
  isComparing: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onCompareProduct,
  isComparing
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(product.minOrder);
  const [added, setAdded] = useState<boolean>(false);

  // Bulk discount calculation
  const getDiscountTier = (qty: number) => {
    if (qty >= product.minOrder * 10) return { percent: 12, label: 'Bulk Contractor Tier (12% Off)' };
    if (qty >= product.minOrder * 4) return { percent: 6, label: 'Trade Volume Tier (6% Off)' };
    return { percent: 0, label: 'Standard Trade Rate' };
  };

  const discount = getDiscountTier(quantity);
  const effectiveUnitPrice = product.price * (1 - discount.percent / 100);
  const lineTotal = effectiveUnitPrice * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + (product.minOrder > 10 ? 10 : 1));
  const handleDecrement = () => setQuantity((prev) => Math.max(product.minOrder, prev - (product.minOrder > 10 ? 10 : 1)));

  const handleAdd = () => {
    onAddToQuote(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-semibold">{product.sku}</span>
            <span>/</span>
            <span>{product.categoryLabel}</span>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Top Split: Image & Immediate Commercial Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image */}
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-700 px-2.5 py-1 text-xs font-semibold text-amber-400 rounded">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Quality & Dispatch Assurance */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Mill Certified: {product.standard}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                  <Truck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{product.leadTime}</span>
                </div>
              </div>
            </div>

            {/* Right: Title, Specs & Purchasing Module */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {product.name}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>Grade: <strong className="text-amber-300">{product.grade}</strong></span>
                  <span>·</span>
                  <span>Stock: <strong className="text-slate-200">{product.stockQty}</strong></span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.fullDesc}
              </p>

              {/* Contiguous Purchase Module */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Base Rate:</span>
                    <div className="text-2xl font-bold font-mono text-white tabular-nums">
                      ${effectiveUnitPrice.toFixed(2)}
                      <span className="text-xs font-normal text-slate-400 ml-1 font-sans">
                        /{product.unit.replace('per ', '')}
                      </span>
                    </div>
                  </div>
                  {discount.percent > 0 && (
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 font-semibold">{discount.label}</span>
                      <div className="text-xs text-slate-500 line-through font-mono">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity Stepper */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Order Quantity ({product.unit}):</span>
                    <span>Min: {product.minOrder}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900">
                      <button
                        onClick={handleDecrement}
                        className="px-3 py-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min={product.minOrder}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                        className="w-20 bg-transparent text-center font-mono font-bold text-sm text-white focus:outline-none"
                      />
                      <button
                        onClick={handleIncrement}
                        className="px-3 py-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex-1 text-right">
                      <span className="text-[11px] text-slate-400 block">Estimated Item Total:</span>
                      <span className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      added
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Added to RFQ Quote</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Add {quantity} to RFQ Quote</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onCompareProduct(product)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      isComparing
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                    title={isComparing ? 'Remove from comparison' : 'Compare with another material'}
                  >
                    <Scale className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Key Features Bullet List */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono mb-3">
              Engineering Features & Metallurgy
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              {product.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono mb-3">
              Certified Technical Parameters
            </h3>
            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="bg-slate-900/40">
                    <td className="py-2.5 px-4 font-semibold text-slate-400 w-1/3">Dimensions / Spec</td>
                    <td className="py-2.5 px-4 font-mono text-slate-200">{product.dimensions}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-400">Material Composition</td>
                    <td className="py-2.5 px-4 text-slate-200">{product.material}</td>
                  </tr>
                  <tr className="bg-slate-900/40">
                    <td className="py-2.5 px-4 font-semibold text-slate-400">Standard / Norm</td>
                    <td className="py-2.5 px-4 font-mono text-amber-300">{product.standard}</td>
                  </tr>
                  {product.specs.map((sp, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-slate-900/40'}>
                      <td className="py-2.5 px-4 font-semibold text-slate-400">{sp.label}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-200">{sp.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Applications & Recommended Site Pairings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Typical Structural Applications
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">›</span>
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Recommended On-Site Pairings
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.recommendedAccessories.map((acc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded px-2.5 py-1"
                  >
                    <span>{acc}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
