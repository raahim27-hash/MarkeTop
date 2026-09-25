import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Menu, X, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { NavItem } from '../types';

interface HeaderProps {
  onOpenAudit: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenAudit }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track global camera scroll progress across the continuous narrative
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY || window.pageYOffset;
          setScrolled(currentScroll > 20);

          const sections = ['home', 'about', 'services', 'contact'];
          const scrollPosition = currentScroll + 200;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/90 shadow-[0_4px_30px_rgba(0,0,0,0.85)] border-b border-[#00D4FF]/20 backdrop-blur-xl'
          : 'bg-transparent border-b border-white/5 backdrop-blur-sm'
      }`}
      style={{
        padding: '1.25rem 5%',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: MarkeTop Logo with Confident Subtle Pulse of Recognition */}
        <motion.a
          id="logo-brand"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          whileHover={{
            scale: 1.035,
            transition: { type: 'spring', stiffness: 450, damping: 18 },
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 group cursor-pointer select-none relative"
        >
          <motion.div
            className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#FF6B9D] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,212,255,0.6)]"
            whileHover={{
              scale: [1, 1.14, 1.06],
              boxShadow: [
                '0 0 15px rgba(0,212,255,0.6)',
                '0 0 30px rgba(0,212,255,0.95), 0 0 45px rgba(255,107,157,0.7)',
                '0 0 22px rgba(0,212,255,0.85), 0 0 35px rgba(255,107,157,0.5)',
              ],
              transition: { duration: 0.45, ease: 'easeOut' },
            }}
          >
            <div className="w-full h-full bg-[#0C0C0C] rounded-[6px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00D4FF] group-hover:text-white transition-colors duration-200 group-hover:filter group-hover:drop-shadow-[0_0_8px_#00D4FF]" />
            </div>
          </motion.div>
          <span
            className="font-black text-[32px] tracking-tight text-[#00D4FF] transition-all duration-300 group-hover:text-white"
            style={{
              textShadow: '0 0 20px #00D4FF, 0 0 35px rgba(0, 212, 255, 0.4)',
              fontWeight: 900,
            }}
          >
            MarkeTop
          </span>
          <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 ml-1 group-hover:border-[#FF6B9D]/60 group-hover:text-[#FF6B9D] transition-colors duration-300">
            Data Pulse
          </span>
        </motion.a>

        {/* Desktop Nav menu: Links gently lift and glow softly with brand color warmth */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <motion.a
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                whileHover={{
                  y: -2.5,
                  transition: { type: 'spring', stiffness: 450, damping: 17 },
                }}
                whileTap={{ y: 0 }}
                className={`font-medium text-[16px] transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#00D4FF] [text-shadow:0_0_14px_rgba(0,212,255,0.9),0_0_24px_rgba(255,107,157,0.4)]'
                    : 'text-[#B0B0B0] hover:text-[#00D4FF]'
                } nav-link-glow`}
                style={{ fontWeight: 500 }}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D] shadow-[0_0_12px_#00D4FF,0_0_20px_rgba(255,107,157,0.6)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}

          {/* Quick Header CTA with responsive tactile press down & bounce back */}
          <motion.button
            id="header-cta-button"
            onClick={onOpenAudit}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: '0 10px 25px rgba(0,212,255,0.5), 0 0 20px rgba(255,107,157,0.4)',
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{
              scale: 0.94,
              y: 1,
              boxShadow: '0 2px 8px rgba(0,212,255,0.3)',
              transition: { type: 'spring', stiffness: 700, damping: 20 },
            }}
            className="ml-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D] shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Live Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle-btn"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-11 h-11 rounded-xl bg-[#2D2D2D]/80 border border-[#00D4FF]/30 text-white flex items-center justify-center hover:border-[#00D4FF] hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-300 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-[#00D4FF]" />
          ) : (
            <Menu className="w-6 h-6 text-[#00D4FF]" />
          )}
        </button>
      </div>

      {/* Mobile Slide-Out Neon Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-slideout-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden mt-4 pt-4 border-t border-[#00D4FF]/20 bg-[#1A1A1A]/95 rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(0,212,255,0.2)]"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  id={`mobile-nav-link-${item.label.toLowerCase()}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-medium text-[18px] text-[#B0B0B0] hover:text-[#00D4FF] hover:translate-x-2 py-2 px-3 rounded-lg hover:bg-[#00D4FF]/10 transition-all duration-200 flex items-center justify-between border-l-2 border-transparent hover:border-[#00D4FF]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#00D4FF] opacity-70" />
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  id="mobile-audit-action-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAudit();
                  }}
                  className="w-full py-3.5 px-6 rounded-full text-center font-bold text-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D] shadow-[0_0_20px_rgba(0,212,255,0.6)] active:scale-98 transition-all"
                >
                  Launch Free Audit
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-[#B0B0B0]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>Real-time Pulse Architecture</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continuous Cinematic Camera Progress Tracking Beam */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] via-[#FF6B9D] to-[#00D4FF] shadow-[0_0_12px_#00D4FF] pointer-events-none"
      />
    </header>
  );
};
