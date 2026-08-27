import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export const FloatingWhatsApp: React.FC = () => {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Mini quick message popup */}
      {showTooltip && (
        <div className="relative hidden sm:flex items-center gap-3 bg-white text-slate-800 px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 text-xs font-medium max-w-xs animate-bounce-subtle">
          <span>
            {language === 'mr' ? (
              <>किंमत किंवा कस्टमायझेशन हवे आहे का? <strong>थेट चॅट करा</strong>.</>
            ) : (
              <>Need pricing or custom fabrication? <strong>Chat with us directly</strong>.</>
            )}
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Tooltip arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45" />
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {/* Quick Call Button */}
        <a
          id="floating-call-btn"
          href={`tel:+91${COMPANY_INFO.cell}`}
          aria-label="Call Alfa Steel directly"
          className="w-12 h-12 rounded-full bg-[#0062D2] text-white flex items-center justify-center shadow-lg hover:bg-[#0051B0] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
          title="Call: 9422519281"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Button */}
        <a
          id="floating-whatsapp-btn"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Alfa Steel"
          className="group relative flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#1EBE5D] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="font-bold text-sm tracking-wide pr-1">
            {language === 'mr' ? 'व्हॉट्सॲप करा' : 'WhatsApp Us'}
          </span>
        </a>
      </div>
    </div>
  );
};

