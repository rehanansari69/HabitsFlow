'use client';
import React, { useEffect, useState } from 'react';

const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`sticky-cta fixed bottom-0 left-0 right-0 z-40 ${visible ? 'visible' : ''}`}
      style={{ background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(176,190,197,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
            <span className="font-mono text-[11px] text-[rgba(176,190,197,0.6)] tracking-wider">
              2,847 engineers tracking · Early access open
            </span>
          </div>
        </div>
        <a
          href="#early-access"
          className="font-mono font-bold text-[12px] uppercase tracking-[0.2em] bg-[#00E676] text-[#0D0D0D] px-6 py-2.5 rounded hover:bg-[#00ff88] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
        >
          Claim Your Dashboard
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;