import React, { useState, useEffect } from 'react';
import { X, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl, getMailtoUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = '',
}) => {
  const { t, language } = useLanguage();
  const form = t.requestQuote.form;

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    productRequired: defaultProduct,
    details: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProduct) {
      setFormData((prev) => ({ ...prev, productRequired: defaultProduct }));
    }
  }, [defaultProduct]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const summary = `Quotation Request
Name: ${formData.name}
Company: ${formData.companyName}
Phone: ${formData.phone}
Product Required: ${formData.productRequired}
Details: ${formData.details}`;

    const mailto = getMailtoUrl(`Quote Request - ${formData.name}`, summary);
    window.location.href = mailto;
  };

  const getWhatsAppQuote = () => {
    const text = `Hello Alfa Steel,
I would like to request a quotation for:
• Name: ${formData.name || 'Client'}
• Company: ${formData.companyName || 'N/A'}
• Phone: ${formData.phone || 'N/A'}
• Product: ${formData.productRequired || 'Kitchen Equipment'}
• Details: ${formData.details || 'Please send pricing'}`;

    return getWhatsAppUrl(text);
  };

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="quote-modal-card"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1528] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {language === 'mr' ? 'अल्फा स्टील उत्पादन' : 'Alfa Steel Manufacturing'}
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {t.quoteModal.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {form.successTitle}
              </h4>
              <p className="text-xs text-slate-600">
                {form.successMessage}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={getWhatsAppQuote()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 rounded-lg text-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{language === 'mr' ? 'व्हॉट्सॲपवर पाठवा' : 'Send on WhatsApp'}</span>
                </a>
                <button
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 py-1 cursor-pointer"
                >
                  {t.quoteModal.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {form.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {form.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={form.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {form.productLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.productSelectPlaceholder}
                  value={formData.productRequired}
                  onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {form.companyLabel}
                </label>
                <input
                  type="text"
                  placeholder={form.companyPlaceholder}
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {form.detailsLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={form.detailsPlaceholder}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#0062D2] hover:bg-[#0051B0] text-white text-xs font-bold py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {form.submitBtn}
                </button>
                <a
                  href={getWhatsAppQuote()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-3 px-4 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'mr' ? 'व्हॉट्सॲप' : 'WhatsApp'}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};


