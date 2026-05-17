'use client';
import React, { useEffect, useRef, useState } from 'react';

// ─── Habit data for the live dashboard preview ───
const HABITS = [
  { id: 'h1', name: 'Morning run', icon: '🏃', unit: '5km', streak: 47 },
  { id: 'h2', name: 'Cold shower', icon: '🚿', unit: '3min', streak: 31 },
  { id: 'h3', name: 'Deep work', icon: '⚡', unit: '4hr', streak: 22 },
  { id: 'h4', name: 'Hydration', icon: '💧', unit: '3L', streak: 47 },
  { id: 'h5', name: 'Meditation', icon: '🧠', unit: '20min', streak: 14 },
  { id: 'h6', name: 'Sleep 8hr', icon: '😴', unit: '8hr', streak: 9 },
  { id: 'h7', name: 'No sugar', icon: '🚫', unit: 'full day', streak: 3 },
];

// Day state: 'completed' | 'missed' | 'empty'
type DayState = 'completed' | 'missed' | 'empty';

interface DayData {
  label: string;
  short: string;
  states: DayState[];
}

const DAYS: DayData[] = [
  { label: 'Monday', short: 'MON', states: ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed'] },
  { label: 'Tuesday', short: 'TUE', states: ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed'] },
  { label: 'Wednesday', short: 'WED', states: ['completed', 'completed', 'completed', 'completed', 'completed', 'missed', 'completed'] },
  { label: 'Thursday', short: 'THU', states: ['completed', 'missed', 'completed', 'completed', 'missed', 'completed', 'completed'] },
  { label: 'Friday', short: 'FRI', states: ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'] },
  { label: 'Saturday', short: 'SAT', states: ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'] },
  { label: 'Sunday', short: 'SUN', states: ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'] },
];

const DashboardHero: React.FC = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Reveal CTA overlay after 1.2s
  useEffect(() => {
    const t = setTimeout(() => setShowCTA(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const getCellClass = (state: DayState) => {
    if (state === 'completed') return 'cell-completed rounded-sm';
    if (state === 'missed') return 'cell-missed rounded-sm';
    return 'cell-empty rounded-sm';
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden grain"
      style={{ background: 'linear-gradient(160deg, #0D0D0D 0%, #111827 60%, #0D0D0D 100%)' }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(176,190,197,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(176,190,197,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top label */}
      <div className="relative z-10 mb-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#B0BEC5] border border-[rgba(176,190,197,0.15)] px-3 py-1.5 rounded-full">
          <span className="relative w-2 h-2 status-dot">
            <span className="block w-2 h-2 rounded-full bg-[#00E676]" />
          </span>
          Live Preview — Week of Feb 24, 2026
        </span>
      </div>

      {/* Main headline */}
      <div className="relative z-10 text-center mb-10 max-w-4xl">
        <h1 className="font-mono font-bold text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.9] tracking-tight text-[#E8EAED] mb-4">
          Your habits,<br />
          <span className="text-[#00E676]" style={{ textShadow: '0 0 40px rgba(0,230,118,0.35)' }}>
            rendered as data.
          </span>
        </h1>
        <p className="font-mono text-[13px] text-[#B0BEC5] tracking-[0.06em] max-w-xl mx-auto leading-relaxed">
          The cockpit dashboard for engineers who treat their body like a production system.
          Every log timestamped. Every miss surfaced. No excuses in the data.
        </p>
      </div>

      {/* ─── Dashboard Preview ─── */}
      <div className="relative z-10 w-full max-w-5xl">
        <div
          className="rounded-2xl overflow-hidden border border-[rgba(176,190,197,0.1)]"
          style={{
            background: '#0F0F1A',
            boxShadow: '0 0 80px rgba(0,230,118,0.06), 0 40px 100px rgba(0,0,0,0.6)',
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(176,190,197,0.08)]"
            style={{ background: '#0D0D18' }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-[11px] text-[rgba(176,190,197,0.4)] tracking-widest">
              streak.app — dashboard
            </span>
            <span className="font-mono text-[10px] text-[rgba(176,190,197,0.3)]">v2.4.1</span>
          </div>

          {/* Dashboard inner */}
          <div className="p-5 sm:p-6">
            {/* User bar */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#1A1A2E] border border-[rgba(0,230,118,0.3)] flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#00E676]">AC</span>
                </div>
                <span className="font-mono text-[12px] text-[#E8EAED] tracking-wider">
                  alexchen
                  <span
                    className="inline-block w-2 h-[13px] bg-[#00E676] ml-1 align-middle"
                    style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.05s' }}
                  />
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 font-mono text-[12px]">
                  <span className="text-[18px]">🔥</span>
                  <span className="text-[#00E676] font-bold">47</span>
                  <span className="text-[#B0BEC5] text-[10px] uppercase tracking-wider">day streak</span>
                </div>
                <div className="font-mono text-[10px] text-[rgba(176,190,197,0.4)] border border-[rgba(176,190,197,0.1)] px-2 py-1 rounded">
                  W08 / 2026
                </div>
              </div>
            </div>

            {/* Grid header */}
            <div className="grid mb-2" style={{ gridTemplateColumns: '160px repeat(7, 1fr)', gap: '4px' }}>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(176,190,197,0.35)] px-1">Habit</div>
              {DAYS.map((d) => (
                <div key={d.short} className={`font-mono text-[9px] uppercase tracking-[0.15em] text-center ${
                  d.short === 'THU' ? 'text-[#FF3D57]' : ['FRI','SAT','SUN'].includes(d.short) ? 'text-[rgba(176,190,197,0.25)]' : 'text-[#00E676]'
                }`}>
                  {d.short}
                </div>
              ))}
            </div>

            {/* Habit rows */}
            <div className="space-y-1.5">
              {HABITS.map((habit, hIdx) => (
                <div
                  key={habit.id}
                  className="grid items-center"
                  style={{ gridTemplateColumns: '160px repeat(7, 1fr)', gap: '4px' }}
                >
                  {/* Habit name */}
                  <div className="flex items-center gap-2 px-1 min-w-0">
                    <span className="text-[13px] shrink-0">{habit.icon}</span>
                    <span className="font-mono text-[10px] text-[#B0BEC5] truncate tracking-wider">{habit.name}</span>
                  </div>
                  {/* Day cells */}
                  {DAYS.map((day, dIdx) => {
                    const state = day.states[hIdx];
                    return (
                      <div
                        key={`${habit.id}-${day.short}`}
                        className={`h-7 ${getCellClass(state)} flex items-center justify-center`}
                        title={`${habit.name} — ${day.label}`}
                      >
                        {state === 'completed' && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {state === 'missed' && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 1L7 7M7 1L1 7" stroke="#FF3D57" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bottom stats bar */}
            <div className="mt-5 pt-4 border-t border-[rgba(176,190,197,0.07)] flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="font-mono text-[10px] text-[rgba(176,190,197,0.4)]">
                  <span className="text-[#00E676]">28/28</span> completed Mon–Wed
                </div>
                <div className="font-mono text-[10px] text-[rgba(176,190,197,0.4)]">
                  <span className="text-[#FF3D57]">4</span> misses Thu
                </div>
              </div>
              <div className="font-mono text-[10px] text-[rgba(176,190,197,0.3)]">
                completion rate: <span className="text-[#E8EAED]">87.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Frosted CTA Overlay ─── */}
        <div
          className={`absolute inset-0 rounded-2xl flex items-center justify-center transition-all duration-700 ${
            showCTA ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(13,13,13,0.55) 40%, rgba(13,13,13,0.85) 100%)',
          }}
        >
          <div className="glass-overlay rounded-2xl px-8 py-7 text-center max-w-sm mx-4"
            style={{ marginTop: '180px' }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00E676] mb-2">
              Early Access Open
            </p>
            <h2 className="font-mono font-bold text-[1.4rem] text-[#E8EAED] mb-1 leading-tight">
              Build your own<br />dashboard.
            </h2>
            <p className="font-mono text-[11px] text-[#B0BEC5] mb-5 leading-relaxed">
              Join 2,400+ engineers already tracking.
            </p>
            <a
              href="#early-access"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] bg-[#00E676] text-[#0D0D0D] font-bold px-6 py-3 rounded hover:bg-[#00ff88] transition-colors duration-200"
            >
              Claim Your Dashboard
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B0BEC5]">Scroll to spec sheet</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#B0BEC5] to-transparent" />
      </div>
    </section>
  );
};

export default DashboardHero;