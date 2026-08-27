import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'navbar' | 'topbar' | 'mobile';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'navbar', className = '' }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'topbar') {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-slate-900/60 rounded-full px-2.5 py-0.5 border border-slate-700/60 text-xs ${className}`}>
        <Languages className="w-3.5 h-3.5 text-blue-400" />
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`transition-colors font-semibold px-1 py-0.5 rounded ${
            language === 'en'
              ? 'text-white bg-[#0062D2] shadow-2xs'
              : 'text-slate-300 hover:text-white'
          }`}
          aria-label="Switch to English"
        >
          English
        </button>
        <span className="text-slate-500 text-[10px]">|</span>
        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`transition-colors font-semibold px-1.5 py-0.5 rounded font-devanagari ${
            language === 'mr'
              ? 'text-white bg-[#0062D2] shadow-2xs'
              : 'text-slate-300 hover:text-white'
          }`}
          aria-label="मराठी भाषेत पहा"
        >
          मराठी
        </button>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 ${className}`}>
        <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
          <Languages className="w-4 h-4 text-[#0062D2]" />
          <span>भाषा / Language</span>
        </div>
        <div className="inline-flex items-center bg-white rounded-lg p-1 border border-slate-300 shadow-2xs">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === 'en'
                ? 'bg-[#0062D2] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all font-devanagari ${
              language === 'mr'
                ? 'bg-[#0062D2] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            मराठी
          </button>
        </div>
      </div>
    );
  }

  // Default navbar variant
  return (
    <div
      className={`inline-flex items-center bg-slate-100/90 hover:bg-slate-200/80 rounded-lg p-1 border border-slate-200 transition-colors shadow-2xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <Languages className="w-3.5 h-3.5 text-[#0062D2] ml-1 mr-1 hidden sm:block" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
          language === 'en'
            ? 'bg-[#0062D2] text-white shadow-2xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <span className="text-slate-300 mx-0.5 select-none">|</span>
      <button
        type="button"
        onClick={() => setLanguage('mr')}
        className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition-all ${
          language === 'mr'
            ? 'bg-[#0062D2] text-white shadow-2xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={language === 'mr'}
      >
        मराठी
      </button>
    </div>
  );
};
