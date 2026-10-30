/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MaterialEstimator } from './components/MaterialEstimator';
import { QuoteDrawer } from './components/QuoteDrawer';
import { CompareModal } from './components/CompareModal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { QualityAssurance } from './components/QualityAssurance';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PRODUCTS, MaterialProduct, QuoteItem } from './data/materials';
import { ShoppingCart, Scale, FileText } from 'lucide-react';

export default function App() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    // Seed with 2 realistic starter items so contractors immediately see how the RFQ schedule works
    return [
      { product: PRODUCTS[0], quantity: 100 }, // Grade 8.8 Hex Bolts
      { product: PRODUCTS[6], quantity: 20 },  // 16mm TMT Rebars
    ];
  });

  const [selectedProduct, setSelectedProduct] = useState<MaterialProduct | null>(null);
  const [compareList, setCompareList] = useState<MaterialProduct[]>([]);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('catalog');
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  // Map of quantities in quote for quick indicator on catalog cards
  const quoteItemMap = quoteItems.reduce((acc, item) => {
    acc[item.product.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const handleAddToQuote = (product: MaterialProduct, quantity: number) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddMultipleToQuote = (items: { product: MaterialProduct; quantity: number }[]) => {
    setQuoteItems((prev) => {
      let updated = [...prev];
      for (const item of items) {
        const idx = updated.findIndex((i) => i.product.id === item.product.id);
        if (idx > -1) {
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + item.quantity
          };
        } else {
          updated.push({ product: item.product, quantity: item.quantity });
        }
      }
      return updated;
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const handleToggleCompare = (product: MaterialProduct) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 2) {
        // replace second item
        return [prev[0], product];
      }
      return [...prev, product];
    });
    setIsCompareOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section via IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'catalog', 'estimator', 'projects', 'quality', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalQuoteQuantity = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Tier 2: Quota Exceeded Sticky Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        quoteItems={quoteItems}
        onOpenQuote={() => setIsQuoteOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenEstimator={() => handleNavigate('estimator')}
        />

        {/* Materials Catalog & Showcase */}
        <Catalog
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToQuote={handleAddToQuote}
          onCompareProduct={handleToggleCompare}
          compareList={compareList}
          quoteItemMap={quoteItemMap}
        />

        {/* Civil Material Estimator & Calculators */}
        <MaterialEstimator
          onAddMultipleToQuote={handleAddMultipleToQuote}
        />

        {/* Landmark Projects Showcase */}
        <ProjectShowcase />

        {/* Quality Assurance & Metallurgy Lab */}
        <QualityAssurance />

        {/* Contact & 24/7 Pour Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToQuote={handleAddToQuote}
          onCompareProduct={handleToggleCompare}
          isComparing={compareList.some((p) => p.id === selectedProduct.id)}
        />
      )}

      {/* Side-by-Side Comparison Modal */}
      {isCompareOpen && (
        <CompareModal
          compareList={compareList}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={(productId) => setCompareList((prev) => prev.filter((p) => p.id !== productId))}
          onAddToQuote={handleAddToQuote}
        />
      )}

      {/* Request for Quotation (RFQ) Drawer & Document Generator */}
      <QuoteDrawer
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        quoteItems={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
      />

      {/* Floating Compare Bar (if items chosen) */}
      {compareList.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-2.5 rounded-full bg-slate-900 border border-amber-500/60 px-4 py-2.5 text-xs font-bold text-amber-400 shadow-2xl hover:bg-slate-800 transition-all cursor-pointer backdrop-blur-md"
          >
            <Scale className="h-4 w-4 text-amber-400" />
            <span>Comparing ({compareList.length}/2 Materials)</span>
          </button>
        </div>
      )}

    </div>
  );
}
