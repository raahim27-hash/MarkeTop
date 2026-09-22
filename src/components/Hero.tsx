import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp, Sparkles, Activity, Search, ShieldCheck, Film } from 'lucide-react';

interface HeroProps {
  onLaunchAnalytics: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchAnalytics }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [pulseCount, setPulseCount] = useState(14820);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);

  const videoUrl = 'https://res.cloudinary.com/xmc69m43/video/upload/v1790103784/ai_video.mp4';
  const posterUrl = 'https://res.cloudinary.com/xmc69m43/video/upload/v1790103784/ai_video.jpg';

  // Device detection for graceful mobile fallback
  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth < 768;
      const isTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 1024;
      setIsMobile(isNarrow || isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Video Scroll-Scrubbing Engine:
  // Video progresses naturally with scroll direction (forward down, backward up)
  // RAF lerp interpolation prevents video decoder bottleneck or jitter
  useEffect(() => {
    if (isMobile) return;

    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let targetTime = 0;
    let currentTime = 0;
    let isSeeking = false;

    const handleSeeking = () => {
      isSeeking = true;
    };
    const handleSeeked = () => {
      isSeeking = false;
    };
    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      video.pause();
    };

    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const updateScrollScrub = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Scrub distance across the Hero section (0 to ~125vh)
      const scrubRange = Math.max(window.innerHeight * 1.25, 750);
      const progress = Math.min(1, Math.max(0, scrollY / scrubRange));
      setScrubProgress(progress);

      const duration = video.duration && !isNaN(video.duration) && video.duration > 0
        ? video.duration
        : 5.184;

      // Keep slightly below absolute end to avoid EOF black frame or looping glitches
      targetTime = progress * Math.max(0, duration - 0.06);
    };

    window.addEventListener('scroll', updateScrollScrub, { passive: true });
    updateScrollScrub();

    // Smooth exponential damping RAF loop
    const scrubLoop = () => {
      if (video && video.readyState >= 2 && !isSeeking) {
        const delta = targetTime - currentTime;
        if (Math.abs(delta) > 0.006) {
          currentTime += delta * 0.18;
          const dur = video.duration || 5.184;
          currentTime = Math.max(0, Math.min(dur - 0.03, currentTime));

          try {
            video.currentTime = currentTime;
          } catch {
            // Safe guard against rapid resize seek exceptions
          }
        }
      }
      rafId = requestAnimationFrame(scrubLoop);
    };

    rafId = requestAnimationFrame(scrubLoop);

    return () => {
      window.removeEventListener('scroll', updateScrollScrub);
      cancelAnimationFrame(rafId);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isMobile]);

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
      {/* 
        ====================================================================
        SCROLL SCRUBBING HERO VIDEO BACKGROUND WITH HIGH-CONTRAST OVERLAYS
        ====================================================================
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Desktop: Scroll Scrubbing Video (Progresses naturally with scroll direction) */}
        {!isMobile ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center will-change-transform"
              style={{
                transform: `scale(${1.02 + scrubProgress * 0.05}) translateY(${scrubProgress * 25}px)`,
                transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                filter: 'brightness(0.78) contrast(1.12) saturate(1.15)',
              }}
            />
            {/* Soft poster preloader while video stream loads */}
            {!videoLoaded && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{
                  backgroundImage: `url('${posterUrl}')`,
                  filter: 'brightness(0.78) contrast(1.12)',
                }}
              />
            )}
          </div>
        ) : (
          /* Mobile: Graceful static image fallback with subtle organic breathing */
          <div
            className="w-full h-full bg-cover bg-center will-change-transform animate-subtle-breathe"
            style={{
              backgroundImage: `url('${posterUrl}')`,
              filter: 'brightness(0.74) contrast(1.15) saturate(1.15)',
            }}
          />
        )}

        {/* 
          Multi-Layer Dark Overlays: Keeps all text crisp, vibrant, and effortlessly readable
        */}
        {/* 1. Base dark tint */}
        <div className="absolute inset-0 bg-[#0C0C0C]/65" />

        {/* 2. Directional gradient matching natural page flow (deep top for fixed header, smooth transition to bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/90 via-[#0C0C0C]/55 to-[#1A1A2E]/95" />

        {/* 3. Radial spotlight: highlights center content while darkening periphery */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(12, 12, 12, 0.40) 0%, rgba(12, 12, 12, 0.78) 65%, rgba(12, 12, 12, 0.95) 100%)',
          }}
        />

        {/* 4. Data Pulse futuristic brand chromatic glow washes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,212,255,0.12)_0%,transparent_50%),radial-gradient(circle_at_80%_75%,rgba(255,107,157,0.10)_0%,transparent_50%)]" />
      </div>

      {/* Background canvas for animated subtle data particles (layered over video for 3D holographic depth) */}
      <canvas
        id="hero-particle-canvas"
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70 mix-blend-screen"
      />

      {/* Futuristic ambient neon radial glow orbs with cinematic opening fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF6B9D]/10 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Floating Animated Data Telemetry Chips - Arriving smoothly after movie opening */}
      <motion.div
        id="telemetry-badge-traffic"
        initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 30px rgba(0,212,255,0.45), 0 10px 25px rgba(0,0,0,0.5)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ duration: 1.0, delay: 1.85, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 30px rgba(255,107,157,0.4), 0 10px 25px rgba(0,0,0,0.5)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ duration: 1.0, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 25px rgba(0,212,255,0.5)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ duration: 1.0, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex absolute bottom-12 left-12 lg:left-24 items-center gap-3 px-4 py-2.5 rounded-full bg-[#16213E]/80 backdrop-blur-md border border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.3)] z-10 text-xs cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4FF]"></span>
        </span>
        <span className="font-semibold text-white">Data Pulse:</span>
        <span className="font-mono text-[#00D4FF] font-bold">
          {pulseCount.toLocaleString()} evt/s
        </span>
        <span className="text-[#333]">|</span>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#B0B0B0]">
          <Film className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span>{isMobile ? 'Static HD' : `Scrub ${Math.round(scrubProgress * 100)}%`}</span>
        </div>
      </motion.div>

      {/* Main Center Content (max-width: 800px) */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Cyber Tag - Movie Opening Prologue */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A2E]/90 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,212,255,0.25)]"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#00D4FF]" />
          <span>Next-Gen SEO & Digital Intelligence</span>
        </motion.div>

        {/* H1: Your SEO Growth Engine - Sweeps up gracefully like a movie opening title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 55, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.25, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-[38px] sm:text-[46px] md:text-[56px] text-white leading-[1.12] tracking-tight mb-6"
          style={{
            fontWeight: 900,
            textShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.35)',
          }}
        >
          Your SEO Growth Engine
        </motion.h1>

        {/* Subtitle: Follows elegantly like movie narration */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.15, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#E0E0E0] text-[18px] sm:text-[21px] md:text-[24px] leading-relaxed max-w-[720px] mb-10 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          Analytics-powered marketing strategies that convert visitors to revenue
        </motion.p>

        {/* CTA Button: Arrives last with purpose */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.9, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#E0E0E0]"
        >
          <div className="flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
            <span>Real-time Serps Audit</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50 hidden sm:block" />
          <div className="flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span>AI Automated Keyword Clustering</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50 hidden sm:block" />
          <div className="flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="text-[#FF6B9D] font-bold">24h</span>
            <span>Road Map Delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Seamless bottom gradient dissolve transition to About section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A1A2E] to-transparent pointer-events-none" />
    </section>
  );
};
