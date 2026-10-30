import React from 'react';
import { X, Scale, Check, Plus, ArrowRight } from 'lucide-react';
import { MaterialProduct } from '../data/materials';

interface CompareModalProps {
  compareList: MaterialProduct[];
  onClose: () => void;
  onRemoveFromCompare: (productId: string) => void;
  onAddToQuote: (product: MaterialProduct, quantity: number) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  compareList,
  onClose,
  onRemoveFromCompare,
  onAddToQuote
}) => {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl p-6 md:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Scale className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-display">
              Side-by-Side Material Comparison
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {compareList.length === 1 ? (
          <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center space-y-3">
            <p className="text-sm text-slate-300">
              You have selected <strong>{compareList[0].name}</strong>.
            </p>
            <p className="text-xs text-slate-400">
              Click the scale icon (<Scale className="inline h-3.5 w-3.5 text-amber-400" />) on any other building material card in the catalog to see them compared side-by-side!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 gap-6 min-w-[600px]">
              {compareList.slice(0, 2).map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs text-amber-400">{item.sku}</span>
                      <h3 className="font-bold text-white text-base mt-1 line-clamp-1">{item.name}</h3>
                      <div className="text-xs text-slate-400">{item.categoryLabel}</div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCompare(item.id)}
                      className="text-slate-500 hover:text-red-400 text-xs p-1"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Price */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Unit Price:</span>
                    <span className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                      ${item.price.toFixed(2)} <span className="text-xs font-normal text-slate-400 font-sans">/{item.unit.replace('per ', '')}</span>
                    </span>
                  </div>

                  {/* Comparison Parameters */}
                  <div className="space-y-2 text-xs divide-y divide-slate-800/80">
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-400">Standard / Norm:</span>
                      <span className="font-mono text-slate-200">{item.standard}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-400">Material Grade:</span>
                      <span className="font-mono text-amber-300 font-bold">{item.grade}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-400">Dimensions:</span>
                      <span className="font-mono text-slate-200">{item.dimensions}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-400">Stock Availability:</span>
                      <span className="text-slate-200">{item.stockStatus}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-400">Minimum Order:</span>
                      <span className="font-mono text-slate-200">{item.minOrder} {item.unit.replace('per ', '')}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-slate-400 block mb-1">Key Applications:</span>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {item.applications.slice(0, 2).map((app, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-amber-500 font-bold">›</span>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => onAddToQuote(item, item.minOrder)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-bold uppercase text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add to RFQ Quote</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
