import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Trophy, 
  DollarSign, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'console' | 'vitals'>('chart');

  return (
    <section
      id="about"
      className="relative w-full py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1A1A2E 0%, #2D2D2D 50%, #1A1A2E 100%)',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#FF6B9D]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* H2: Why MarkeTop? (Montserrat Black 40px #00D4FF, center) */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h2
              id="about-heading"
              className="text-[32px] sm:text-[40px] font-black tracking-tight uppercase"
              style={{
                color: '#00D4FF',
                fontWeight: 900,
                textShadow: '0 0 20px rgba(0, 212, 255, 0.45)',
              }}
            >
              Why MarkeTop?
            </h2>
            <p className="mt-3 text-[#B0B0B0] text-base sm:text-lg max-w-2xl mx-auto">
              We bridge predictive search telemetry, automated technical SEO, and conversion-focused architectures.
            </p>
          </motion.div>
        </div>

        {/* 2-column Grid (mobile stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: Stats cards (3 mini cards) - white cards on dark #2D2D2D gradient bg */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: 500+ Projects (chart icon, Neon Glow) */}
            <motion.div
              id="stat-card-projects"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-[#FFFFFD] text-[#0C0C0C] rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-transparent hover:border-[#00D4FF] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D4FF]/10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-xl bg-[#0C0C0C] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.65)',
                    border: '1px solid #00D4FF',
                  }}
                >
                  <BarChart3 className="w-8 h-8 text-[#00D4FF] filter drop-shadow-[0_0_8px_#00D4FF]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl sm:text-5xl font-black text-[#0C0C0C] tracking-tight"
                      style={{ fontWeight: 900 }}
                    >
                      500+
                    </span>
                    <span className="text-sm font-bold text-[#00D4FF] uppercase tracking-wide">
                      Verified
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-0.5">
                    Projects Scaled
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-medium">
                    Enterprise SEO migrations, technical overhauls & SERP dominations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: 98% Client Retention (Trophy icon) */}
            <motion.div
              id="stat-card-retention"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-[#FFFFFD] text-[#0C0C0C] rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-transparent hover:border-[#FF6B9D] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B9D]/10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-xl bg-[#0C0C0C] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 107, 157, 0.65)',
                    border: '1px solid #FF6B9D',
                  }}
                >
                  <Trophy className="w-8 h-8 text-[#FF6B9D] filter drop-shadow-[0_0_8px_#FF6B9D]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl sm:text-5xl font-black text-[#0C0C0C] tracking-tight"
                      style={{ fontWeight: 900 }}
                    >
                      98%
                    </span>
                    <span className="text-sm font-bold text-[#FF6B9D] uppercase tracking-wide">
                      Year-over-Year
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-0.5">
                    Client Retention
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-medium">
                    Long-term partners driven by data transparency and sustained rank defense.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: 3x ROI average (dollar icon) */}
            <motion.div
              id="stat-card-roi"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-[#FFFFFD] text-[#0C0C0C] rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-transparent hover:border-[#00D4FF] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D4FF]/10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-xl bg-[#0C0C0C] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.65)',
                    border: '1px solid #00D4FF',
                  }}
                >
                  <DollarSign className="w-8 h-8 text-[#00D4FF] filter drop-shadow-[0_0_8px_#00D4FF]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl sm:text-5xl font-black text-[#0C0C0C] tracking-tight"
                      style={{ fontWeight: 900 }}
                    >
                      3x
                    </span>
                    <span className="text-sm font-bold text-[#00D4FF] uppercase tracking-wide">
                      Multiplier
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-0.5">
                    ROI Average
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-medium">
                    Attributable pipeline revenue generated per marketing capital invested.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: profile image (Coder/Analytics Dashboard, Neon Border #00D4FF, Hover Zoom, glassmorphism bg) */}
          <div className="lg:col-span-7">
            <motion.div
              id="analytics-dashboard-profile"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: '3px solid #00D4FF',
                boxShadow: '0 0 25px rgba(0, 212, 255, 0.45), inset 0 0 25px rgba(0, 212, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                background: 'rgba(22, 33, 62, 0.45)',
              }}
            >
              {/* Inner wrapper with Hover Zoom on dashboard */}
              <div className="p-5 sm:p-6 lg:p-7 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                {/* Dashboard Window Header */}
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#00D4FF]/20 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF6B9D] inline-block shadow-[0_0_8px_#FF6B9D]" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#00D4FF] inline-block shadow-[0_0_8px_#00D4FF]" />
                    <span className="font-mono text-xs text-[#00D4FF] font-semibold ml-2">
                      MARKETOP_TELEMETRY_ENGINE_v4.8
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('chart')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeTab === 'chart'
                          ? 'bg-[#00D4FF] text-black font-bold'
                          : 'bg-[#1A1A1A] text-[#B0B0B0] hover:text-white'
                      }`}
                    >
                      Realtime Curve
                    </button>
                    <button
                      onClick={() => setActiveTab('console')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeTab === 'console'
                          ? 'bg-[#00D4FF] text-black font-bold'
                          : 'bg-[#1A1A1A] text-[#B0B0B0] hover:text-white'
                      }`}
                    >
                      Audit Console
                    </button>
                    <button
                      onClick={() => setActiveTab('vitals')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeTab === 'vitals'
                          ? 'bg-[#00D4FF] text-black font-bold'
                          : 'bg-[#1A1A1A] text-[#B0B0B0] hover:text-white'
                      }`}
                    >
                      Core Vitals
                    </button>
                  </div>
                </div>

                {/* Dashboard Metrics Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-[#0C0C0C]/80 border border-[#00D4FF]/30">
                    <div className="text-[10px] uppercase font-mono text-[#B0B0B0]">Crawl Latency</div>
                    <div className="text-lg font-bold text-[#00D4FF] font-mono">24 ms</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0C0C0C]/80 border border-[#00D4FF]/30">
                    <div className="text-[10px] uppercase font-mono text-[#B0B0B0]">Organic SERP #1</div>
                    <div className="text-lg font-bold text-white font-mono">1,489</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0C0C0C]/80 border border-[#FF6B9D]/30">
                    <div className="text-[10px] uppercase font-mono text-[#B0B0B0]">CTR Spike</div>
                    <div className="text-lg font-bold text-[#FF6B9D] font-mono">+18.4%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0C0C0C]/80 border border-emerald-400/30">
                    <div className="text-[10px] uppercase font-mono text-[#B0B0B0]">Lighthouse</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono">100/100</div>
                  </div>
                </div>

                {/* Tab 1: Realtime Curve Visual */}
                {activeTab === 'chart' && (
                  <div className="p-4 rounded-xl bg-[#0C0C0C]/90 border border-white/10 relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00D4FF] animate-pulse" />
                        <span className="text-xs font-semibold text-white">Live Search Traffic Velocity</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-0.5 rounded border border-[#00D4FF]/20">
                        +342% vs Baseline
                      </span>
                    </div>

                    {/* SVG Neon Curved Line Graph */}
                    <div className="w-full h-44 relative overflow-hidden">
                      <svg viewBox="0 0 500 160" className="w-full h-full preserve-3d">
                        <defs>
                          <linearGradient id="neonGradientArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="neonLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#00D4FF" />
                            <stop offset="65%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#FF6B9D" />
                          </linearGradient>
                          <filter id="neonGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                        {/* Baseline previous performance */}
                        <path
                          d="M 0 130 Q 80 120, 160 125 T 320 115 T 500 100"
                          fill="none"
                          stroke="rgba(176, 176, 176, 0.3)"
                          strokeWidth="2"
                          strokeDasharray="6 6"
                        />

                        {/* Area fill */}
                        <path
                          d="M 0 140 Q 75 110, 140 95 T 260 60 T 380 40 T 500 15 L 500 160 L 0 160 Z"
                          fill="url(#neonGradientArea)"
                        />

                        {/* MarkeTop Accelerated Traffic Path */}
                        <path
                          d="M 0 140 Q 75 110, 140 95 T 260 60 T 380 40 T 500 15"
                          fill="none"
                          stroke="url(#neonLine)"
                          strokeWidth="3.5"
                          filter="url(#neonGlowEffect)"
                        />

                        {/* Glowing data focal point */}
                        <circle cx="500" cy="15" r="5" fill="#FF6B9D" />
                        <circle cx="500" cy="15" r="10" fill="#FF6B9D" opacity="0.4" className="animate-ping" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-[#666] pt-1">
                      <span>Wk 01 (Audit)</span>
                      <span>Wk 04 (Keyword Clustering)</span>
                      <span>Wk 08 (Scale & Dominate)</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Code / Audit Console */}
                {activeTab === 'console' && (
                  <div className="p-4 rounded-xl bg-[#0C0C0C] border border-[#00D4FF]/30 font-mono text-xs text-[#00D4FF] space-y-1.5 h-44 overflow-y-auto">
                    <p className="text-emerald-400">&gt; npm run audit:deep-crawl --target=prod</p>
                    <p className="text-[#B0B0B0]">[INFO] Parsing robots.txt and sitemap.xml ... OK (1,240 URLs)</p>
                    <p className="text-[#00D4FF]">[SUCCESS] Canonical tags normalized. 0 duplicate clusters found.</p>
                    <p className="text-[#FF6B9D]">[AUTO-FIX] Schema.org ProfessionalService JSON-LD injected.</p>
                    <p className="text-emerald-400">[RESULT] Average Organic SERP Velocity increased by +340%.</p>
                    <p className="text-white animate-pulse">&gt; Ready for continuous deployment [LIVE STREAM]</p>
                  </div>
                )}

                {/* Tab 3: Core Vitals */}
                {activeTab === 'vitals' && (
                  <div className="p-4 rounded-xl bg-[#0C0C0C] border border-[#00D4FF]/30 space-y-3 h-44 flex flex-col justify-center">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-white">Largest Contentful Paint (LCP)</span>
                        <span className="text-emerald-400 font-mono">0.62s (Optimal)</span>
                      </div>
                      <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[94%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-white">Cumulative Layout Shift (CLS)</span>
                        <span className="text-[#00D4FF] font-mono">0.001 (Zero Shift)</span>
                      </div>
                      <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#00D4FF] h-full w-[99%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-white">First Input Delay (FID)</span>
                        <span className="text-emerald-400 font-mono">8ms (Sub-frame)</span>
                      </div>
                      <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#00D4FF] to-emerald-400 h-full w-[98%]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom interactive status bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#B0B0B0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-white font-medium">Neural Growth Node: Active</span>
                  </div>
                  <span className="text-[#00D4FF] font-mono text-[11px] group-hover:underline flex items-center gap-1">
                    Live Telemetry <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
