import React, { useRef } from 'react';
import { useInView } from 'motion/react';

export interface RollingNumberProps {
  /** The number or string to display (e.g. 500, "500+", "+248.6%", "1,842", "3.4x Avg") */
  value: string | number;
  /** Explicit prefix override (e.g. "+", "$", "#") */
  prefix?: string;
  /** Explicit suffix override (e.g. "%", "+", "x", " ms") */
  suffix?: string;
  /** Additional CSS class names for styling */
  className?: string;
  /** Base duration of the roll in seconds (default: 1.1) */
  duration?: number;
  /** Stagger delay between digits in seconds (default: 0.055) */
  stagger?: number;
  /** Base delay before the roll begins in seconds (default: 0) */
  delay?: number;
  /** Whether to animate only once (default: false, so it rolls every time it scrolls into view) */
  once?: boolean;
}

// 3 full cycles of digits 0-9 to allow multi-revolution rolling spins
const DIGIT_CYCLE = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];
const TOTAL_ITEMS = DIGIT_CYCLE.length; // 30

interface SingleRollingDigitProps {
  digit: number;
  index: number;
  isInView: boolean;
  baseDuration: number;
  stagger: number;
  baseDelay: number;
}

const SingleRollingDigit: React.FC<SingleRollingDigitProps> = ({
  digit,
  index,
  isInView,
  baseDuration,
  stagger,
  baseDelay,
}) => {
  // Target index in the 30-item array:
  // Starts after 1 full cycle (10 items), plus optional offset for later digits so they spin a bit more
  const cycleOffset = 10;
  const targetIndex = cycleOffset + digit;
  const translateYPercent = (targetIndex / TOTAL_ITEMS) * 100;

  // Staggered timing per digit column
  const digitDuration = baseDuration + index * 0.08;
  const digitDelay = baseDelay + index * stagger;

  return (
    <span
      className="relative inline-block tabular-nums select-none overflow-hidden"
      style={{ verticalAlign: 'baseline' }}
      aria-hidden="true"
    >
      {/* 
        Ghost digit: preserves exact typographic baseline, font width, 
        and height in natural DOM flow without any layout shifting.
      */}
      <span className="invisible select-none opacity-0 pointer-events-none block leading-none">
        {digit}
      </span>

      {/* Absolutely positioned rolling reel strip */}
      <span className="absolute inset-0 overflow-hidden pointer-events-none">
        <span
          className="flex flex-col w-full will-change-transform"
          style={{
            height: `${TOTAL_ITEMS * 100}%`,
            transform: isInView
              ? `translateY(-${translateYPercent}%)`
              : 'translateY(0%)',
            transitionProperty: 'transform',
            transitionDuration: isInView ? `${digitDuration}s` : '0s',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: isInView ? `${digitDelay}s` : '0s',
          }}
        >
          {DIGIT_CYCLE.map((num, i) => (
            <span
              key={i}
              style={{ height: `${100 / TOTAL_ITEMS}%` }}
              className="w-full flex items-center justify-center shrink-0 leading-none select-none"
            >
              {num}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};

export const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  prefix: explicitPrefix,
  suffix: explicitSuffix,
  className = '',
  duration = 1.1,
  stagger = 0.055,
  delay = 0,
  once = false,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, {
    amount: 0.25,
    once,
  });

  const rawString = String(value).trim();

  // If explicit prefix/suffix not provided, parse intelligently from string
  let parsedPrefix = explicitPrefix !== undefined ? explicitPrefix : '';
  let parsedSuffix = explicitSuffix !== undefined ? explicitSuffix : '';
  let coreNumberString = rawString;

  if (explicitPrefix === undefined && explicitSuffix === undefined) {
    // Match leading non-digit characters (e.g., "+", "-", "$", "#", ">", etc.)
    const prefixMatch = rawString.match(/^([^0-9.]+)/);
    // Match trailing non-digit characters (e.g., "%", "+", "x", " ms", "x Avg", etc.)
    const suffixMatch = rawString.match(/([^0-9.]+)$/);

    if (prefixMatch) {
      parsedPrefix = prefixMatch[1];
    }
    if (suffixMatch) {
      parsedSuffix = suffixMatch[1];
    }

    coreNumberString = rawString.slice(
      parsedPrefix.length,
      rawString.length - parsedSuffix.length
    );
  } else {
    if (explicitPrefix) {
      if (coreNumberString.startsWith(explicitPrefix)) {
        coreNumberString = coreNumberString.slice(explicitPrefix.length);
      }
    }
    if (explicitSuffix) {
      if (coreNumberString.endsWith(explicitSuffix)) {
        coreNumberString = coreNumberString.slice(0, -explicitSuffix.length);
      }
    }
  }

  // Parse characters into digits and separators
  const characters = coreNumberString.split('');
  let digitCounter = 0;

  return (
    <span
      ref={containerRef}
      role="text"
      aria-label={rawString}
      className={`inline-flex items-baseline font-inherit tabular-nums ${className}`}
    >
      {/* Prefix */}
      {parsedPrefix && (
        <span className="select-none leading-none mr-[0.04em] shrink-0">
          {parsedPrefix}
        </span>
      )}

      {/* Rolling digits & stationary punctuation (, . / -) */}
      <span className="inline-flex items-baseline shrink-0">
        {characters.map((char, charIdx) => {
          const isDigit = /^[0-9]$/.test(char);

          if (isDigit) {
            const digitNum = parseInt(char, 10);
            const currentDigitIdx = digitCounter++;
            return (
              <SingleRollingDigit
                key={`digit-${charIdx}`}
                digit={digitNum}
                index={currentDigitIdx}
                isInView={isInView}
                baseDuration={duration}
                stagger={stagger}
                baseDelay={delay}
              />
            );
          }

          // Stationary separator (comma, decimal point, slash, colon)
          return (
            <span
              key={`sep-${charIdx}`}
              className="select-none leading-none mx-[0.02em] shrink-0"
              aria-hidden="true"
            >
              {char}
            </span>
          );
        })}
      </span>

      {/* Suffix */}
      {parsedSuffix && (
        <span className="select-none leading-none ml-[0.04em] shrink-0">
          {parsedSuffix}
        </span>
      )}
    </span>
  );
};
