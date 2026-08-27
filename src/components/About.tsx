import React from 'react';
import { Shield, Wrench, Factory, MapPin, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const factoryShopImg = 'https://i.postimg.cc/W4w00hzJ/factory-demo-interior.jpg';
  
  const icons = [Wrench, Shield, Sparkles, Factory];

  return (
    <section id="about" className="py-14 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-1.5">
            {t.about.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.about.heading}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t.about.p1}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Highlights & Direct Facility Strip */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {t.about.highlights.map((item, idx) => {
                const Icon = icons[idx % icons.length] || Wrench;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0062D2] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Address Strip */}
            <div className="p-4 rounded-xl bg-[#0B1528] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-200">
                  <span className="font-bold text-white block">
                    {language === 'mr' ? 'फॅक्टरी लोकेशन:' : 'Plant Location:'}
                  </span>
                  {t.about.facilityLocation}
                </div>
              </div>
              <a
                href="#contact"
                className="text-xs font-bold bg-[#0062D2] hover:bg-[#0051B0] text-white px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>

          {/* Right Column: Factory Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <div className="aspect-[4/3] relative">
                <img
                  src={factoryShopImg}
                  alt="Alfa Steel Factory Production Area"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {language === 'mr' ? 'मॅन्युफॅक्चरिंग वर्कशॉप' : 'Production Workshop'}
                </div>
              </div>
              <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-600">
                <p className="font-bold text-slate-900">
                  {language === 'mr' ? 'इन-हाउस स्टेनलेस स्टील फॅब्रिकेशन युनिट' : 'In-House SS Fabrication Facility'}
                </p>
                <p className="mt-0.5">
                  {language === 'mr' ? 'किचन प्लॅन्स, विशेष मापे आणि मटेरियल ग्रेडनुसार थेट फॅक्टरी उत्पादन.' : 'Direct manufacturing with custom sizes, layouts, and materials.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


