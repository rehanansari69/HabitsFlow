'use client';
import React, { useEffect, useRef, useState } from 'react';

interface MetricProps {
  value: string;
  label: string;
  sublabel: string;
  color?: string;
}

const Metric: React.FC<MetricProps> = ({ value, label, sublabel, color = '#00E676' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-up ${visible ? 'visible' : ''} text-center sm:text-left`}>
      <div
        className="font-mono font-bold text-[2.8rem] sm:text-[3.6rem] leading-none transition-all duration-700"
        style={{ color, textShadow: color === '#00E676' ? '0 0 30px rgba(0,230,118,0.3)' : 'none' }}
      >
        {value}
      </div>
      <div className="font-mono font-bold text-[13px] text-[#E8EAED] mt-1 uppercase tracking-[0.12em]">{label}</div>
      <div className="font-mono text-[10px] text-[rgba(176,190,197,0.5)] mt-1 tracking-wider">{sublabel}</div>
    </div>
  );
};

// ─── Marquee ticker data ───
const TICKER_ITEMS = [
  '🔥 alexchen — 47 day streak',
  '⚡ priya_m — 12 habits active',
  '✓ t_okonkwo — 100% week',
  '🏃 sam_reyes — 5km logged',
  '💧 j_lindqvist — 3L hydration',
  '😴 na_watanabe — 8hr sleep streak: 21',
  '🧠 d_sharma — meditation: 30 days',
  '⚡ m_oduya — deep work: 4.2hr avg',
];

const SocialProofMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal-up');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="analytics"
      ref={sectionRef}
      className="py-20 overflow-hidden"
      style={{ background: '#0A0A14', borderTop: '1px solid rgba(176,190,197,0.07)', borderBottom: '1px solid rgba(176,190,197,0.07)' }}
    >
      {/* Marquee ticker */}
      <div className="overflow-hidden mb-16 py-3 border-y border-[rgba(176,190,197,0.07)]"
        style={{ background: 'rgba(0,230,118,0.03)' }}>
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[11px] text-[rgba(176,190,197,0.5)] mx-8 tracking-wider whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 reveal-up">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(176,190,197,0.4)]">
            // system_status.json — live metrics
          </span>
          <h2 className="font-mono font-bold text-[2rem] sm:text-[2.6rem] text-[#E8EAED] mt-2 leading-tight">
            The numbers don't lie.
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14 mb-16">
          <Metric value="2,847" label="Engineers Tracking" sublabel="across 34 countries" />
          <Metric value="94.2%" label="Day-30 Retention" sublabel="vs 23% industry avg" />
          <Metric value="1.4M" label="Habits Logged" sublabel="in the last 30 days" />
          <Metric value="61" label="Avg Streak Length" sublabel="at 90-day mark" color="#B0BEC5" />
        </div>

        {/* Status table */}
        <div
          className="reveal-up rounded-2xl overflow-hidden border border-[rgba(176,190,197,0.08)]"
          style={{ background: '#0F0F1A' }}
        >
          <div className="px-5 py-3 border-b border-[rgba(176,190,197,0.07)] flex items-center gap-3"
            style={{ background: '#0D0D18' }}>
            <span className="w-2 h-2 rounded-full bg-[#00E676] relative status-dot" />
            <span className="font-mono text-[11px] text-[rgba(176,190,197,0.5)] tracking-widest uppercase">System Status — All Operational</span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { service: 'Habit Sync Engine', latency: '12ms', uptime: '99.98%', status: 'operational' },
              { service: 'Notification Dispatch', latency: '38ms', uptime: '99.94%', status: 'operational' },
              { service: 'Analytics Pipeline', latency: '84ms', uptime: '99.91%', status: 'operational' },
            ].map((row) => (
              <div
                key={row.service}
                className="rounded-xl p-4 border border-[rgba(176,190,197,0.06)]"
                style={{ background: 'rgba(176,190,197,0.02)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  <span className="font-mono text-[10px] text-[#E8EAED] font-medium">{row.service}</span>
                </div>
                <div className="font-mono text-[10px] text-[rgba(176,190,197,0.4)] space-y-1">
                  <div>latency: <span className="text-[#B0BEC5]">{row.latency}</span></div>
                  <div>uptime: <span className="text-[#00E676]">{row.uptime}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofMetrics;