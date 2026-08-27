import React from 'react';
import { Eye, MessageSquare, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';
import { Product } from '../types';
import { getWhatsAppUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  index: number;
  onPreview: (product: Product) => void;
  onSelectForQuote?: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onPreview,
  onSelectForQuote,
}) => {
  const { language } = useLanguage();
  const whatsappMsg = `Hello Alfa Steel, I want to enquire about Product #${index + 1}: "${product.name}". Please provide specifications & quotation.`;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 select-none"
        />

        {/* Sequence Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
          {language === 'mr' ? `उत्पादन क्रमांक #${String(index + 1).padStart(2, '0')}` : `Item #${String(index + 1).padStart(2, '0')}`}
        </div>

        {product.isPopular && (
          <div className="absolute top-3 right-3 bg-[#0062D2] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
            {language === 'mr' ? 'कमर्शियल सिरीज' : 'Commercial Line'}
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            id={`preview-btn-${product.id}`}
            onClick={() => onPreview(product)}
            className="p-2.5 rounded-full bg-white text-slate-900 hover:bg-blue-50 hover:text-[#0062D2] shadow-md transition-transform transform scale-90 group-hover:scale-100"
            title="Zoom product photo"
            aria-label={`Zoom photo of ${product.name}`}
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0062D2]">
            {product.category}
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0062D2] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Quick Specifications */}
          {product.material && (
            <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{product.material}</span>
            </div>
          )}

          {product.dimensions && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Ruler className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{product.dimensions}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <a
            id={`whatsapp-btn-${product.id}`}
            href={getWhatsAppUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'mr' ? 'व्हॉट्सअ‍ॅपवर विचारा' : 'Enquire on WhatsApp'}</span>
          </a>

          <a
            id={`quote-btn-${product.id}`}
            href="#quote"
            onClick={(e) => {
              if (onSelectForQuote) {
                onSelectForQuote(product.name);
              }
            }}
            className="inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-[#0062D2] text-xs font-bold py-2.5 px-3 rounded-lg transition-colors border border-slate-200"
          >
            <span>{language === 'mr' ? 'कोटेशन' : 'Quote'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

