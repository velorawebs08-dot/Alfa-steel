import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
            {t.faqs.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.faqs.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.faqs.subtitle}
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3.5">
          {t.faqs.list.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                id={`faq-item-${idx}`}
                className={`rounded-xl border transition-all duration-150 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50 border-blue-200 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  id={`faq-toggle-${idx}`}
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#0062D2] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Inquiry Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {language === 'mr' ? 'येथे नमूद नसलेला काही वेगळा प्रश्न आहे का?' : 'Have a specific question not listed here?'}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {language === 'mr' ? 'आमच्या फॅक्टरी इंजिनिअर्सशी व्हॉट्सॲप किंवा फोनवर थेट संपर्क साधा.' : 'Reach out directly to our plant engineers on WhatsApp or Phone.'}
            </p>
          </div>
          <a
            href={getWhatsAppUrl('Hello Alfa Steel, I have an inquiry regarding your manufacturing services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'mr' ? 'व्हॉट्सॲपवर विचारा' : 'Ask on WhatsApp'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

