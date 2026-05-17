import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[rgba(176,190,197,0.08)] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Logo + copyright */}
        <div className="flex items-center gap-3">
          <AppLogo size={20} iconName="BoltIcon" className="text-[#00E676]" />
          <span className="font-mono text-[11px] text-[rgba(176,190,197,0.4)] tracking-widest uppercase">
            © 2026 Streak
          </span>
        </div>

        {/* Center: links */}
        <div className="flex items-center gap-6">
          {['Docs', 'Status', 'GitHub', 'Twitter'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgba(176,190,197,0.4)] hover:text-[#B0BEC5] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Privacy + Terms */}
        <div className="flex items-center gap-4">
          <a href="#" className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgba(176,190,197,0.4)] hover:text-[#B0BEC5] transition-colors">Privacy</a>
          <span className="text-[rgba(176,190,197,0.2)]">·</span>
          <a href="#" className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgba(176,190,197,0.4)] hover:text-[#B0BEC5] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;