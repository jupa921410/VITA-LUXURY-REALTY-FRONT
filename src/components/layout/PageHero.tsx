import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

interface PageHeroProps {
  eyebrow: string;
  titlePrefix?: string;
  rotatingWords: string[];
  titleSuffix?: string;
  description: string;
  backgroundImage: string;
  badgeText?: string;
  statCard?: StatCardProps;
  ctaText?: string;
  ctaLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

export default function PageHero({
  eyebrow,
  titlePrefix = '',
  rotatingWords,
  titleSuffix = '',
  description,
  backgroundImage,
  badgeText = 'VITA PRIVATE PORTFOLIO',
  statCard,
  ctaText,
  ctaLink = '/contact',
  ctaSecondaryText,
  ctaSecondaryLink = '/properties',
}: PageHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Rotating text timer
  useEffect(() => {
    if (!rotatingWords || rotatingWords.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingWords]);

  // Framer Motion Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const opacityContent = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const yStatCard = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);

  // Mouse tilt / glow coordinates
  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty('--mouse-x', `${x}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#040B16] pt-24 pb-16 selection:bg-[#D4AF37] selection:text-[#040B16]"
      style={{
        // default mouse coords
        ['--mouse-x' as string]: '50%',
        ['--mouse-y' as string]: '40%',
      }}
    >
      {/* Scroll-Reacting Parallax Background Image with Dark Blue Tint */}
      <motion.div
        style={{ y: yBackground, scale: scaleBackground }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <img
          src={backgroundImage}
          alt={eyebrow}
          className="w-full h-full object-cover filter brightness-[0.42] contrast-[1.12] saturate-[0.9]"
        />
      </motion.div>

      {/* Deep Navy & Royal Blue Gradient Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#040B16] via-[#040B16]/70 to-[#040B16]/80 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#040B16]/90 via-[#071936]/60 to-[#040B16]/90 pointer-events-none" />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-60 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle 500px at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.12), transparent 80%)',
        }}
      />

      {/* Ambient Blue Sapphire Orb */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#154687]/25 blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none z-1" />

      {/* Hero Content Container (Reacts to Scroll) */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-12 pt-8 flex flex-col items-center text-center"
      >
        {/* Eyebrow / Category Tag with Gold Border */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#071936]/70 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <Sparkles size={13} className="text-[#D4AF37]" />
          <span className="text-[10px] font-bold tracking-[0.26em] text-[#fff1b8] uppercase">
            {eyebrow}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[9px] tracking-[0.2em] text-white/60 uppercase hidden sm:inline">
            {badgeText}
          </span>
        </motion.div>

        {/* Monumental Headline with Changing Animated Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-[1.05] max-w-5xl"
        >
          {titlePrefix && <span className="block">{titlePrefix} </span>}
          <span className="relative inline-block overflow-hidden py-1 min-h-[1.15em] align-top">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[currentWordIndex]}
                initial={{ y: 45, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -45, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic text-gold-gradient drop-shadow-[0_4px_25px_rgba(212,175,55,0.3)] font-normal px-2"
              >
                {rotatingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          {titleSuffix && <span className="block mt-1">{titleSuffix}</span>}
        </motion.h1>

        {/* Refined Gold Rule */}
        <div className="w-32 my-6 gold-rule" />

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="text-white/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        {(ctaText || ctaSecondaryText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {ctaText && (
              <Link to={ctaLink} className="luxury-btn-primary">
                <span>{ctaText}</span>
                <ArrowRight size={14} />
              </Link>
            )}
            {ctaSecondaryText && (
              <Link to={ctaSecondaryLink} className="luxury-btn-outline">
                <span>{ctaSecondaryText}</span>
              </Link>
            )}
          </motion.div>
        )}

        {/* Optional Floating Stat Card with Parallax */}
        {statCard && (
          <motion.div
            style={{ y: yStatCard }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 inline-flex items-center gap-6 px-7 py-4 rounded-sm floating-glass-stat border border-[#D4AF37]/45"
          >
            <div className="text-left">
              <span className="block text-[10px] font-bold tracking-[0.24em] text-[#D4AF37] uppercase">
                {statCard.label}
              </span>
              <strong className="display text-2xl lg:text-3xl font-normal text-white">
                {statCard.value}
              </strong>
            </div>
            {statCard.sub && (
              <div className="border-l border-white/20 pl-6 text-left hidden sm:block">
                <span className="text-xs text-white/60 tracking-wider">
                  {statCard.sub}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Animated Scroll Mouse Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-80">
        <span className="text-[9px] font-bold tracking-[0.28em] text-[#D4AF37] uppercase">
          EXPLORE
        </span>
        <div className="scroll-mouse">
          <div className="scroll-mouse-wheel" />
        </div>
        <ChevronDown size={14} className="text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  );
}
