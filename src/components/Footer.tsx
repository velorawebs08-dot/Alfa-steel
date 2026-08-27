import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl, getPhoneTelUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.products, href: '#products' },
    { name: t.nav.manufacturing, href: '#manufacturing' },
    { name: t.nav.factory, href: '#factory' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.industries, href: '#industries' },
    { name: t.nav.whyUs, href: '#why-us' },
    { name: t.nav.quote, href: '#quote' },
    { name: t.nav.contact, href: '#contact' },
    { name: t.nav.faq, href: '#faq' },
  ];

  return (
    <footer className="bg-[#0D1219] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home" className="inline-block">
              <Logo className="h-10 w-auto" variant="white" />
            </a>

            <p className="text-slate-300 font-semibold text-sm">
              {language === 'mr'
                ? 'हॉटेल किचन उपकरणे व फर्निचरचे थेट उत्पादक'
                : 'Manufacturer of Hotel Kitchen Equipment & Furniture'}
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'mr'
                ? 'कागल ५ स्टार एमआयडीसी (महाराष्ट्र) स्थित आमच्या फॅक्टरीमध्ये टिकाऊ आणि दर्जेदार स्टेनलेस स्टील उपकरणांचे थेट उत्पादन केले जाते.'
                : 'Practical and durable stainless-steel equipment and furniture manufactured directly at our plant in Plot No. B-14, Opp. Kagal 5 Star MIDC Industrial Area, Maharashtra.'}
            </p>

            <div className="flex items-center gap-2 pt-2 text-slate-300 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.footer.directSupply}</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs">
              {navLinks.slice(0, 7).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-600">•</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Factory Information (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.factoryAddress}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {COMPANY_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <div className="flex items-center gap-3">
                  <a
                    href={getPhoneTelUrl(COMPANY_INFO.cell)}
                    className="text-slate-300 hover:text-white font-semibold transition-colors"
                  >
                    Cell: {COMPANY_INFO.cell}
                  </a>
                  <span className="text-slate-700">|</span>
                  <a
                    href={getPhoneTelUrl(COMPANY_INFO.phone)}
                    className="text-slate-300 hover:text-white font-semibold transition-colors"
                  >
                    Phone: {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-slate-300 hover:text-white transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Social / Direct Communication Badges */}
            <div className="pt-3 flex items-center gap-3">
              <a
                id="footer-whatsapp-btn"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{t.footer.whatsAppUs}</span>
              </a>

              <a
                id="footer-email-btn"
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.footer.emailEnquiries}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© Alfa Steel. {t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-6">
            <span>
              {language === 'mr'
                ? 'हॉटेल किचन उपकरणे व फर्निचर उत्पादक'
                : 'Hotel Kitchen Equipment & Furniture Manufacturer'}
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

