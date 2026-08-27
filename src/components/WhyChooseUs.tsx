import React from 'react';
import { CheckCircle2, Factory, Shield, Sparkles, Wrench, Settings, Headset, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useLanguage();

  const pointIcons = [Wrench, Settings, Factory, Shield, Sparkles, Headset];

  return (
    <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0062D2]"></span>
            <span>{t.whyChooseUs.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.whyChooseUs.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.whyChooseUs.subtitle}
          </p>
        </div>

        {/* Structured Point-Wise List */}
        <div className="space-y-4 sm:space-y-5">
          {t.whyChooseUs.points.map((point, idx) => {
            const Icon = pointIcons[idx % pointIcons.length] || Wrench;
            const numStr = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={point.title}
                className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 transition-all hover:border-[#0062D2]/50 hover:shadow-md flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
              >
                {/* Left Number & Icon Indicator */}
                <div className="flex items-center sm:flex-col items-center justify-center shrink-0 gap-3 sm:gap-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/80 text-[#0062D2] flex items-center justify-center font-mono font-bold text-sm group-hover:bg-[#0062D2] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-400 font-mono tracking-widest hidden sm:block">
                    {numStr}
                  </span>
                </div>

                {/* Content Details */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0062D2] transition-colors">
                      <span className="sm:hidden font-mono text-[#0062D2] mr-2">{numStr}.</span>
                      {point.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {point.highlight}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                    {point.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct CTA */}
        <div className="mt-12 text-center p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'आपली काही खास स्टेनलेस स्टील आवश्यकता आहे का?' : 'Have a custom stainless steel requirement?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'mr' ? 'आपला किचन लेआउट किंवा प्रॉडक्टचे डायमेंशन्स आमच्या फॅब्रिकेशन टीमसोबत शेअर करा.' : 'Share your kitchen layout or product dimensions with our fabrication team.'}
            </p>
          </div>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0062D2] hover:bg-[#0051B0] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors shrink-0 cursor-pointer"
          >
            <span>{language === 'mr' ? 'थेट कोटेशन मागवा' : 'Request Direct Quote'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};


