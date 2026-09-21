import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#0A0A0A] border-t border-[#00D4FF]/20 pt-16 pb-12 px-6 sm:px-8 lg:px-12 text-[#B0B0B0]"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Top subtle neon accent glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent shadow-[0_0_15px_#00D4FF]" />

      <div className="max-w-7xl mx-auto">
        {/* Top row flex (space-between) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-12 border-b border-white/5">
          {/* LEFT: Contact block (#B0B0B0 14PX) "hello@marketop.com" | "+1 (666) 123-4567" | "NYC, USA" */}
          <div
            id="footer-contact-block"
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left text-[#B0B0B0]"
            style={{ fontSize: '14px', color: '#B0B0B0' }}
          >
            <a
              id="footer-email-link"
              href="mailto:hello@marketop.com"
              className="flex items-center gap-2 hover:text-[#00D4FF] transition-colors duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center border border-white/10 group-hover:border-[#00D4FF]/50">
                <Mail className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <span className="font-medium">hello@marketop.com</span>
            </a>

            <span className="hidden sm:inline-block text-[#333] select-none">|</span>

            <a
              id="footer-phone-link"
              href="tel:+16661234567"
              className="flex items-center gap-2 hover:text-[#00D4FF] transition-colors duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center border border-white/10 group-hover:border-[#00D4FF]/50">
                <Phone className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <span className="font-medium">+1 (666) 123-4567</span>
            </a>

            <span className="hidden sm:inline-block text-[#333] select-none">|</span>

            <div
              id="footer-location-block"
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center border border-white/10">
                <MapPin className="w-4 h-4 text-[#FF6B9D]" />
              </div>
              <span className="font-medium">NYC, USA</span>
            </div>
          </div>

          {/* RIGHT: Social icons (Facebook/Linkedin/X) 24px white -> #00D4FF hover + spin */}
          <div
            id="footer-social-icons"
            className="flex items-center gap-4"
          >
            {/* Facebook */}
            <a
              id="social-link-facebook"
              href="https://facebook.com/marketop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:text-[#00D4FF] border border-white/10 hover:border-[#00D4FF]/40 social-spin"
            >
              {/* Facebook Icon 24px */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              id="social-link-linkedin"
              href="https://linkedin.com/company/marketop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:text-[#00D4FF] border border-white/10 hover:border-[#00D4FF]/40 social-spin"
            >
              {/* LinkedIn Icon 24px */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              id="social-link-x"
              href="https://x.com/marketop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:text-[#00D4FF] border border-white/10 hover:border-[#00D4FF]/40 social-spin"
            >
              {/* X Icon 24px */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom: "2025 MarkeTop. Built for speed." (center 12px #666) */}
        <div className="pt-8 text-center">
          <p
            id="footer-bottom-text"
            className="text-[12px] font-mono tracking-wide"
            style={{ fontSize: '12px', color: '#666666' }}
          >
            2025 MarkeTop. Built for speed.
          </p>
        </div>
      </div>
    </footer>
  );
};
