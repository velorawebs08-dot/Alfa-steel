export interface Product {
  id: string;
  name: string;
  category: 'Kitchen Equipment' | 'SS Furniture' | 'SS Railings' | 'Custom Fabrication';
  description: string;
  image: string;
  features?: string[];
  dimensions?: string;
  material?: string;
  isPopular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Kitchen Equipment' | 'SS Furniture' | 'SS Railings' | 'Custom Projects';
  image: string;
  description: string;
  clientType?: string;
}

export interface QuoteFormData {
  name: string;
  companyName: string;
  phone: string;
  productRequired: string;
  details: string;
  referenceImage?: File | null;
  referenceImagePreview?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
