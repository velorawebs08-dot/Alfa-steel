import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-12 sm:h-14 w-auto',
  variant = 'light',
  showSubtitle = false,
}) => {
  const isDark = variant === 'white' || variant === 'dark';
  const [imgSrc, setImgSrc] = useState('https://i.postimg.cc/MGG6kwFv/alfa-steel-logo.jpg');

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {isDark ? (
        <div className="bg-white px-2 py-0.5 rounded-md shadow-xs inline-flex items-center">
          <img
            src={imgSrc}
            onError={() => setImgSrc('/alfa-steel-logo.jpg')}
            alt="Alfa Steel"
            referrerPolicy="no-referrer"
            className={className}
            style={{ objectFit: 'contain' }}
          />
        </div>
      ) : (
        <img
          src={imgSrc}
          onError={() => setImgSrc('/alfa-steel-logo.jpg')}
          alt="Alfa Steel"
          referrerPolicy="no-referrer"
          className={className}
          style={{ objectFit: 'contain' }}
        />
      )}

      {showSubtitle && (
        <div className="hidden lg:flex flex-col border-l border-slate-300 pl-3 leading-tight">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Hotel Kitchen Equipment
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            &amp; SS Furniture Manufacturer
          </span>
        </div>
      )}
    </div>
  );
};


