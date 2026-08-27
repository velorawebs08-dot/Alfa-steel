import { ProjectItem } from '../types';

export const PROJECT_CATEGORIES = [
  'All',
  'Kitchen Equipment',
  'SS Furniture',
  'SS Railings',
  'Custom Projects'
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const GALLERY_PROJECTS: ProjectItem[] = [
  // Kitchen Equipment
  {
    id: 'proj-ke-01',
    title: 'Bain Marie Counter',
    category: 'Kitchen Equipment',
    image: 'https://i.postimg.cc/T1W6ncpB/Chat-GPT-Image-Aug-26-2026-02-51-02-PM.png',
    description: 'Bain Marie Counter',
    clientType: 'Hotel & Banquet'
  },
  {
    id: 'proj-ke-02',
    title: 'GN Prep Table',
    category: 'Kitchen Equipment',
    image: 'https://i.postimg.cc/c4xqxZmS/Chat-GPT-Image-Aug-26-2026-03-09-24-PM.png',
    description: 'GN Prep Table',
    clientType: 'Restaurant Kitchen'
  },
  {
    id: 'proj-ke-03',
    title: 'Kitchen Work Table',
    category: 'Kitchen Equipment',
    image: 'https://i.postimg.cc/fLN28j2F/Chat-GPT-Image-Aug-26-2026-03-10-55-PM.png',
    description: 'Kitchen Work Table',
    clientType: 'Commercial Kitchen'
  },
  {
    id: 'proj-ke-04',
    title: 'Chef Workstation Cabinet',
    category: 'Kitchen Equipment',
    image: 'https://i.postimg.cc/LX2Dt45c/Chat-GPT-Image-Aug-26-2026-03-12-28-PM.png',
    description: 'Chef Workstation Cabinet',
    clientType: 'Resort & Hotel'
  },
  {
    id: 'proj-ke-05',
    title: 'SS Sink Table',
    category: 'Kitchen Equipment',
    image: 'https://i.postimg.cc/8CBBz84m/Chat-GPT-Image-Aug-26-2026-03-18-14-PM.png',
    description: 'SS Sink Table',
    clientType: 'Commercial Kitchen'
  },

  // SS Furniture
  {
    id: 'proj-fur-01',
    title: 'SS Storage Rack',
    category: 'SS Furniture',
    image: 'https://i.postimg.cc/9fCRQDrM/Furniture-C-1st-image.jpg',
    description: 'SS Storage Rack',
    clientType: 'Canteen & Storage'
  },
  {
    id: 'proj-fur-02',
    title: 'SS Dining Table',
    category: 'SS Furniture',
    image: 'https://i.postimg.cc/nhcCDCvP/Chat-GPT-Image-Aug-26-2026-06-10-24-PM.png',
    description: 'SS Dining Table',
    clientType: 'Cafeteria & Dining'
  },
  {
    id: 'proj-fur-03',
    title: 'Platform Trolley',
    category: 'SS Furniture',
    image: 'https://i.postimg.cc/1zVRG6fs/Chat-GPT-Image-Aug-26-2026-06-24-50-PM.png',
    description: 'Platform Trolley',
    clientType: 'Logistics & Hotel'
  },
  {
    id: 'proj-fur-04',
    title: 'Utility Service Cart',
    category: 'SS Furniture',
    image: 'https://i.postimg.cc/mkD593gB/Furniture-C-4th-image.jpg',
    description: 'Utility Service Cart',
    clientType: 'Dining Service'
  },
  {
    id: 'proj-fur-05',
    title: 'SS Storage Cabinet',
    category: 'SS Furniture',
    image: 'https://i.postimg.cc/zvTYvStV/Chat-GPT-Image-Aug-27-2026-06-20-16-PM.png',
    description: 'SS Storage Cabinet',
    clientType: 'Commercial Facility'
  },

  // SS Railings
  {
    id: 'proj-rail-01',
    title: 'SS Staircase Railing',
    category: 'SS Railings',
    image: 'https://i.postimg.cc/NjntNMH2/Reiling-C-1st-image.jpg',
    description: 'SS Staircase Railing',
    clientType: 'Commercial Building'
  },
  {
    id: 'proj-rail-02',
    title: 'Glass Balcony Railing',
    category: 'SS Railings',
    image: 'https://i.postimg.cc/MKGghwxB/Reiling-C-2nd-image.jpg',
    description: 'Glass Balcony Railing',
    clientType: 'Architectural Project'
  },
  {
    id: 'proj-rail-03',
    title: 'SS Handrail System',
    category: 'SS Railings',
    image: 'https://i.postimg.cc/j233sWKy/Reiling-C-3rd-image.jpg',
    description: 'SS Handrail System',
    clientType: 'Hospitality & Office'
  },
  {
    id: 'proj-rail-04',
    title: 'SS Safety Guardrail',
    category: 'SS Railings',
    image: 'https://i.postimg.cc/pdMGXMbx/Reiling-C-4th-image.jpg',
    description: 'SS Safety Guardrail',
    clientType: 'Industrial Facility'
  },
  {
    id: 'proj-rail-05',
    title: 'SS Balustrade Railing',
    category: 'SS Railings',
    image: 'https://i.postimg.cc/y8cjGpJ5/Reiling-C-5th-image.jpg',
    description: 'SS Balustrade Railing',
    clientType: 'Commercial Complex'
  },

  // Custom Projects
  {
    id: 'proj-cust-01',
    title: 'Custom SS Counter',
    category: 'Custom Projects',
    image: 'https://i.postimg.cc/RCpgJH5g/Customize-C-1st-image.png',
    description: 'Custom SS Counter',
    clientType: 'Central Kitchen'
  },
  {
    id: 'proj-cust-02',
    title: 'Custom SS Fabrication',
    category: 'Custom Projects',
    image: 'https://i.postimg.cc/5tjBVPj4/Chat-GPT-Image-Aug-26-2026-08-17-42-PM.png',
    description: 'Custom SS Fabrication',
    clientType: 'Fine Dine Restaurant'
  },
  {
    id: 'proj-cust-03',
    title: 'SS Industrial Unit',
    category: 'Custom Projects',
    image: 'https://i.postimg.cc/9f47SrNW/Customize-C-3rd-image.jpg',
    description: 'SS Industrial Unit',
    clientType: 'Industrial Catering'
  },
  {
    id: 'proj-cust-04',
    title: 'Custom SS Workstation',
    category: 'Custom Projects',
    image: 'https://i.postimg.cc/85Qj0w6j/Cutomize-C-5th-iamge.jpg',
    description: 'Custom SS Workstation',
    clientType: 'Commercial Kitchen'
  },
  {
    id: 'proj-cust-05',
    title: 'Bespoke SS Project',
    category: 'Custom Projects',
    image: 'https://i.postimg.cc/HWPCWnST/Cutsomize-C-3th-image.png',
    description: 'Bespoke SS Project',
    clientType: 'Custom Project'
  }
];
