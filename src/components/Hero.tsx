import React from 'react';
import { ArrowRight, ShieldCheck, Factory, Layers, Award, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl, getPhoneTelUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenQuoteModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-900 border-b border-slate-700/60 overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="https://i.postimg.cc/tgFhJ0q6/ORG-hero-section-img.jpg"
        alt="Alfa Steel Manufacturing Facility Hero"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
      />

      {/* Subtle Overlay to ensure text readability while keeping the background image clearly visible */}
      <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60 pointer-events-none" />

      {/* Hero Content directly layered in front of the background image */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col items-center text-center">
        
        {/* Core Value Pillars Pill */}
        <div className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-lg mb-6 text-xs sm:text-sm font-semibold text-white">
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <Factory className="w-4 h-4" />
            {language === 'mr' ? 'थेट उत्पादन' : 'Manufacturing'}
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <Award className="w-4 h-4 text-amber-400" />
            {language === 'mr' ? 'अनुभव' : 'Experience'}
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {language === 'mr' ? 'दर्जेदार गुणवत्ता' : 'Quality'}
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <Layers className="w-4 h-4 text-indigo-300" />
            {language === 'mr' ? 'विश्वसनीयता' : 'Reliability'}
          </span>
        </div>

        {/* Hero Headings and Content Container */}
        <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center text-center">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-md">
              Alfa Steel
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 leading-snug drop-shadow-sm">
              {t.hero.titleLine1} {t.hero.titleLine2}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
            {t.hero.subtitle}
          </p>

          {/* Direct Action Buttons (CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <a
              id="hero-explore-products-btn"
              href="#products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0062D2] hover:bg-[#0051B0] text-white text-base font-bold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-150 active:scale-95"
            >
              <span>{language === 'mr' ? 'उत्पादने पहा' : 'Explore Our Products'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              id="hero-request-quote-btn"
              href="#quote"
              onClick={(e) => {
                if (onOpenQuoteModal) {
                  e.preventDefault();
                  onOpenQuoteModal();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/70 backdrop-blur-md text-base font-bold px-8 py-3.5 rounded-lg transition-all shadow-md"
            >
              <span>{t.hero.requestQuoteCTA}</span>
            </a>
          </div>

          {/* Direct Factory Contacts Strip */}
          <div className="pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium w-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-200">
                {language === 'mr' ? 'थेट फॅक्टरी संवाद व संपर्क' : 'Direct Factory Communication'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.nav.callUs} <strong className="text-white">{COMPANY_INFO.cell}</strong></span>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] font-bold hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: {COMPANY_INFO.whatsappNumber}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};


