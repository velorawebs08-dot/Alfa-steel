import React, { useEffect } from 'react';
import { X, ZoomIn, MessageSquare, PhoneCall } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/company';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  category?: string;
  description?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  image,
  title,
  category,
  description,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const inquiryMsg = `Hello Alfa Steel, I am interested in knowing more details & pricing for "${title}".`;

  return (
    <div
      id="image-lightbox-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="image-lightbox-content"
        className="relative max-h-[92vh] w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            {category && (
              <span className="text-xs font-bold uppercase tracking-wider text-[#0062D2] block">
                {category}
              </span>
            )}
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
          </div>
          <button
            id="close-lightbox-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 bg-neutral-900 flex items-center justify-center p-4 min-h-[300px] max-h-[60vh] overflow-hidden">
          <img
            src={image}
            alt={title}
            referrerPolicy="no-referrer"
            className="max-h-[56vh] max-w-full object-contain rounded-md select-none"
          />
        </div>

        {/* Bottom Details & CTAs */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            {category && <p className="text-xs text-[#0062D2] font-semibold mt-0.5">{category} &bull; Alfa Steel Kagal MIDC</p>}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              id="lightbox-whatsapp-btn"
              href={getWhatsAppUrl(inquiryMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Enquiry
            </a>
            <a
              id="lightbox-call-btn"
              href={`tel:+91${COMPANY_INFO.cell}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#0062D2] hover:bg-[#0051B0] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
