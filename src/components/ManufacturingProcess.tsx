import React from 'react';
import { Layers, Scissors, Hammer, Flame, Sparkles, CheckCircle2, Cog } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ManufacturingProcess: React.FC = () => {
  const { t, language } = useLanguage();

  const stepIcons = [Layers, Scissors, Hammer, Flame, Sparkles, CheckCircle2];

  return (
    <section id="manufacturing" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with decorative cluster matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Subtle Decorative Icon Cluster */}
          <div className="flex justify-center mb-3 text-[#0062D2]">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-50/80 border border-blue-100">
              <Cog className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.manufacturingProcess.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            {t.manufacturingProcess.subtitle}
          </p>
        </div>

        {/* Process Steps in Circular Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-14 lg:gap-y-16 gap-x-6 relative">
          {t.manufacturingProcess.steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length] || Layers;
            const isEven = index % 2 === 1;

            return (
              <div 
                key={step.title} 
                id={`manufacturing-step-${index + 1}`}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Connecting Curved Arrow (Visible on large screens between steps in row) */}
                {index % 3 !== 2 && index < t.manufacturingProcess.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-10 top-12 w-20 h-12 pointer-events-none z-0">
                    <svg className="w-full h-full text-slate-300" viewBox="0 0 80 40" fill="none">
                      <defs>
                        <marker
                          id={`arrowhead-${index + 1}`}
                          markerWidth="6"
                          markerHeight="6"
                          refX="4"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
                        </marker>
                      </defs>
                      {/* Alternating arching curve similar to reference */}
                      {isEven ? (
                        <path
                          d="M 5 10 Q 40 32, 75 14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeDasharray="4 4"
                          fill="none"
                          markerEnd={`url(#arrowhead-${index + 1})`}
                        />
                      ) : (
                        <path
                          d="M 5 30 Q 40 8, 75 26"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeDasharray="4 4"
                          fill="none"
                          markerEnd={`url(#arrowhead-${index + 1})`}
                        />
                      )}
                    </svg>
                  </div>
                )}

                {/* Circular Container with Outer Dashed Ring & Inner Soft Pill */}
                <div className="relative mb-6 z-10">
                  
                  {/* Floating Number Badge (Top-Left of Circle as seen in reference) */}
                  <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center shadow-md z-20 font-mono ring-2 ring-white">
                    {index + 1}
                  </span>

                  {/* Outer Dashed Circular Ring */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-slate-300 group-hover:border-[#0062D2] transition-all duration-300 flex items-center justify-center bg-white shadow-xl shadow-slate-200/50 p-2">
                    
                    {/* Inner Colored Circle */}
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-50 group-hover:bg-blue-50/90 text-slate-700 group-hover:text-[#0062D2] flex items-center justify-center transition-all duration-300 shadow-inner">
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                </div>

                {/* Step Title & Description */}
                <div className="max-w-[250px] space-y-1.5 z-10">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0062D2] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {language === 'mr'
                ? '१००% इन-हाउस मेटल शिअरिंग, आर्गॉन TIG वेल्डिंग आणि प्रिसिजन बेंडिंग'
                : '100% In-House Metal Shearing, Argon TIG Welding & Precision Bending'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

