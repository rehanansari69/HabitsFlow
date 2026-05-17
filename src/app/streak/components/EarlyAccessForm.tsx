'use client';
import React, { useState } from 'react';

const HABIT_OPTIONS = [
  { value: 'just-starting', label: 'Just starting' },
  { value: '1-3', label: '1–3 habits' },
  { value: '4-6', label: '4–6 habits' },
  { value: '7-9', label: '7–9 habits' },
  { value: '10+', label: '10+ habits' },
];

const EarlyAccessForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Valid email required.');
      return;
    }
    if (!selected) {
      setError('Select a habit count to continue.');
      return;
    }
    setError('');
    // Backend integration point — submit { email, habitCount: selected } to your API
    setSubmitted(true);
  };

  return (
    <section
      id="early-access"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0D0D0D 0%, #0A0A14 50%, #0D0D0D 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Label */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(176,190,197,0.4)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
            Early Access — Limited Slots
          </span>
          <h2 className="font-mono font-bold text-[2.2rem] sm:text-[3rem] text-[#E8EAED] leading-tight">
            Claim Your<br />
            <span
              className="text-[#00E676]"
              style={{ textShadow: '0 0 40px rgba(0,230,118,0.4)' }}
            >
              Dashboard.
            </span>
          </h2>
          <p className="font-mono text-[12px] text-[#B0BEC5] mt-4 leading-relaxed max-w-md mx-auto">
            No credit card. No onboarding call. Just your data, clean and waiting.
            The dashboard is pre-configured — you log in and it's already running.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-8 border border-[rgba(176,190,197,0.1)]"
          style={{ background: '#0F0F1A', boxShadow: '0 0 80px rgba(0,230,118,0.05), 0 40px 80px rgba(0,0,0,0.4)' }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(176,190,197,0.5)] block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full font-mono text-[13px] text-[#E8EAED] bg-[#08080F] border border-[rgba(176,190,197,0.12)] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00E676] transition-colors duration-200 placeholder-[rgba(176,190,197,0.25)]"
                  />
                </div>
              </div>

              {/* Qualifying question */}
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(176,190,197,0.5)] block mb-3">
                  How many habits are you currently tracking?
                </label>
                <div className="flex flex-wrap gap-2">
                  {HABIT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelected(opt.value)}
                      className={`pill-option px-4 py-2 rounded-full ${selected === opt.value ? 'selected' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="font-mono text-[11px] text-[#FF3D57]">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full font-mono font-bold text-[13px] uppercase tracking-[0.2em] bg-[#00E676] text-[#0D0D0D] rounded-lg py-4 hover:bg-[#00ff88] transition-colors duration-200 flex items-center justify-center gap-3"
              >
                Claim Your Dashboard
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p className="font-mono text-[10px] text-center text-[rgba(176,190,197,0.35)] tracking-wider">
                No credit card · No onboarding · Instant dashboard access
              </p>
            </form>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(0,230,118,0.15)', border: '1px solid rgba(0,230,118,0.4)' }}
              >
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                  <path d="M2 11L10 19L26 3" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-mono font-bold text-[1.5rem] text-[#00E676] mb-2">
                Dashboard reserved.
              </h3>
              <p className="font-mono text-[12px] text-[#B0BEC5] leading-relaxed max-w-xs mx-auto">
                You're in the queue. We'll send your access link within 24 hours. Check your inbox — it'll be worth the wait.
              </p>
              <div className="mt-6 font-mono text-[10px] text-[rgba(176,190,197,0.4)] border border-[rgba(176,190,197,0.1)] rounded-lg px-4 py-3">
                status: <span className="text-[#00E676]">waitlist_confirmed</span>
                <span className="text-[rgba(176,190,197,0.3)]"> · position: </span>
                <span className="text-[#B0BEC5]">#2,848</span>
              </div>
            </div>
          )}
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {[
            '2,847 engineers already in',
            'Data stays yours — export anytime',
            'GDPR compliant',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1" stroke="#00E676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[10px] text-[rgba(176,190,197,0.5)] tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessForm;