import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductCategories } from './components/ProductCategories';
import { ManufacturingProcess } from './components/ManufacturingProcess';
import { FactoryInfrastructure } from './components/FactoryInfrastructure';
import { ProjectsGallery } from './components/ProjectsGallery';
import { IndustriesWeServe } from './components/IndustriesWeServe';
import { WhyChooseUs } from './components/WhyChooseUs';
import { RequestQuote } from './components/RequestQuote';
import { LocationContact } from './components/LocationContact';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';

function MainApp() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSelectedProduct, setQuoteSelectedProduct] = useState('');

  const handleOpenQuote = (productName?: string) => {
    if (productName) {
      setQuoteSelectedProduct(productName);
    }
    setQuoteModalOpen(true);
  };

  const handleSelectProductForQuote = (productName: string) => {
    setQuoteSelectedProduct(productName);
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E232A]">
      {/* 1. Professional Navbar */}
      <Navbar onOpenQuoteModal={() => handleOpenQuote()} />

      {/* Main Content Sections strictly in the requested order */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onOpenQuoteModal={() => handleOpenQuote()} />

        {/* 3. About Alfa Steel */}
        <About />

        {/* 4. Product Categories */}
        <ProductCategories onSelectForQuote={handleSelectProductForQuote} />

        {/* 6. Manufacturing Process */}
        <ManufacturingProcess />

        {/* 7. Factory / Infrastructure */}
        <FactoryInfrastructure />

        {/* 8. Projects & Work Gallery */}
        <ProjectsGallery />

        {/* 9. Industries We Serve */}
        <IndustriesWeServe />

        {/* 10. Why Choose Alfa Steel */}
        <WhyChooseUs />

        {/* 11. Request a Quote */}
        <RequestQuote initialProduct={quoteSelectedProduct} />

        {/* 12. Location & Contact */}
        <LocationContact />

        {/* 13. FAQ */}
        <FAQSection />
      </main>

      {/* 14. Professional Footer */}
      <Footer />

      {/* Floating Interactive Widget */}
      <FloatingWhatsApp />

      {/* Interactive Quick Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={quoteSelectedProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}


