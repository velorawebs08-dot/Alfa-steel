export const COMPANY_INFO = {
  name: 'Alfa Steel',
  tagline: 'Manufacturer of Hotel Kitchen Equipment and Furniture',
  address: 'Plot No. B-14, Opp. Kagal 5 Star MIDC Industrial Area, Maharashtra – 416236',
  cell: '9422519281',
  phone: '9422047281',
  email: 'alfasteelworks@rediffmail.com',
  whatsappNumber: '9422519281',
  whatsappMessage: 'Hello Alfa Steel, I would like to enquire about your hotel kitchen equipment and furniture.',
  googleMapsQuery: 'Plot+No.+B-14+Opp.+Kagal+5+Star+MIDC+Industrial+Area+Maharashtra+416236',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Kagal+5+Star+MIDC+Industrial+Area+Maharashtra+416236&t=&z=14&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kagal+5+Star+MIDC+Industrial+Area+Maharashtra+416236',
  workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM',
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const msg = encodeURIComponent(customMessage || COMPANY_INFO.whatsappMessage);
  return `https://wa.me/91${COMPANY_INFO.whatsappNumber}?text=${msg}`;
};

export const getMailtoUrl = (subject?: string, body?: string) => {
  const s = encodeURIComponent(subject || 'Enquiry for Hotel Kitchen Equipment & Furniture - Alfa Steel');
  const b = encodeURIComponent(body || 'Dear Alfa Steel Team,\n\nI would like to enquire about your equipment and fabrication services.\n\nRegards,');
  return `mailto:${COMPANY_INFO.email}?subject=${s}&body=${b}`;
};

export const getPhoneTelUrl = (number: string) => {
  return `tel:+91${number.replace(/\D/g, '')}`;
};
