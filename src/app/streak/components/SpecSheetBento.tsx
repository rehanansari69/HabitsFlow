'use client';
import React, { useEffect, useRef } from 'react';


// ─── 90-day heatmap data generator ───
function generateHeatmap() {
  const data: number[] = [];
  for (let i = 0; i < 90; i++) {
    const r = Math.random();
    if (r < 0.08) data.push(0); // missed
    else if (r < 0.18) data.push(1); // partial
    else if (r < 0.35) data.push(2); // good
    else data.push(3); // perfect
  }
  return data;
}

const heatmapData = generateHeatmap();

const heatmapColor = (v: number) => {
  if (v === 0) return 'rgba(255, 61, 87, 0.6)';
  if (v === 1) return 'rgba(0, 230, 118, 0.2)';
  if (v === 2) return 'rgba(0, 230, 118, 0.55)';
  return '#00E676';
};

// ─── Notification trigger rules ───
const TRIGGER_RULES = [
  { condition: 'streak >= 7', action: '→ send_push("Keep it up!")', color: '#00E676' },
  { condition: 'missed_days >= 2', action: '→ send_sms("Back on track?")', color: '#FF3D57' },
  { condition: 'time == 06:00', action: '→ send_push("Morning window")', color: '#00E676' },
  { condition: 'completion < 0.5', action: '→ send_email(digest)', color: '#FF3D57' },
  { condition: 'streak == 30', action: '→ unlock("Iron Will")', color: '#00E676' },
];

// ─── Habit stack dependency data ───
const HABIT_NODES = [
  { id: 'wake', label: 'Wake 05:30', x: 24, y: 20, color: '#00E676' },
  { id: 'hydrate', label: 'Hydrate 500ml', x: 24, y: 48, color: '#00E676' },
  { id: 'run', label: 'Run 5km', x: 24, y: 76, color: '#00E676' },
  { id: 'shower', label: 'Cold Shower', x: 58, y: 30, color: '#B0BEC5' },
  { id: 'work', label: 'Deep Work 4hr', x: 58, y: 62, color: '#B0BEC5' },
  { id: 'reflect', label: 'Reflection Log', x: 82, y: 46, color: '#00E676' },
];

const DEP_EDGES = [
  { from: 'wake', to: 'hydrate' },
  { from: 'hydrate', to: 'run' },
  { from: 'run', to: 'shower' },
  { from: 'wake', to: 'work' },
  { from: 'shower', to: 'reflect' },
  { from: 'work', to: 'reflect' },
];

const SpecSheetBento: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const cards = sectionRef.current?.querySelectorAll('.reveal-up');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6"
      style={{ background: '#0D0D0D' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-10 reveal-up">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(176,190,197,0.4)]">
            // spec_sheet.md — feature inventory
          </span>
          <h2 className="font-mono font-bold text-[2rem] sm:text-[2.6rem] text-[#E8EAED] mt-2 leading-tight">
            Every module,<br />
            <span className="text-[#00E676]">documented.</span>
          </h2>
        </div>

        {/* ─── Bento Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Card 1: Habit Stacking Engine (spans 2 cols) ── */}
          <div
            className="md:col-span-2 bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)] relative overflow-hidden"
            style={{ background: '#0F0F1A', minHeight: '340px' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 01</span>
                <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1">Habit Stacking Engine</h3>
                <p className="font-mono text-[11px] text-[#B0BEC5] mt-1 max-w-xs leading-relaxed">
                  Define dependency chains. Completing habit A unlocks habit B. Missed triggers cascade downstream.
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#00E676] border border-[rgba(0,230,118,0.2)] px-2 py-1 rounded shrink-0">
                ACTIVE
              </span>
            </div>

            {/* Dependency diagram */}
            <div className="relative h-48 mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {DEP_EDGES.map((edge, i) => {
                  const from = HABIT_NODES.find(n => n.id === edge.from)!;
                  const to = HABIT_NODES.find(n => n.id === edge.to)!;
                  return (
                    <line
                      key={i}
                      x1={`${from.x}%`} y1={`${from.y}%`}
                      x2={`${to.x}%`} y2={`${to.y}%`}
                      stroke="rgba(0,230,118,0.25)"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />
                  );
                })}
              </svg>
              {HABIT_NODES.map((node) => (
                <div
                  key={node.id}
                  className="absolute flex items-center gap-1.5 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: node.color, boxShadow: node.color === '#00E676' ? '0 0 8px rgba(0,230,118,0.6)' : 'none' }}
                  />
                  <span
                    className="font-mono text-[9px] whitespace-nowrap"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom spec line */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="font-mono text-[9px] text-[rgba(176,190,197,0.3)]">
                max_chain_depth: <span className="text-[#B0BEC5]">∞</span>
              </span>
              <span className="font-mono text-[9px] text-[rgba(176,190,197,0.3)]">
                cascade_mode: <span className="text-[#00E676]">strict</span>
              </span>
            </div>
          </div>

          {/* ── Card 2: Completion Rate (tall) ── */}
          <div
            className="bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)] flex flex-col"
            style={{ background: '#0F0F1A', minHeight: '340px' }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 02</span>
            <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1 mb-1">Completion Rate</h3>
            <p className="font-mono text-[11px] text-[#B0BEC5] leading-relaxed mb-4">Per-habit rolling average across configurable windows.</p>

            {/* Rate bars */}
            <div className="space-y-3 flex-1">
              {[
                { name: 'Morning run', pct: 94 },
                { name: 'Hydration', pct: 100 },
                { name: 'Deep work', pct: 78 },
                { name: 'Meditation', pct: 61 },
                { name: 'Sleep 8hr', pct: 43 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#B0BEC5]">{item.name}</span>
                    <span className="font-mono text-[10px]" style={{ color: item.pct >= 80 ? '#00E676' : item.pct >= 60 ? '#B0BEC5' : '#FF3D57' }}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[rgba(176,190,197,0.08)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.pct}%`,
                        background: item.pct >= 80 ? '#00E676' : item.pct >= 60 ? '#B0BEC5' : '#FF3D57',
                        boxShadow: item.pct >= 80 ? '0 0 8px rgba(0,230,118,0.4)' : 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(176,190,197,0.07)]">
              <span className="font-mono text-[9px] text-[rgba(176,190,197,0.3)]">window: <span className="text-[#B0BEC5]">30d rolling</span></span>
            </div>
          </div>

          {/* ── Card 3: 90-Day Heatmap ── */}
          <div
            className="bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)]"
            style={{ background: '#0F0F1A' }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 03</span>
            <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1 mb-1">90-Day Heatmap</h3>
            <p className="font-mono text-[11px] text-[#B0BEC5] leading-relaxed mb-4">
              Visualize pattern density. Spot consistency gaps before they compound.
            </p>

            {/* Heatmap grid */}
            <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(18, 1fr)' }}>
              {heatmapData.map((val, i) => (
                <div
                  key={i}
                  className="heatmap-cell rounded-[2px] aspect-square"
                  style={{
                    background: heatmapColor(val),
                    animationDelay: `${i * 12}ms`,
                  }}
                  title={`Day ${90 - i}: ${val === 0 ? 'missed' : val === 3 ? 'perfect' : 'partial'}`}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-[9px] text-[rgba(176,190,197,0.3)]">Legend:</span>
              {[
                { color: '#FF3D57', label: 'miss' },
                { color: 'rgba(0,230,118,0.2)', label: 'partial' },
                { color: '#00E676', label: 'perfect' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-[2px]" style={{ background: l.color }} />
                  <span className="font-mono text-[9px] text-[rgba(176,190,197,0.4)]">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 4: Notification Logic ── */}
          <div
            className="bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)]"
            style={{ background: '#0F0F1A' }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 04</span>
            <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1 mb-1">Notification Logic</h3>
            <p className="font-mono text-[11px] text-[#B0BEC5] leading-relaxed mb-4">
              Programmable trigger rules. If-then notification chains, not reminder spam.
            </p>

            {/* Rule list */}
            <div className="space-y-2">
              {TRIGGER_RULES.map((rule, i) => (
                <div
                  key={i}
                  className="rounded-lg px-3 py-2 border border-[rgba(176,190,197,0.06)]"
                  style={{ background: 'rgba(176,190,197,0.03)' }}
                >
                  <div className="font-mono text-[10px] text-[#B0BEC5]">
                    <span className="text-[rgba(176,190,197,0.4)]">if </span>
                    <span style={{ color: rule.color }}>{rule.condition}</span>
                  </div>
                  <div className="font-mono text-[10px] text-[rgba(176,190,197,0.5)] mt-0.5 pl-4">
                    {rule.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 5: Streak Integrity ── */}
          <div
            className="bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)] flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #0F0F1A 0%, #0D1A14 100%)' }}
          >
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 05</span>
              <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1 mb-1">Streak Integrity</h3>
              <p className="font-mono text-[11px] text-[#B0BEC5] leading-relaxed">
                Timezone-aware logging. Grace periods configurable per habit. No silent resets.
              </p>
            </div>

            {/* Big streak number */}
            <div className="text-center py-6">
              <div
                className="font-mono font-bold text-[5rem] leading-none"
                style={{ color: '#00E676', textShadow: '0 0 60px rgba(0,230,118,0.4)' }}
              >
                47
              </div>
              <div className="font-mono text-[11px] text-[#B0BEC5] mt-1 uppercase tracking-[0.2em]">
                current streak
              </div>
              <div className="font-mono text-[9px] text-[rgba(176,190,197,0.4)] mt-2">
                longest: <span className="text-[#B0BEC5]">112 days</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { key: 'timezone', val: 'America/New_York' },
                { key: 'grace_window', val: '2hr' },
                { key: 'freeze_tokens', val: '3 / month' },
              ].map(item => (
                <div key={item.key} className="flex justify-between font-mono text-[10px]">
                  <span className="text-[rgba(176,190,197,0.4)]">{item.key}:</span>
                  <span className="text-[#B0BEC5]">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 6: Data Export (wide) ── */}
          <div
            className="md:col-span-2 bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)]"
            style={{ background: '#0F0F1A' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 06</span>
                <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1">Data Export & API</h3>
                <p className="font-mono text-[11px] text-[#B0BEC5] mt-1 max-w-sm leading-relaxed">
                  Your data, your format. Export to CSV, JSON, or pipe directly into your existing spreadsheet stack via REST API.
                </p>
              </div>
            </div>

            {/* Code snippet */}
            <div
              className="rounded-xl p-4 font-mono text-[11px] leading-relaxed overflow-x-auto"
              style={{ background: '#08080F', border: '1px solid rgba(176,190,197,0.07)' }}
            >
              <div className="text-[rgba(176,190,197,0.35)] mb-2"># GET /api/v1/habits/export</div>
              <div>
                <span className="text-[#B0BEC5]">curl</span>
                <span className="text-[rgba(176,190,197,0.4)]"> -H </span>
                <span className="text-[#00E676]">"Authorization: Bearer $TOKEN"</span>
                <span className="text-[rgba(176,190,197,0.4)]"> \</span>
              </div>
              <div className="pl-4">
                <span className="text-[#B0BEC5]">https://api.streak.app/v1/export</span>
                <span className="text-[rgba(176,190,197,0.4)]"> \</span>
              </div>
              <div className="pl-4">
                <span className="text-[rgba(176,190,197,0.4)]">--data </span>
                <span className="text-[#00E676]">'{"{"}"format":"csv","range":"90d","habits":"all"{"}"}'</span>
              </div>
              <div className="mt-2 text-[rgba(176,190,197,0.3)]"># → Returns 90-day habit matrix, timestamped per entry</div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {['CSV', 'JSON', 'Parquet', 'Webhook', 'Zapier', 'Notion Sync'].map(fmt => (
                <span
                  key={fmt}
                  className="font-mono text-[10px] px-2 py-1 rounded border border-[rgba(176,190,197,0.1)] text-[#B0BEC5]"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* ── Card 7: Insight Engine ── */}
          <div
            className="bento-card reveal-up rounded-2xl p-6 border border-[rgba(176,190,197,0.08)]"
            style={{ background: '#0F0F1A' }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[rgba(176,190,197,0.4)]">Module 07</span>
            <h3 className="font-mono font-bold text-[1.1rem] text-[#E8EAED] mt-1 mb-1">Insight Engine</h3>
            <p className="font-mono text-[11px] text-[#B0BEC5] leading-relaxed mb-4">
              Correlation analysis across habits. Discover that skipping sleep predicts missed workouts 3 days later.
            </p>

            <div className="space-y-3">
              {[
                { a: 'Sleep 8hr', b: 'Morning run', corr: '+0.82', dir: 'positive' },
                { a: 'Hydration', b: 'Deep work', corr: '+0.67', dir: 'positive' },
                { a: 'No sugar', b: 'Meditation', corr: '+0.44', dir: 'positive' },
                { a: 'Late screen', b: 'Sleep 8hr', corr: '-0.71', dir: 'negative' },
              ].map((insight, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-[#B0BEC5] shrink-0">{insight.a}</span>
                  <span className="text-[rgba(176,190,197,0.3)]">↔</span>
                  <span className="text-[#B0BEC5] shrink-0">{insight.b}</span>
                  <span
                    className="ml-auto shrink-0 font-bold"
                    style={{ color: insight.dir === 'positive' ? '#00E676' : '#FF3D57' }}
                  >
                    {insight.corr}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[rgba(176,190,197,0.07)]">
              <span className="font-mono text-[9px] text-[rgba(176,190,197,0.3)]">
                algorithm: <span className="text-[#B0BEC5]">pearson r, lag-3d</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpecSheetBento;