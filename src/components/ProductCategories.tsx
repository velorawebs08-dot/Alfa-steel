import React, { useState } from 'react';
import { PRODUCTS_SEQUENCE } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { ImageLightbox } from './ImageLightbox';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductCategoriesProps {
  onSelectForQuote?: (productName: string) => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onSelectForQuote }) => {
  const { t, language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
              {t.productsSection.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.productsSection.heading}
            </h2>
            <p className="mt-2 text-base text-slate-600">
              {t.productsSection.subtitle}
            </p>
          </div>

          {/* Extensible Info Pill */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-[#0062D2]" />
            <span>
              {language === 'mr' ? 'फूड-ग्रेड SS 304 / SS 202 मटेरियल पर्याय उपलब्ध' : 'Food-Grade SS304 / SS202 Material Options'}
            </span>
          </div>
        </div>

        {/* Product Grid strictly following the client sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_SEQUENCE.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onPreview={(p) => setSelectedProduct(p)}
              onSelectForQuote={onSelectForQuote}
            />
          ))}
        </div>

        {/* Note on Custom Fabrication */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">
              {language === 'mr' ? 'विशेष मापे किंवा नवीन उपकरणांची गरज आहे का?' : 'Need Custom Dimensions or Additional Equipment?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {language === 'mr'
                ? 'आम्ही आपल्या हॉटेल किंवा किचन लेआउटनुसार योग्य साईझ व डिझाइनमध्ये स्टेनलेस स्टील उपकरणे बनवून देतो.'
                : 'We fabricate custom kitchen counters, sinks, racks, and hot tables according to your kitchen layout and power requirements.'}
            </p>
          </div>
          <a
            href="#quote"
            className="shrink-0 bg-[#0062D2] hover:bg-[#0051B0] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            {language === 'mr' ? 'कोटेशन मिळवा' : 'Request Custom Quotation'}
          </a>
        </div>

      </div>

      {/* Lightbox for zooming */}
      {selectedProduct && (
        <ImageLightbox
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          image={selectedProduct.image}
          title={selectedProduct.name}
          category={selectedProduct.category}
          description={selectedProduct.description}
        />
      )}
    </section>
  );
};


