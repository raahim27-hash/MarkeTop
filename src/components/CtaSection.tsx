import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle,
  Globe
} from 'lucide-react';

interface CtaSectionProps {
  onStartAudit: (domain?: string) => void;
  onBookCall: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartAudit, onBookCall }) => {
  const [quickDomain, setQuickDomain] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuickAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickDomain.trim()) {
      onStartAudit();
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onStartAudit(quickDomain);
    }, 400);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0C0C0C 0%, #10162B 50%, #16213E 100%)',
      }}
    >
      {/* Wave Decorative SVG Transition at top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#1A1A1A]"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Cyber Wave Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00D4FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-4 left-1/3 w-[500px] h-[250px] bg-[#FF6B9D]/12 rounded-full blur-[130px] pointer-events-none" />

      {/* Center Max Width 700px */}
      <div className="relative z-10 max-w-[700px] mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16213E] border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(0,212,255,0.3)]"
        >
          <Clock className="w-3.5 h-3.5 text-[#00D4FF] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Rapid 24-Hour Delivery Guaranteed</span>
        </motion.div>

        {/* H2: Ready to 10X your digital presence? (white 44PX Neon Glow) */}
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[34px] sm:text-[40px] md:text-[44px] font-black text-white leading-tight tracking-tight mb-5"
          style={{
            fontWeight: 900,
            textShadow: '0 0 25px rgba(255, 255, 255, 0.6), 0 0 45px rgba(0, 212, 255, 0.4)',
          }}
        >
          Ready to 10X your digital presence?
        </motion.h2>

        {/* P: Get your free SEO Audit + Growth Road map in 24 hours (#B0B0B0 20PX) */}
        <motion.p
          id="cta-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#B0B0B0] text-[18px] sm:text-[20px] leading-relaxed mb-10 max-w-[620px]"
          style={{ fontSize: '20px', color: '#B0B0B0' }}
        >
          Get your free SEO Audit + Growth Road map in 24 hours
        </motion.p>

        {/* Quick Domain Input Box with Neon border */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmitQuickAudit}
          className="w-full max-w-lg mb-8"
        >
          <div className="relative flex items-center rounded-full bg-[#0C0C0C]/90 p-1.5 border-2 border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.35)] focus-within:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300">
            <div className="pl-4 text-[#00D4FF]">
              <Globe className="w-5 h-5 opacity-80" />
            </div>
            <input
              id="cta-domain-input"
              type="text"
              value={quickDomain}
              onChange={(e) => setQuickDomain(e.target.value)}
              placeholder="Enter your website URL (e.g. acme.com)"
              className="w-full bg-transparent px-3 py-2 text-white placeholder-[#707070] text-sm focus:outline-none font-medium"
            />
            <motion.button
              id="cta-quick-submit-btn"
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.06, boxShadow: '0 0 20px #00D4FF' }}
              whileTap={{ scale: 0.92, y: 1 }}
              className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#00D4FF] hover:bg-white shadow-[0_0_15px_#00D4FF] transition-all duration-300 cursor-pointer"
            >
              {isSubmitting ? 'Analyzing...' : 'Audit'}
            </motion.button>
          </div>
        </motion.form>

        {/* Dual CTA buttons: 
            - Primary: "Start Free Audit" (swells on hover, realistic press & bounce on click)
            - Secondary: "Book Strategy Call" (outline #00D4FF, playful tilt on hover) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
        >
          {/* Primary: Start Free Audit (neon gradient, swell hover & realistic press/bounce) */}
          <motion.button
            id="cta-start-free-audit-btn"
            onClick={() => onStartAudit(quickDomain)}
            whileHover={{
              scale: 1.07,
              y: -5,
              boxShadow:
                '0 20px 45px -8px rgba(0, 212, 255, 0.65), 0 10px 30px rgba(255, 107, 157, 0.5), 0 0 35px rgba(0, 212, 255, 0.4)',
              transition: { type: 'spring', stiffness: 420, damping: 18 },
            }}
            whileTap={{
              scale: 0.93,
              y: 3,
              boxShadow:
                '0 4px 14px rgba(0, 212, 255, 0.4), 0 2px 8px rgba(255, 107, 157, 0.3)',
              transition: { type: 'spring', stiffness: 750, damping: 22 },
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-black font-bold uppercase tracking-wider text-[15px] sm:text-[16px] flex items-center justify-center gap-2.5 animate-neon-pulse cursor-pointer select-none"
            style={{
              background: 'linear-gradient(90deg, #00D4FF 0%, #FF6B9D 100%)',
              fontWeight: 800,
            }}
          >
            <Rocket className="w-5 h-5 text-black" />
            <span>Start Free Audit</span>
          </motion.button>

          {/* Secondary: Book Strategy Call (outline #00D4FF, tilt on hover, press down realistic) */}
          <motion.button
            id="cta-book-strategy-call-btn"
            onClick={onBookCall}
            whileHover={{
              scale: 1.05,
              y: -4,
              rotateX: 4,
              rotateY: -4,
              boxShadow: '0 15px 35px rgba(0, 212, 255, 0.4), 0 0 25px rgba(0, 212, 255, 0.65)',
              transition: { type: 'spring', stiffness: 400, damping: 18 },
            }}
            whileTap={{
              scale: 0.94,
              y: 2,
              boxShadow: '0 2px 10px rgba(0, 212, 255, 0.3)',
              transition: { type: 'spring', stiffness: 700, damping: 20 },
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold uppercase tracking-wider text-[15px] sm:text-[16px] flex items-center justify-center gap-2.5 transition-colors duration-300 hover:text-[#00D4FF] hover:bg-[#00D4FF]/10 cursor-pointer group"
            style={{
              border: '2px solid #00D4FF',
              boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)',
            }}
          >
            <Calendar className="w-5 h-5 text-[#00D4FF] group-hover:rotate-12 transition-transform duration-300" />
            <span>Book Strategy Call</span>
          </motion.button>
        </motion.div>

        {/* Feature Checkpoints */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#B0B0B0]">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
            <span>Custom Competitive Gap Report</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
            <span>Senior Search Strategist Review</span>
          </div>
        </div>
      </div>
    </section>
  );
};
