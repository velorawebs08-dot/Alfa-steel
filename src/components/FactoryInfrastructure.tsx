import React, { useState } from 'react';
import { MapPin, Eye } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox';
import { useLanguage } from '../context/LanguageContext';

export const FactoryInfrastructure: React.FC = () => {
  const { t, language } = useLanguage();
  const factoryFrontImg = "https://i.postimg.cc/pdGp2x4s/Chat-GPT-Image-Aug-26-2026-02-18-15-PM.png";
  const factoryShopImg = "https://i.postimg.cc/W4w00hzJ/factory-demo-interior.jpg";

  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    image: string;
    title: string;
    description: string;
  } | null>(null);

  return (
    <section id="factory" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
              {t.factoryInfrastructure.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.factoryInfrastructure.heading}
            </h2>
            <p className="mt-2 text-base text-slate-600">
              {t.factoryInfrastructure.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg shrink-0">
            <MapPin className="w-4 h-4 text-[#0062D2]" />
            <span>Kagal 5 Star MIDC, Maharashtra</span>
          </div>
        </div>

        {/* Prominent Large Factory Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Primary Factory Exterior Photo (Large) */}
          <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-900">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={factoryFrontImg}
                alt="Alfa Steel Manufacturing Facility at Plot B-14 Kagal 5 Star MIDC"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {language === 'mr' ? 'मुख्य उत्पादन फॅक्टरी युनिट' : 'Primary Production Facility'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {language === 'mr' ? 'अल्फा स्टील प्लांट व यार्ड' : 'Alfa Steel Plant & Yard'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Plot No. B-14, Opp. Kagal 5 Star MIDC Industrial Area, Maharashtra – 416236
                  </p>
                </div>
                <button
                  onClick={() =>
                    setActiveLightboxImage({
                      image: factoryFrontImg,
                      title: language === 'mr' ? 'अल्फा स्टील मॅन्युफॅक्चरिंग फॅक्टरी' : 'Alfa Steel Manufacturing Facility',
                      description: language === 'mr' ? 'प्लॉट नं. B-14, कागल ५ स्टार MIDC समोर, महाराष्ट्र स्थित मुख्य फॅक्टरी व लॉजिस्टिक्स यार्ड.' : 'Primary factory and logistics yard located at Plot No. B-14, Opp. Kagal 5 Star MIDC Industrial Area, Maharashtra.',
                    })
                  }
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white transition-colors"
                  aria-label="Zoom factory photo"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Factory Workshop Photo (Large) */}
          <div className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-900">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden">
              <img
                src={factoryShopImg}
                alt="Alfa Steel In-House Fabrication & Welding Workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {language === 'mr' ? 'मॅन्युफॅक्चरिंग वर्कशॉप' : 'Manufacturing Workshop'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {language === 'mr' ? 'फॅब्रिकेशन आणि असेंब्ली विभाग' : 'Fabrication & Assembly Area'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {language === 'mr' ? 'इन-हाउस शीट कटिंग, बेंडिंग, TIG वेल्डिंग आणि सॅटिन फिनिशिंग सेटअप.' : 'In-house sheet cutting, bending, TIG welding and satin finishing.'}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setActiveLightboxImage({
                      image: factoryShopImg,
                      title: language === 'mr' ? 'अल्फा स्टील फॅब्रिकेशन व वेल्डिंग वर्कशॉप' : 'Alfa Steel Fabrication & Assembly Workshop',
                      description: language === 'mr' ? 'स्टेनलेस स्टील शिअरिंग, प्रेसिंग, TIG वेल्डिंग आणि कस्टम फॅब्रिकेशनसाठी सुसज्ज उत्पादन युनिट.' : 'Equipped workshop floor handling stainless steel shearing, pressing, TIG welding and custom fabrication lines.',
                    })
                  }
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white transition-colors"
                  aria-label="Zoom workshop photo"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Authentic Facility Capabilities Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              {language === 'mr' ? 'सुविधा प्रकार' : 'Facility Type'}
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {language === 'mr' ? 'थेट उत्पादक' : 'Direct Manufacturer'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              {language === 'mr' ? 'वेल्डिंग तंत्रज्ञान' : 'Welding Technique'}
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">Argon TIG &amp; Arc</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              {language === 'mr' ? 'मटेरियल ग्रेड' : 'Material Grade'}
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">SS 304 &amp; SS 202</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              {language === 'mr' ? 'स्थान' : 'Location'}
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">Kagal 5 Star MIDC</div>
          </div>
        </div>

      </div>

      {activeLightboxImage && (
        <ImageLightbox
          isOpen={!!activeLightboxImage}
          onClose={() => setActiveLightboxImage(null)}
          image={activeLightboxImage.image}
          title={activeLightboxImage.title}
          description={activeLightboxImage.description}
        />
      )}
    </section>
  );
};

