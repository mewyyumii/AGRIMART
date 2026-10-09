import React from 'react';

export default function Logo({ variant = 'dark', className = '', showTagline = false }) {
  // variant: 'dark' (for light backgrounds like white navbar/page), 'light' (for dark/forest backgrounds)
  const isLight = variant === 'light';

  const primaryText = isLight ? 'text-white' : 'text-forest';
  const secondaryText = isLight ? 'text-leaf' : 'text-leaf';
  const taglineColor = isLight ? 'text-sage' : 'text-ink-secondary';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Original AGRIMART geometric sprout / seed emblem */}
      <svg
        className="w-8 h-8 flex-shrink-0"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Soft rounded background container for badge feel */}
        <rect width="36" height="36" rx="10" fill={isLight ? '#1A4F37' : '#E8F0E5'} />
        {/* Deep forest leaf arc */}
        <path
          d="M10 24C10 16 16 10 24 10C24 18 18 24 10 24Z"
          fill="#123D2A"
        />
        {/* Vibrant leaf blade overlap */}
        <path
          d="M14 26C14 18.5 19.5 13 27 13C27 20.5 21.5 26 14 26Z"
          fill="#4F8A3D"
          opacity="0.88"
        />
        {/* Golden seed / sun harvest accent */}
        <circle cx="25" cy="11" r="2.5" fill="#EAB308" />
      </svg>

      <div className="flex flex-col leading-none">
        <span className={`font-display text-xl sm:text-2xl font-extrabold tracking-tight ${primaryText}`}>
          AGRI<span className={secondaryText}>MART</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${taglineColor}`}>
            Fresh • Direct • Local
          </span>
        )}
      </div>
    </div>
  );
}
