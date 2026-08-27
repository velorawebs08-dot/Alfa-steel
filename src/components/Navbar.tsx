import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO, getWhatsAppUrl, getPhoneTelUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'manufacture', 'products', 'manufacturing', 'factory', 'projects', 'industries', 'why-us', 'quote', 'contact', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.about, href: '#about', id: 'about' },
    { name: t.nav.products, href: '#products', id: 'products' },
    { name: t.nav.manufacturing, href: '#manufacturing', id: 'manufacturing' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Utility Contact Bar */}
      <div className="bg-[#181D24] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="hidden sm:inline">Plot No. B-14, Opp. Kagal 5 Star MIDC,</span> {t.nav.locationBadge.split(',')[1] || 'Maharashtra'}
            </span>
            <div className="hidden md:flex items-center gap-4 text-slate-300">
              <a
                href={getPhoneTelUrl(COMPANY_INFO.cell)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                Cell: {COMPANY_INFO.cell}
              </a>
              <span className="text-slate-600">|</span>
              <a
                href={getPhoneTelUrl(COMPANY_INFO.phone)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                Phone: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Top Bar Language Toggle */}
            <LanguageToggle variant="topbar" className="inline-flex" />

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="hidden xs:inline">{COMPANY_INFO.email}</span>
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#25D366] font-semibold hover:underline"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-white transition-shadow duration-200 border-b border-slate-200 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            aria-label="Alfa Steel Home"
          >
            <Logo className="h-12 sm:h-14 w-auto object-contain" showSubtitle />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 transition-colors hover:text-[#0062D2] ${
                    isActive ? 'text-[#0062D2] font-bold' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0062D2] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Controls */}
          <div className="flex items-center gap-3">
            <a
              id="navbar-quote-btn"
              href="#quote"
              onClick={(e) => {
                if (onOpenQuoteModal) {
                  e.preventDefault();
                  onOpenQuoteModal();
                } else {
                  handleNavClick(e, '#quote');
                }
              }}
              className="inline-flex items-center gap-2 bg-[#0062D2] hover:bg-[#0051B0] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95 whitespace-nowrap"
            >
              <span>{t.nav.requestQuoteBtn}</span>
              <ArrowRight className="w-4 h-4 hidden xs:inline" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-5 animate-fadeIn"
        >
          <div className="flex flex-col gap-3">
            {/* Mobile Language Switcher */}
            <LanguageToggle variant="mobile" />

            <div className="grid grid-cols-2 gap-1 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`mobile-nav-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-blue-50 text-[#0062D2] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <a
                id="mobile-drawer-quote-btn"
                href="#quote"
                onClick={(e) => handleNavClick(e, '#quote')}
                className="w-full text-center bg-[#0062D2] text-white font-bold py-2.5 rounded-lg shadow-sm"
              >
                {t.nav.requestQuoteBtn}
              </a>
              <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                <span>Cell: <strong>{COMPANY_INFO.cell}</strong></span>
                <span>Phone: <strong>{COMPANY_INFO.phone}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

