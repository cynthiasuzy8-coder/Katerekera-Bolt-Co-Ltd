import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Check, 
  FileText, 
  Layers, 
  Grid3X3, 
  Table as TableIcon, 
  ArrowUpDown,
  Scale
} from 'lucide-react';
import { MaterialProduct, CATEGORIES } from '../data/materials';

interface CatalogProps {
  products: MaterialProduct[];
  onSelectProduct: (product: MaterialProduct) => void;
  onAddToQuote: (product: MaterialProduct, quantity: number) => void;
  onCompareProduct: (product: MaterialProduct) => void;
  compareList: MaterialProduct[];
  quoteItemMap: Record<string, number>;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onSelectProduct,
  onAddToQuote,
  onCompareProduct,
  compareList,
  quoteItemMap
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Stock filter
      if (inStockOnly && item.stockStatus !== 'In Stock') {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        const matchesGrade = item.grade.toLowerCase().includes(query);
        const matchesMaterial = item.material.toLowerCase().includes(query);
        const matchesStandard = item.standard.toLowerCase().includes(query);
        const matchesDesc = item.shortDesc.toLowerCase().includes(query);
        return matchesName || matchesSku || matchesGrade || matchesMaterial || matchesStandard || matchesDesc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [products, selectedCategory, inStockOnly, searchQuery, sortBy]);

  const handleQuickAdd = (product: MaterialProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToQuote(product, product.minOrder);
    setAddedNoticeId(product.id);
    setTimeout(() => {
      setAddedNoticeId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  return (
    <section id="catalog" className="w-full py-16 sm:py-24 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 mb-2">
              <span>Industrial Inventory</span>
              <span aria-hidden="true">·</span>
              <span>Direct Mill Supply</span>
              <span aria-hidden="true">·</span>
              <span>All Grades Certified</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Building Materials Catalog
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Select verified structural components, fasteners, reinforcement steel, cement, and timber. Add items to your active RFQ schedule for instant trade quotes.
            </p>
          </div>

          {/* Quick Stats or Actions */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Displaying <strong className="text-amber-400">{filteredProducts.length}</strong> of {products.length} materials
            </span>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-8 space-y-4">
          
          {/* Category Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search, Sorting, and View Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, SKU (e.g. KBC-BLT), grade (8.8, 500B), or DIN..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="lg:col-span-3 relative">
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured & Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Alphabetical (A - Z)</option>
                </select>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="lg:col-span-2 flex items-center">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* View Mode Toggle */}
            <div className="lg:col-span-2 flex items-center justify-end gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Technical table view"
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span>Specs</span>
              </button>
            </div>

          </div>

        </div>

        {/* Catalog Content */}
        {filteredProducts.length === 0 ? (
          <div className="mt-16 rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <Layers className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <h3 className="text-lg font-semibold text-white">No building materials match your filters</h3>
            <p className="mt-1 text-sm text-slate-400">
              Try clearing your search query or switching categories.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setInStockOnly(false); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-amber-400 bg-slate-800 rounded-lg hover:bg-slate-700"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const inQuoteQty = quoteItemMap[product.id] || 0;
              const isComparing = compareList.some((item) => item.id === product.id);
              const isAdded = addedNoticeId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer"
                >
                  {/* Card Media Slot */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800/80 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Quiet Status / Badge */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-700/80 px-2 py-0.5 text-[11px] font-semibold text-amber-400 rounded">
                          {product.badge}
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                        <span className="font-mono text-[11px] text-amber-400">{product.sku}</span>
                        <span className="text-[11px] text-slate-400">{product.stockStatus}</span>
                      </div>
                    </div>

                    {/* Quiet Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{product.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{product.standard}</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-display line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Key Technical Highlights */}
                    <div className="mt-2 space-y-1 text-xs text-slate-300">
                      <div className="flex justify-between border-b border-slate-800/60 pb-1">
                        <span className="text-slate-400">Dimensions:</span>
                        <span className="font-mono text-slate-200 text-right">{product.dimensions}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/60 py-1">
                        <span className="text-slate-400">Grade / Rating:</span>
                        <span className="font-mono text-amber-300 text-right">{product.grade}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Material:</span>
                        <span className="text-slate-300 text-right truncate max-w-[170px]">{product.material}</span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Card Bottom: Pricing & Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-400">Trade Price</div>
                      <div className="text-lg font-bold text-white font-mono tabular-nums">
                        ${product.price.toFixed(2)}
                        <span className="text-xs font-normal text-slate-400 ml-1 font-sans">
                          /{product.unit.replace('per ', '')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCompareProduct(product);
                        }}
                        className={`p-2 rounded-lg border transition-colors ${
                          isComparing
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                        title={isComparing ? 'Remove from compare' : 'Compare with another item'}
                      >
                        <Scale className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500 text-slate-950'
                            : inQuoteQty > 0
                            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                            : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Added</span>
                          </>
                        ) : inQuoteQty > 0 ? (
                          <>
                            <span>In Quote ({inQuoteQty})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add RFQ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Technical Specification Table View */
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">SKU / Material Name</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Dimensions</th>
                  <th className="py-3.5 px-4 font-semibold">Grade & Standard</th>
                  <th className="py-3.5 px-4 font-semibold">Lead Time & Stock</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Unit Price</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((product) => {
                  const inQuoteQty = quoteItemMap[product.id] || 0;
                  return (
                    <tr
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="hover:bg-slate-850/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-amber-400 text-[11px]">{product.sku}</div>
                        <div className="font-semibold text-white text-sm">{product.name}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{product.categoryLabel}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{product.dimensions}</td>
                      <td className="py-3.5 px-4">
                        <div className="text-amber-300 font-mono">{product.grade}</div>
                        <div className="text-slate-400 text-[11px]">{product.standard}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200">{product.stockStatus}</div>
                        <div className="text-slate-400 text-[11px]">{product.leadTime}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="font-mono text-sm font-bold text-white tabular-nums">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="text-slate-400 text-[11px]">{product.unit}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(product, e)}
                          className="rounded bg-amber-500 px-3 py-1.5 text-xs font-bold uppercase text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
                        >
                          {inQuoteQty > 0 ? `In Quote (${inQuoteQty})` : '+ Add RFQ'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
