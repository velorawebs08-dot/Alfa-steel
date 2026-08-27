import { Product } from '../types';

// EXACT equipment sequence provided by the client:
// 1. Bain Marie Counter
// 2. GN Prep Table
// 3. Kitchen Work Table
// 4. Chef Workstation Cabinet
// 5. SS Single Sink Table
export const PRODUCTS_SEQUENCE: Product[] = [
  {
    id: 'prod-01-bain-marie',
    name: 'Bain Marie Counter',
    category: 'Kitchen Equipment',
    description: 'Stainless steel Bain Marie hot food counter with food pans, glass sneeze guard canopy, and mobile wheels.',
    image: 'https://i.postimg.cc/T1W6ncpB/Chat-GPT-Image-Aug-26-2026-02-51-02-PM.png',
    material: 'SS 304 / SS 202',
    dimensions: 'Custom / Standard',
    features: [
      'Gastronorm pan wells with heating control',
      'Hygienic glass sneeze guard canopy',
      'Lockable heavy-duty caster wheels',
      'Lower storage shelf deck'
    ],
    isPopular: true
  },
  {
    id: 'prod-02-gn-prep-table',
    name: 'GN Prep Table',
    category: 'Kitchen Equipment',
    description: 'Stainless steel ingredient preparation table with GN pan holder inserts for pizza, salad, and food prep.',
    image: 'https://i.postimg.cc/c4xqxZmS/Chat-GPT-Image-Aug-26-2026-03-09-24-PM.png',
    material: 'SS 304 / SS 202',
    dimensions: 'Custom / Standard',
    features: [
      'GN pan inserts for ingredients',
      'Rigid tubular pipe frame',
      'Leveling adjustable bullet feet',
      'Hygienic easy-clean surface'
    ],
    isPopular: false
  },
  {
    id: 'prod-03-ss-work-table',
    name: 'Kitchen Work Table',
    category: 'Kitchen Equipment',
    description: 'Heavy-duty stainless steel commercial work table with dual overhead racks and utility drawers.',
    image: 'https://i.postimg.cc/fLN28j2F/Chat-GPT-Image-Aug-26-2026-03-10-55-PM.png',
    material: 'SS 304 / SS 202',
    dimensions: 'Custom / Standard',
    features: [
      'Two-tier overhead storage racks',
      'Built-in stainless steel pull-out drawers',
      'Reinforced heavy-load worktop',
      'Bottom vessel storage shelf'
    ],
    isPopular: true
  },
  {
    id: 'prod-04-chef-cabinet',
    name: 'Chef Workstation Cabinet',
    category: 'Kitchen Equipment',
    description: 'Stainless steel chef workstation with enclosed sliding door storage cabinet and upper gantry shelf.',
    image: 'https://i.postimg.cc/LX2Dt45c/Chat-GPT-Image-Aug-26-2026-03-12-28-PM.png',
    material: 'SS 304 / SS 202',
    dimensions: 'Custom / Standard',
    features: [
      'Enclosed sliding door cabinet',
      'Side organizer compartments',
      'Rear protective splashback',
      'Overhead utility gantry shelf'
    ],
    isPopular: false
  },
  {
    id: 'prod-05-sink-table',
    name: 'SS Sink Table',
    category: 'Kitchen Equipment',
    description: 'Commercial stainless steel single bowl wash sink table with gooseneck faucet and drainboard.',
    image: 'https://i.postimg.cc/8CBBz84m/Chat-GPT-Image-Aug-26-2026-03-18-14-PM.png',
    material: 'SS 304',
    dimensions: 'Custom / Standard',
    features: [
      'Deep single bowl wash basin',
      'Swivel gooseneck water faucet',
      'Side grooved draining board',
      'Bottom pipe storage shelf'
    ],
    isPopular: true
  }
];

export const MAIN_MANUFACTURING_CATEGORIES = [
  {
    id: 'cat-kitchen',
    title: 'Hotel Kitchen Equipment',
    tagline: 'Stainless-steel equipment and fabrication solutions for hotel and commercial kitchens.',
    details: 'From mobile Bain Marie counters, commercial prep work tables, and GN pan stations to custom chef workstations, sinks, and tandoor counters. Fabricated with food-grade stainless steel for rigorous continuous operation.',
    iconName: 'ChefHat',
    itemCount: 'Bespoke & Standard Models'
  },
  {
    id: 'cat-furniture',
    title: 'Stainless Steel Furniture',
    tagline: 'Durable stainless-steel furniture manufactured for commercial and professional environments.',
    details: 'Long-lasting dining tables with attached stools, multi-tier storage racks, heavy-duty platform trolleys, utility push carts, and stainless steel benches engineered for high durability and easy maintenance.',
    iconName: 'Building2',
    itemCount: 'Engineered for Heavy Duty'
  }
];
