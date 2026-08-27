import React from 'react';
import { Hotel, Utensils, ChefHat, Building, School, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const IndustriesWeServe: React.FC = () => {
  const { t, language } = useLanguage();

  const industryIcons = [Hotel, Utensils, ChefHat, Building, School, Sparkles];

  return (
    <section id="industries" className="py-14 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
            {t.industries.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.industries.heading}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t.industries.subtitle}
          </p>
        </div>

        {/* 6-Card Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.industries.list.map((ind, idx) => {
            const Icon = industryIcons[idx % industryIcons.length] || Hotel;
            return (
              <div
                key={ind.title}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#0062D2] flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0062D2] uppercase tracking-wide">
                    {language === 'mr' ? 'स्टेनलेस स्टील फॅब्रिकेशन' : 'SS Fabrication'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {language === 'mr' ? 'कस्टम / स्टँडर्ड' : 'Bespoke / Standard'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

