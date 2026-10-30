import React, { useState } from 'react';
import { ShoppingCart, Menu, X, PhoneCall, ShieldCheck, Hammer } from 'lucide-react';
import { COMPANY_INFO, QuoteItem } from '../data/materials';

interface NavbarProps {
  quoteItems: QuoteItem[];
  onOpenQuote: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteItems,
  onOpenQuote,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'catalog', label: 'Materials' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'projects', label: 'Projects' },
    { id: 'quality', label: 'Testing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand title, single line */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('top'); }} 
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10 group-hover:bg-amber-400 transition-colors">
            <Hammer className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white uppercase font-display group-hover:text-amber-400 transition-colors">
            Katerekera Bolt Co.
          </span>
        </a>

        {/* Zone 2: 4-5 concise nav links, single line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                  isActive
                    ? 'text-amber-400 border-b-2 border-amber-500 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuote}
            className="relative flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 hover:bg-amber-400 active:scale-95 transition-all whitespace-nowrap shrink-0 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>RFQ Quote</span>
            {totalItemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[11px] font-bold text-amber-400 tabular-nums">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400 text-left"
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="text-amber-500 text-xs">●</span>}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-300">
              <PhoneCall className="h-3.5 w-3.5 text-amber-500" />
              <span>Direct Sales: {COMPANY_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
              <span>Mill Certifications & BS 4449 Standard</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
