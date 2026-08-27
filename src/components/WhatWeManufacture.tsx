import React from 'react';
import { ArrowRight, UtensilsCrossed, Armchair, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhatWeManufacture: React.FC = () => {
  const { t, language } = useLanguage();
  const cat1 = t.whatWeManufacture.categories[0];
  const cat2 = t.whatWeManufacture.categories[1];

  return (
    <section id="manufacture" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
            {t.whatWeManufacture.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.whatWeManufacture.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.whatWeManufacture.subtitle}
          </p>
        </div>

        {/* 2 Primary Manufacturing Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Hotel Kitchen Equipment */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0062D2]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0062D2] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {cat1.title}
                </h3>
                <p className="text-sm font-semibold text-[#0062D2] mt-1">
                  {language === 'mr' ? 'हॉटेल व व्यावसायिक किचनसाठी' : 'For Hotels, Buffets & Restaurants'}
                </p>
              </div>
              <p className="text-sm text-slate-600">
                {cat1.desc}
              </p>
              
              <ul className="space-y-2 pt-2 text-xs font-medium text-slate-700">
                {cat1.points.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0062D2] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href="#products"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0062D2] hover:text-[#0051B0] transition-colors group-hover:translate-x-1 duration-150"
              >
                <span>{language === 'mr' ? 'सर्व उपकरणे पहा' : 'View Equipment Catalog'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Stainless Steel Furniture */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
                <Armchair className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {cat2.title}
                </h3>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {language === 'mr' ? 'डायनिंग व इंडस्ट्रियल स्टोरेज' : 'Dining Halls, Canteens & Storage'}
                </p>
              </div>
              <p className="text-sm text-slate-600">
                {cat2.desc}
              </p>
              
              <ul className="space-y-2 pt-2 text-xs font-medium text-slate-700">
                {cat2.points.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#0062D2] transition-colors group-hover:translate-x-1 duration-150"
              >
                <span>{language === 'mr' ? 'फर्निचर व प्रोजेक्ट्स पहा' : 'View Furniture & Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


