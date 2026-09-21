import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Search, 
  Globe, 
  Calendar, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Zap,
  TrendingUp
} from 'lucide-react';
import { AuditReport } from '../types';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
  mode: 'audit' | 'call';
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  initialDomain = '',
  mode: initialMode,
}) => {
  const [currentMode, setCurrentMode] = useState<'audit' | 'call'>(initialMode);
  const [domain, setDomain] = useState(initialDomain || 'example-brand.com');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM EST');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Sync mode when prop changes
  React.useEffect(() => {
    setCurrentMode(initialMode);
    if (initialDomain) setDomain(initialDomain);
  }, [initialMode, initialDomain, isOpen]);

  const auditSteps = [
    'Resolving DNS & Robots.txt parameters...',
    'Testing Core Web Vitals (LCP, CLS, FID)...',
    'Analyzing Top 1,000 Organic Keyword SERPs...',
    'Auditing Competitor Backlink Discrepancies...',
    'Synthesizing 24-Hour Growth Road Map...',
  ];

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setIsAuditing(true);
    setReport(null);
    setAuditStep(0);

    const stepInterval = setInterval(() => {
      setAuditStep((prev) => {
        if (prev < auditSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setIsAuditing(false);
          setReport({
            domain: domain.replace(/^https?:\/\//, ''),
            overallScore: 84,
            seoHealth: 92,
            pageSpeed: 89,
            backlinks: 3420,
            organicKeywords: 1840,
            topRecommendation: 'Consolidate 14 cannibalizing blog clusters into high-authority pillar nodes.',
          });
          return prev;
        }
      });
    }, 600);
  };

  const handleBookCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#161622] rounded-3xl border-2 border-[#00D4FF] shadow-[0_0_50px_rgba(0,212,255,0.4)] overflow-hidden z-10 my-8"
        >
          {/* Neon Header bar */}
          <div className="p-6 bg-[#1A1A2E] border-b border-[#00D4FF]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF]">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>MarkeTop Data Engine</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 font-mono">
                    ONLINE
                  </span>
                </h3>
                <p className="text-xs text-[#B0B0B0]">
                  Real-time algorithmic crawler and strategy generator
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#B0B0B0] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-2 bg-[#0C0C0C]/50 border-b border-white/5 font-mono text-xs">
            <button
              onClick={() => {
                setCurrentMode('audit');
                setBookingConfirmed(false);
              }}
              className={`py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                currentMode === 'audit'
                  ? 'bg-[#00D4FF] text-black shadow-[0_0_15px_#00D4FF]'
                  : 'text-[#B0B0B0] hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Free SEO Audit</span>
            </button>
            <button
              onClick={() => {
                setCurrentMode('call');
                setBookingConfirmed(false);
              }}
              className={`py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                currentMode === 'call'
                  ? 'bg-[#FF6B9D] text-white shadow-[0_0_15px_#FF6B9D]'
                  : 'text-[#B0B0B0] hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Call</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {currentMode === 'audit' ? (
              <div>
                {!report && !isAuditing && (
                  <form onSubmit={handleRunAudit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">
                        Target Domain to Audit
                      </label>
                      <div className="relative flex items-center">
                        <Globe className="absolute left-4 w-5 h-5 text-[#00D4FF]" />
                        <input
                          type="text"
                          required
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                          placeholder="e.g. acme-growth.com"
                          className="w-full bg-[#0C0C0C] border border-[#00D4FF]/40 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-[#666] focus:outline-none focus:border-[#00D4FF] font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">
                        Work Email (for Road Map dispatch)
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-[#666] focus:outline-none focus:border-[#00D4FF] text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        background: 'linear-gradient(90deg, #00D4FF 0%, #FF6B9D 100%)',
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Execute Full Diagnostic</span>
                    </button>
                  </form>
                )}

                {isAuditing && (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-[#00D4FF]/20 animate-ping" />
                      <div className="w-full h-full rounded-full border-4 border-[#00D4FF] border-t-transparent animate-spin flex items-center justify-center">
                        <Activity className="w-8 h-8 text-[#00D4FF]" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Deep Crawling in Progress
                    </h4>
                    <p className="text-sm font-mono text-[#00D4FF] animate-pulse">
                      {auditSteps[auditStep]}
                    </p>
                    <div className="w-full max-w-md bg-[#0C0C0C] h-2 rounded-full overflow-hidden mt-6">
                      <div
                        className="bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D] h-full transition-all duration-500"
                        style={{
                          width: `${((auditStep + 1) / auditSteps.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {report && !isAuditing && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0C0C0C] border border-[#00D4FF]/40">
                      <div>
                        <div className="text-xs text-[#B0B0B0] font-mono uppercase">Analyzed Domain</div>
                        <div className="text-lg font-bold text-white font-mono">{report.domain}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#B0B0B0] font-mono uppercase">Health Score</div>
                        <div className="text-2xl font-black text-[#00D4FF] font-mono">
                          {report.overallScore}/100
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#0C0C0C] border border-white/10 text-center">
                        <div className="text-xs text-[#B0B0B0]">SEO Health</div>
                        <div className="text-xl font-black text-emerald-400 mt-1">{report.seoHealth}%</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0C0C0C] border border-white/10 text-center">
                        <div className="text-xs text-[#B0B0B0]">Speed Index</div>
                        <div className="text-xl font-black text-[#00D4FF] mt-1">{report.pageSpeed}/100</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0C0C0C] border border-white/10 text-center">
                        <div className="text-xs text-[#B0B0B0]">Backlinks</div>
                        <div className="text-xl font-black text-[#FF6B9D] mt-1">{report.backlinks.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1A1A2E] border-l-4 border-[#00D4FF] text-xs">
                      <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
                        <span>High-Impact Growth Opportunity:</span>
                      </div>
                      <p className="text-[#B0B0B0] leading-relaxed">
                        {report.topRecommendation}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentMode('call')}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D] text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Review with Strategist</span>
                      </button>
                      <button
                        onClick={() => setReport(null)}
                        className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
                      >
                        Audit Another
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {!bookingConfirmed ? (
                  <form onSubmit={handleBookCallSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Miller"
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B9D] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#FF6B9D] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">
                        Preferred Strategy Session Time
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B9D] text-sm"
                      >
                        <option value="Tomorrow, 2:00 PM EST">Tomorrow, 2:00 PM EST (Recommended)</option>
                        <option value="Thursday, 11:00 AM EST">Thursday, 11:00 AM EST</option>
                        <option value="Friday, 3:30 PM EST">Friday, 3:30 PM EST</option>
                        <option value="Next Monday, 10:00 AM EST">Next Monday, 10:00 AM EST</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-white font-extrabold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
                      style={{
                        background: 'linear-gradient(90deg, #FF6B9D 0%, #00D4FF 100%)',
                        boxShadow: '0 0 20px rgba(255, 107, 157, 0.4)',
                      }}
                    >
                      <Calendar className="w-4 h-4 text-white" />
                      <span>Confirm 30-Min Strategy Call</span>
                    </button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      Strategy Session Scheduled!
                    </h4>
                    <p className="text-sm text-[#B0B0B0] max-w-sm mx-auto">
                      Calendar invite and preliminary telemetry report dispatched to{' '}
                      <span className="text-[#00D4FF] font-semibold">{email || 'your email'}</span>.
                    </p>
                    <div className="p-4 rounded-xl bg-[#0C0C0C] border border-white/10 inline-block text-xs font-mono text-[#00D4FF]">
                      Slot: {selectedDate}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
