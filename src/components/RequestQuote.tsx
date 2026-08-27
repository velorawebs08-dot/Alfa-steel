import React, { useState } from 'react';
import { MessageSquare, Send, Upload, CheckCircle2, Phone, Mail, FileText, Image as ImageIcon, X } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl, getMailtoUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

interface RequestQuoteProps {
  initialProduct?: string;
}

export const RequestQuote: React.FC<RequestQuoteProps> = ({ initialProduct = '' }) => {
  const { t, language } = useLanguage();
  const rq = t.requestQuote;
  const form = rq.form;

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    productRequired: initialProduct,
    details: '',
  });

  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReferenceFile(file);
      const previewUrl = URL.createObjectURL(file);
      setReferencePreview(previewUrl);
    }
  };

  const removeFile = () => {
    setReferenceFile(null);
    if (referencePreview) {
      URL.revokeObjectURL(referencePreview);
      setReferencePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build structured enquiry text
    const summaryText = `Quotation Request from ${formData.name}
Company: ${formData.companyName || 'N/A'}
Phone: ${formData.phone}
Equipment Required: ${formData.productRequired || 'Custom Fabrication'}
Requirement Details: ${formData.details || 'Standard specifications requested'}
${referenceFile ? `Reference File Attached: ${referenceFile.name}` : ''}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger mailto client as backup
      const mailtoUrl = getMailtoUrl(
        `New Quotation Enquiry - ${formData.name} (${formData.productRequired || 'Equipment'})`,
        summaryText
      );
      window.location.href = mailtoUrl;
    }, 600);
  };

  const getCustomWhatsAppQuoteUrl = () => {
    const text = `Hello Alfa Steel,
I would like to request a quotation for:
• Name: ${formData.name || 'Client'}
• Company: ${formData.companyName || 'N/A'}
• Phone: ${formData.phone || 'N/A'}
• Equipment: ${formData.productRequired || 'Hotel Kitchen Equipment / Furniture'}
• Requirement: ${formData.details || 'Please share product details and pricing.'}`;

    return getWhatsAppUrl(text);
  };

  return (
    <section id="quote" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2">
            {rq.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {rq.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {rq.subtitle}
          </p>
        </div>

        {/* 2-Column Quote Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Quotation Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {form.successTitle}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {form.successMessage}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getCustomWhatsAppQuoteUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-6 py-3 rounded-lg shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>{language === 'mr' ? 'व्हॉट्सॲपवर पाठवा' : 'Send on WhatsApp'}</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        companyName: '',
                        phone: '',
                        productRequired: '',
                        details: '',
                      });
                      removeFile();
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                  >
                    {form.submitAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {form.nameLabel}
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      placeholder={form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="quote-company"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {form.companyLabel}
                    </label>
                    <input
                      id="quote-company"
                      type="text"
                      placeholder={form.companyPlaceholder}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {form.phoneLabel}
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      placeholder={form.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Product / Equipment Required */}
                  <div>
                    <label
                      htmlFor="quote-product"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {form.productLabel}
                    </label>
                    <input
                      id="quote-product"
                      type="text"
                      required
                      placeholder={form.productSelectPlaceholder}
                      value={formData.productRequired}
                      onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Requirement Details */}
                <div>
                  <label
                    htmlFor="quote-details"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    {form.detailsLabel}
                  </label>
                  <textarea
                    id="quote-details"
                    rows={3}
                    placeholder={form.detailsPlaceholder}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Upload Reference Image (optional) */}
                <div>
                  <label
                    htmlFor="quote-reference-image"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    {form.imageUploadLabel}
                  </label>
                  
                  {!referenceFile ? (
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white">
                      <input
                        id="quote-reference-image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">
                          {language === 'mr' ? 'संदर्भ ड्रॉइंग किंवा फोटो अपलोड करा' : 'Click or drag reference drawing / photo'}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {form.imageUploadHint}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        {referencePreview && (
                          <img
                            src={referencePreview}
                            alt="Reference Preview"
                            className="w-10 h-10 object-cover rounded-md border border-slate-200"
                          />
                        )}
                        <div className="text-xs">
                          <p className="font-bold text-slate-800 truncate max-w-[200px]">
                            {referenceFile.name}
                          </p>
                          <p className="text-slate-400">
                            {(referenceFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    id="submit-quote-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0062D2] hover:bg-[#0051B0] text-white text-sm font-bold py-3.5 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-150 disabled:opacity-70 active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? form.submitting : form.submitBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Instant Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Card */}
            <div className="bg-[#0B1528] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'mr' ? 'व्हॉट्सॲपवर त्वरित कोटेशन' : 'Instant WhatsApp Quotation'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {language === 'mr' ? 'थेट व जलद संवाद' : 'Fast direct communication'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {language === 'mr'
                  ? 'थेट संपर्क साधणे सोयीस्कर वाटते का? आपले किचन ड्रॉइंग्ज, आवश्यक आकारमान किंवा फोटो थेट आमच्या फॅक्टरी व्हॉट्सॲप नंबरवर पाठवा.'
                  : 'Prefer chatting directly? Send your equipment drawings, required dimensions, or photographs straight to our factory number on WhatsApp.'}
              </p>

              <a
                id="quote-section-whatsapp-btn"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold py-3.5 px-6 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>
                  {language === 'mr' ? 'व्हॉट्सॲप करा: ' : 'WhatsApp Us: '}
                  {COMPANY_INFO.whatsappNumber}
                </span>
              </a>
            </div>

            {/* Direct Calling Info Box */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {rq.directContactCard.title}
              </h4>
              <div className="space-y-2.5">
                <a
                  href={`tel:+91${COMPANY_INFO.cell}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors text-slate-800"
                >
                  <span className="text-xs font-medium text-slate-600">
                    {language === 'mr' ? 'मुख्य मोबाईल:' : 'Primary Cell:'}
                  </span>
                  <span className="text-sm font-bold text-[#0062D2]">{COMPANY_INFO.cell}</span>
                </a>
                <a
                  href={`tel:+91${COMPANY_INFO.phone}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors text-slate-800"
                >
                  <span className="text-xs font-medium text-slate-600">
                    {language === 'mr' ? 'लँडलाईन / फोन:' : 'Landline/Phone:'}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{COMPANY_INFO.phone}</span>
                </a>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                {language === 'mr' ? 'ईमेल:' : 'Email:'} <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0062D2] font-semibold hover:underline">{COMPANY_INFO.email}</a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


