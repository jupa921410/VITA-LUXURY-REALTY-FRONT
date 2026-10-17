import { useId } from 'react';

interface GoldOrnamentProps {
  className?: string;
  variant?: 'frond' | 'sprig';
}

/**
 * A hand-drawn, transparent-background gold botanical accent — a slender
 * palm frond (nodding to Florida) or a simple laurel sprig. Meant to be
 * absolutely positioned so it overlaps a card, portrait or heading edge,
 * per the "overlapping cutout images" brief. Pure inline SVG, so there is
 * no background to remove and it always renders crisply at any size.
 */
export default function GoldOrnament({ className = '', variant = 'frond' }: GoldOrnamentProps) {
  const id = useId().replace(/[:]/g, '');

  if (variant === 'sprig') {
    return (
      <svg viewBox="0 0 90 150" className={`gold-ornament ${className}`} aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0DDA6" />
            <stop offset="50%" stopColor="#B8892F" />
            <stop offset="100%" stopColor="#6b4d13" />
          </linearGradient>
        </defs>
        <path d="M45 146 C 42 110 42 70 45 20" stroke={`url(#${id})`} strokeWidth="1.4" fill="none" opacity="0.85" />
        {[24, 46, 68, 90, 112].map((y, i) => (
          <g key={y} opacity={0.9 - i * 0.06}>
            <path
              d={`M45 ${y} C 30 ${y - 6} 16 ${y - 2} 8 ${y + 6} C 20 ${y + 10} 34 ${y + 8} 45 ${y}`}
              fill={`url(#${id})`}
            />
            <path
              d={`M45 ${y} C 60 ${y - 6} 74 ${y - 2} 82 ${y + 6} C 70 ${y + 10} 56 ${y + 8} 45 ${y}`}
              fill={`url(#${id})`}
            />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 200" className={`gold-ornament ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0DDA6" />
          <stop offset="45%" stopColor="#B8892F" />
          <stop offset="100%" stopColor="#6b4d13" />
        </linearGradient>
      </defs>
      <path d="M60 196 C 56 150 56 100 60 8" stroke={`url(#${id})`} strokeWidth="1.6" fill="none" opacity="0.9" />
      {[28, 54, 80, 106, 132, 156].map((y, i) => (
        <path
          key={y}
          d={`M60 ${y} C 30 ${y - 20 + i} 6 ${y - 4} 2 ${y + 14} C 24 ${y + 16} 46 ${y + 6} 60 ${y}`}
          fill={`url(#${id})`}
          opacity={0.92 - i * 0.07}
          transform={i % 2 === 1 ? `scale(-1,1) translate(${-120},0)` : undefined}
        />
      ))}
    </svg>
  );
}
