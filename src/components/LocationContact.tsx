import React from 'react';
import { MapPin, Phone, Mail, MessageSquare, Navigation } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl, getPhoneTelUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export const LocationContact: React.FC = () => {
  const { t, language } = useLanguage();
  const lc = t.locationContact;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
            {lc.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lc.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lc.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards & Quick Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Main Info Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Alfa Steel
                </h3>
                <p className="text-xs font-bold text-[#0062D2] uppercase tracking-wider mt-1">
                  {language === 'mr' ? 'हॉटेल किचन उपकरणे व फर्निचरचे थेट उत्पादक' : 'Manufacturer of Hotel Kitchen Equipment & Furniture'}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 pt-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0062D2] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    {lc.contactCards.addressTitle}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      {language === 'mr' ? 'मोबाईल नंबर' : 'Cell Number'}
                    </span>
                    <a
                      href={getPhoneTelUrl(COMPANY_INFO.cell)}
                      className="text-sm font-bold text-slate-900 hover:text-[#0062D2] transition-colors"
                    >
                      {COMPANY_INFO.cell}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      {language === 'mr' ? 'फोन / लँडलाईन' : 'Phone Number'}
                    </span>
                    <a
                      href={getPhoneTelUrl(COMPANY_INFO.phone)}
                      className="text-sm font-bold text-slate-900 hover:text-[#0062D2] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 pt-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0062D2] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    {lc.contactCards.emailTitle}
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-semibold text-slate-800 hover:text-[#0062D2] transition-colors mt-1 block break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Action Contact Button Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                id="contact-call-cell-btn"
                href={getPhoneTelUrl(COMPANY_INFO.cell)}
                className="inline-flex items-center justify-center gap-2 bg-[#0062D2] hover:bg-[#0051B0] text-white text-xs font-bold py-3 px-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'कॉल करा' : 'Call Cell'}</span>
              </a>

              <a
                id="contact-whatsapp-btn"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-3 px-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'mr' ? 'व्हॉट्सॲप' : 'WhatsApp'}</span>
              </a>

              <a
                id="contact-email-btn"
                href={`mailto:${COMPANY_INFO.email}`}
                className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold py-3 px-3 rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#0062D2]" />
                <span>{language === 'mr' ? 'ईमेल पाठवा' : 'Email Us'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Embed with Directions Link */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            
            {/* Map Header Bar */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {language === 'mr' ? 'कागल ५ स्टार एमआयडीसी लोकेशन मॅप' : 'Kagal 5 Star MIDC Location Map'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lc.mapSubtitle}
                </span>
              </div>
              <a
                id="get-directions-btn"
                href={COMPANY_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0062D2] hover:underline bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs shrink-0 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{lc.directionsBtn}</span>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative flex-1 min-h-[340px] bg-slate-100">
              <iframe
                title="Alfa Steel Location Map"
                src={COMPANY_INFO.googleMapsEmbedUrl}
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Bottom Map Note */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>{lc.contactCards.hoursTitle}</span>
              <span className="font-semibold text-slate-700">{lc.contactCards.hoursDesc}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


