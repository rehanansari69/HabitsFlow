'use client';
import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[rgba(13,13,13,0.92)] backdrop-blur-xl border-b border-[rgba(176,190,197,0.08)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <AppLogo
            size={28}
            iconName="BoltIcon"
            text="streak"
            className="font-mono font-bold tracking-widest text-[#00E676] uppercase text-sm"
          />
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Features', 'Analytics', 'Pricing', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B0BEC5] hover:text-[#00E676] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#early-access"
          className="font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 border border-[#00E676] text-[#00E676] rounded hover:bg-[rgba(0,230,118,0.1)] transition-all duration-200"
        >
          Claim Dashboard
        </a>
      </div>
    </header>
  );
};

export default Header;