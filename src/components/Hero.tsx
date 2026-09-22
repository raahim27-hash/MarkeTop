import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp, Sparkles, Activity, Search, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onLaunchAnalytics: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchAnalytics }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pulseCount, setPulseCount] = useState(14820);

  // Live telemetry pulse ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Subtle interactive particle system for Data Pulse futuristic background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 22), 65);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glow: number;
    }> = [];

    const colors = ['#00D4FF', '#FF6B9D', '#38bdf8', '#818cf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2.2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() * 10 + 6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.16 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 md:py-0"
      style={{
        background: 'linear-gradient(135deg, #0C0C0C 0%, #1A1A2E 50%, #16213E 100%)',
      }}
    >
      {/* Background canvas for animated subtle data particles */}
      <canvas
        id="hero-particle-canvas"
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Futuristic ambient neon radial glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF6B9D]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Animated Data Telemetry Chips (Data Points throughout Hero) that breathe on hover */}
      <motion.div
        id="telemetry-badge-traffic"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 30px rgba(0,212,255,0.45), 0 10px 25px rgba(0,0,0,0.5)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex absolute left-8 xl:left-20 top-1/3 items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A2E]/75 backdrop-blur-md border border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.25)] z-10 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 flex items-center justify-center text-[#00D4FF] border border-[#00D4FF]/40">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B0B0B0]">
            Organic Traffic
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-1.5">
            <span className="text-[#00D4FF] font-black">+248.6%</span>
            <span className="text-[10px] text-emerald-400">▲ MoM</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="telemetry-badge-keywords"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 30px rgba(255,107,157,0.4), 0 10px 25px rgba(0,0,0,0.5)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden lg:flex absolute right-8 xl:right-20 top-1/4 items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A2E]/75 backdrop-blur-md border border-[#FF6B9D]/30 shadow-[0_0_20px_rgba(255,107,157,0.2)] z-10 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-[#FF6B9D]/15 flex items-center justify-center text-[#FF6B9D] border border-[#FF6B9D]/40">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B0B0B0]">
            Rank #1 Keywords
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-1">
            <span className="text-[#FF6B9D] font-black">1,842</span>
            <span className="text-[10px] text-[#B0B0B0]">Indexed</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="telemetry-badge-datapulse"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 25px rgba(0,212,255,0.5)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hidden md:flex absolute bottom-12 left-12 lg:left-24 items-center gap-3 px-4 py-2.5 rounded-full bg-[#16213E]/80 backdrop-blur-md border border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.3)] z-10 text-xs cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4FF]"></span>
        </span>
        <span className="font-semibold text-white">Data Pulse Engine:</span>
        <span className="font-mono text-[#00D4FF] font-bold">
          {pulseCount.toLocaleString()} events/sec
        </span>
      </motion.div>

      {/* Main Center Content (max-width: 800px) */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Cyber Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A2E]/90 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,212,255,0.25)]"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#00D4FF]" />
          <span>Next-Gen SEO & Digital Intelligence</span>
        </motion.div>

        {/* H1: Your SEO Growth Engine (Montserrat Black 56px, white, text-shadow: 0 0 30px rgba(255, 255, 255, 0.5)) */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-black text-[38px] sm:text-[46px] md:text-[56px] text-white leading-[1.12] tracking-tight mb-6"
          style={{
            fontWeight: 900,
            textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.25)',
          }}
        >
          Your SEO Growth Engine
        </motion.h1>

        {/* Subtitle: Analytics-powered marketing strategies that convert visitors to revenue (#B0B0B0, 24px) */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#B0B0B0] text-[18px] sm:text-[21px] md:text-[24px] leading-relaxed max-w-[720px] mb-10 font-normal"
        >
          Analytics-powered marketing strategies that convert visitors to revenue
        </motion.p>

        {/* CTA Button: Launch Analytics (swells invitingly with shadow lift on hover, presses down realistically and bounces back on click) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            id="hero-launch-analytics-btn"
            onClick={onLaunchAnalytics}
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
            className="group relative cursor-pointer font-bold text-black uppercase tracking-wider text-[15px] sm:text-[16px] flex items-center justify-center gap-3 animate-neon-pulse select-none"
            style={{
              background: 'linear-gradient(90deg, #00D4FF 0%, #FF6B9D 100%)',
              padding: '20px 38px',
              borderRadius: '50px',
            }}
          >
            <Sparkles className="w-5 h-5 text-black group-hover:rotate-12 transition-transform duration-300" />
            <span>Launch Analytics</span>
            <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Mini Trust Metrics Bar underneath CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#B0B0B0]"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
            <span>Real-time Serps Audit</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AI Automated Keyword Clustering</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B9D] font-bold">24h</span>
            <span>Road Map Delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#2D2D2D]/60 to-transparent pointer-events-none" />
    </section>
  );
};
