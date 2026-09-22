import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  Search, 
  ShieldCheck, 
  Film, 
  CheckCircle2,
  Maximize2,
  Wifi
} from 'lucide-react';

interface HeroProps {
  onLaunchAnalytics: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchAnalytics }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [pulseCount, setPulseCount] = useState(14820);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);

  const videoUrl = 'https://res.cloudinary.com/xmc69m43/video/upload/v1790103784/ai_video.mp4';
  const posterUrl = 'https://res.cloudinary.com/xmc69m43/video/upload/v1790103784/ai_video.jpg';

  // Responsive device check for graceful mobile fallback
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

  // Live telemetry pulse ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Original interactive particle canvas background
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

      // Connecting lines between nearby particles
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

      // Draw particle nodes with neon glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = height;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Video Scroll-Scrubbing Engine:
  // Progresses naturally with scroll direction: forward scrolling down, backward scrolling up.
  useEffect(() => {
    if (isMobile) return;

    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let targetTime = 0;
    let lastSeekTime = 0;

    const primeVideo = () => {
      setVideoLoaded(true);
      if (video.currentTime === 0) {
        try {
          video.currentTime = 0.001;
        } catch {
          // Safe ignore
        }
      }
    };

    video.addEventListener('loadeddata', primeVideo);
    video.addEventListener('canplay', primeVideo);
    video.addEventListener('loadedmetadata', primeVideo);

    if (video.readyState >= 2) {
      primeVideo();
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Scrub distance across hero section
      const scrubRange = Math.max(window.innerHeight * 1.25, 750);
      const progress = Math.min(1, Math.max(0, scrollY / scrubRange));
      setScrubProgress(progress);

      const duration = video.duration && !isNaN(video.duration) && video.duration > 0
        ? video.duration
        : 5.184;

      targetTime = progress * Math.max(0, duration - 0.06);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // High performance RAF loop: smoothly scrubs forward & backward
    const scrubLoop = () => {
      if (video && video.readyState >= 1) {
        const diff = targetTime - video.currentTime;
        const now = performance.now();

        if (Math.abs(diff) > 0.012 && (!video.seeking || now - lastSeekTime > 35)) {
          lastSeekTime = now;
          const step = diff * 0.32;
          const duration = video.duration || 5.184;
          const nextTime = Math.max(0, Math.min(duration - 0.04, video.currentTime + step));
          try {
            video.currentTime = nextTime;
          } catch {
            // Guard against seek interruption
          }
        }
      }
      rafId = requestAnimationFrame(scrubLoop);
    };

    rafId = requestAnimationFrame(scrubLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadeddata', primeVideo);
      video.removeEventListener('canplay', primeVideo);
      video.removeEventListener('loadedmetadata', primeVideo);
    };
  }, [isMobile]);

  // Motion transforms for 3D showcase perspective breathing
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const showcaseRotateX = useTransform(scrollYProgress, [0, 0.6], [8, -2]);
  const showcaseScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.025]);
  const showcaseY = useTransform(scrollYProgress, [0, 0.8], [0, 30]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #0C0C0C 0%, #1A1A2E 50%, #16213E 100%)',
      }}
    >
      {/* 
        ====================================================================
        ORIGINAL BACKGROUND: PARTICLES & AMBIENT NEON GLOWS (PRESERVED 100%)
        ====================================================================
      */}
      {/* Animated subtle particle canvas */}
      <canvas
        id="hero-particle-canvas"
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Futuristic ambient neon radial glow orbs with cinematic opening fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#00D4FF]/12 rounded-full blur-[140px] pointer-events-none z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#FF6B9D]/12 rounded-full blur-[140px] pointer-events-none z-0"
      />

      {/* Floating Animated Data Telemetry Chips (Original Positioned Badges) */}
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
        className="hidden xl:flex absolute left-8 2xl:left-16 top-44 items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A2E]/85 backdrop-blur-md border border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.25)] z-20 cursor-pointer"
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
        className="hidden xl:flex absolute right-8 2xl:right-16 top-44 items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A2E]/85 backdrop-blur-md border border-[#FF6B9D]/30 shadow-[0_0_20px_rgba(255,107,157,0.2)] z-20 cursor-pointer"
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

      {/* 
        ====================================================================
        HERO COPY & ACTION ROW (MOVIE OPENING REVEAL)
        ====================================================================
      */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center mb-10">
        {/* Subtle Cyber Tag / Pulse Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1A2E]/90 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(0,212,255,0.25)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]"></span>
          </span>
          <span className="font-semibold text-white">Data Pulse:</span>
          <span className="font-mono text-[#00D4FF] font-bold">
            {pulseCount.toLocaleString()} evt/s
          </span>
          <span className="text-[#555]">|</span>
          <span className="text-[#B0B0B0] font-normal">Next-Gen Digital Intelligence</span>
        </motion.div>

        {/* H1: Your SEO Growth Engine. (Movie opening reveal sweep) */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 55, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.25, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-[38px] sm:text-[48px] md:text-[60px] text-white leading-[1.08] tracking-tight mb-5"
          style={{
            fontWeight: 900,
            textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3)',
          }}
        >
          Your SEO Growth Engine.
        </motion.h1>

        {/* Subtitle: Follows elegantly like movie narration */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.15, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#B0B0B0] text-[18px] sm:text-[21px] md:text-[22px] leading-relaxed max-w-[720px] mb-8 font-normal"
        >
          We fuse deep SEO analytics with powerful automation to deliver sustained organic growth and exceptional ROI for your business.
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
              scale: 1.06,
              y: -4,
              boxShadow:
                '0 20px 45px -8px rgba(0, 212, 255, 0.65), 0 10px 30px rgba(255, 107, 157, 0.5), 0 0 35px rgba(0, 212, 255, 0.4)',
              transition: { type: 'spring', stiffness: 420, damping: 18 },
            }}
            whileTap={{
              scale: 0.94,
              y: 2,
              boxShadow: '0 4px 14px rgba(0, 212, 255, 0.4)',
              transition: { type: 'spring', stiffness: 750, damping: 22 },
            }}
            className="group relative cursor-pointer font-bold text-black uppercase tracking-wider text-[15px] sm:text-[16px] flex items-center justify-center gap-3 animate-neon-pulse select-none px-9 py-4 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00D4FF 0%, #FF6B9D 100%)',
            }}
          >
            <Sparkles className="w-5 h-5 text-black group-hover:rotate-12 transition-transform duration-300" />
            <span>Get Free Audit</span>
            <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* 
        ====================================================================
        OPTION 1: FLOATING 3D GLASS DEVICE / FUTURISTIC SCREEN SHOWCASE
        ====================================================================
        The video sits inside a dedicated floating 3D glass browser frame
        with 100% clarity (no dark overlay on video), glowing neon border,
        and natural scroll-scrubbing.
      */}
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          perspective: 1200,
        }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        {/* Dynamic 3D tilted device card */}
        <motion.div
          style={{
            rotateX: showcaseRotateX,
            scale: showcaseScale,
            y: showcaseY,
          }}
          className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 bg-gradient-to-b from-[#00D4FF]/40 via-white/10 to-[#FF6B9D]/30 shadow-[0_25px_70px_-15px_rgba(0,212,255,0.45),0_0_40px_rgba(255,107,157,0.25)] border border-white/15 backdrop-blur-xl group"
        >
          {/* Ambient backlight glow reflection behind the device */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF]/30 to-[#FF6B9D]/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 -z-10" />

          {/* Browser / Futuristic Mockup Header Chrome */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 rounded-t-xl sm:rounded-t-2xl bg-[#0C1222]/90 border-b border-white/10 select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_#FF5F56]/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_#FFBD2E]/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_#27C93F]/70 inline-block" />
            </div>

            {/* Mockup Address Bar */}
            <div className="flex items-center gap-2 px-3 sm:px-5 py-1 rounded-full bg-[#16213E]/80 border border-white/10 text-xs font-mono text-[#B0B0B0]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-[#00D4FF] font-semibold">marketop.ai</span>
              <span className="text-white/40">/neural-core</span>
            </div>

            {/* Video Scrubbing Status Badge */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 text-[11px]">
                <Film className="w-3 h-3 text-[#00D4FF]" />
                {isMobile ? 'STATIC HD' : `SCRUB ${Math.round(scrubProgress * 100)}%`}
              </span>
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 
            Video Viewport Stage: 
            Completely unobstructed, zero dark overlays on video, crystal clear 3D screen,
            yellow clouds, and wireframe terrain.
          */}
          <div className="relative w-full aspect-[2.36/1] sm:aspect-[2.2/1] rounded-b-xl sm:rounded-b-2xl overflow-hidden bg-black">
            {!isMobile ? (
              <div className="relative w-full h-full will-change-transform animate-subtle-breathe">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  poster={posterUrl}
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: 'contrast(1.05) saturate(1.08)',
                  }}
                />

                {/* Instant poster preloader while video stream primes */}
                {!videoLoaded && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{
                      backgroundImage: `url('${posterUrl}')`,
                      filter: 'contrast(1.05) saturate(1.08)',
                    }}
                  />
                )}
              </div>
            ) : (
              /* Mobile Graceful Static Fallback with Organic Breathing */
              <div
                className="w-full h-full bg-cover bg-center will-change-transform animate-subtle-breathe"
                style={{
                  backgroundImage: `url('${posterUrl}')`,
                  filter: 'contrast(1.05) saturate(1.08)',
                }}
              />
            )}

            {/* Subtle glass reflection sheen across device screen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Interactive Scroll Prompt Overlay Badge */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C1222]/85 backdrop-blur-md border border-[#00D4FF]/40 text-white text-xs font-mono shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] text-[#B0B0B0]">
                  {isMobile ? 'Live Interactive 3D' : 'Scroll Page To Scrub'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Checkpoints underneath the device */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#B0B0B0]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00D4FF]" />
            <span>Interactive SERP Simulation</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B9D]" />
            <span>Automated Keyword Clustering</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>24-Hour Road Map Guarantee</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Seamless bottom gradient dissolve transition to About section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A1A2E] to-transparent pointer-events-none z-10" />
    </section>
  );
};
