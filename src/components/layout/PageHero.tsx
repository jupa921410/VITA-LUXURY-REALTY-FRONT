import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import GoldOrnament from './GoldOrnament';

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
  coordinates?: string;
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
  coordinates = 'PRIVATE REAL ESTATE, ELEVATED',
}: PageHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Rotating text timer
  useEffect(() => {
    if (!rotatingWords || rotatingWords.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [rotatingWords]);

  // Framer Motion Scroll Parallax & Scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacityContent = useTransform(scrollYProgress, [0, 0.75], [1, 0.08]);
  const yStatCard = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);

  // Pointer spotlight glow coordinates
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
      className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#060912] pt-28 pb-20 selection:bg-[#B8892F] selection:text-[#060912]"
      style={{
        ['--mouse-x' as string]: '50%',
        ['--mouse-y' as string]: '40%',
      }}
    >
      {/* 1. LAYER: Parallax Ken-Burns Background Image */}
      <motion.div
        style={{ y: yBackground, scale: scaleBackground }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <img
          src={backgroundImage}
          alt={eyebrow}
          loading="eager"
          className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.18] saturate-[0.9]"
        />
      </motion.div>

      {/* 2. LAYER: Cinematic Overlays & Architectural Grid */}
      <div className="absolute inset-0 z-1 cinematic-vignette pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#060912]/70 via-[#0A1226]/48 to-[#060912]/60 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#060912]/62 via-[#0E1C38]/36 to-[#060912]/62 pointer-events-none" />
      <div className="absolute inset-0 z-1 arch-grid-bg opacity-40 pointer-events-none" />

      {/* 3. LAYER: Ambient Lighting Orbs & Dynamic Cursor Spotlight */}
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-50 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(184, 137, 47, 0.14), transparent 75%)',
        }}
      />
      <div className="absolute top-1/4 -left-28 w-[550px] h-[550px] rounded-full bg-[#12356A]/45 blur-[150px] pointer-events-none z-1" />
      <div className="absolute bottom-12 -right-28 w-[550px] h-[550px] rounded-full bg-[#B8892F]/12 blur-[160px] pointer-events-none z-1" />

      {/* 4. LAYER: Vertical editorial coordinate tag, left edge */}
      <div className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 pointer-events-none">
        <span className="w-px h-16 bg-gradient-to-b from-transparent to-[#B8892F]/50" />
        <span
          className="font-accent text-[9px] tracking-[0.35em] text-[#B8892F]/70 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          {coordinates}
        </span>
        <Compass size={13} className="text-[#B8892F]/60" />
        <span className="w-px h-16 bg-gradient-to-t from-transparent to-[#B8892F]/50" />
      </div>

      {/* 5. LAYER: Central Monumental Content Container */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-12 pt-10 flex flex-col items-center text-center"
      >
        {/* Eyebrow Pill with Gold Sheen */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="gold-badge mb-7 bg-[#0A1226]/80 shadow-[0_0_30px_rgba(184,137,47,0.18)]"
        >
          <Sparkles size={13} className="text-[#B8892F]" />
          <span>{eyebrow}</span>
          <span className="w-1 h-1 bg-[#B8892F] rotate-45" />
          <span className="text-white/55 hidden sm:inline">{badgeText}</span>
        </motion.div>

        {/* Monumental Headline with Precision Serif / Italic Calligraphy */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] tracking-tight text-white font-normal leading-[1.03] max-w-6xl"
        >
          {titlePrefix && (
            <span className="block text-white/95 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-1 sm:mb-2">
              {titlePrefix}
            </span>
          )}
          <span className="relative inline-block overflow-hidden py-1 min-h-[1.2em] align-top">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[currentWordIndex]}
                initial={{ y: 55, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -55, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-gold-gradient font-script text-[1.35em] px-2"
              >
                {rotatingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          {titleSuffix && (
            <span className="block text-white/95 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light mt-1 sm:mt-2">
              {titleSuffix}
            </span>
          )}
        </motion.h1>

        {/* Refined Gold Rule Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-36 my-6 sm:my-7 gold-rule"
        />

        {/* Architectural Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {description}
        </motion.p>

        {/* CTA Button Group with Magnetic Feel */}
        {(ctaText || ctaSecondaryText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {ctaText && (
              <Link to={ctaLink} className="luxury-btn-primary group">
                <span>{ctaText}</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
            {ctaSecondaryText && (
              <Link to={ctaSecondaryLink} className="luxury-btn-outline group">
                <span>{ctaSecondaryText}</span>
              </Link>
            )}
          </motion.div>
        )}

        {/* Floating Stat / Asset Valuation Pill */}
        {statCard && (
          <motion.div
            style={{ y: yStatCard }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="mt-12 inline-flex items-center gap-6 px-8 py-4 floating-glass-stat border border-[#B8892F]/50 relative group"
          >
            {/* Precision Gold Corner Marks */}
            <span className="corner-bracket corner-tl" />
            <span className="corner-bracket corner-tr" />
            <span className="corner-bracket corner-bl" />
            <span className="corner-bracket corner-br" />

            {/* Overlapping gold sprig — transparent SVG cutout */}
            <GoldOrnament
              variant="sprig"
              className="hidden md:block absolute -top-14 -right-8 w-10 h-16 -rotate-[18deg] z-20"
            />

            <div className="text-left">
              <span className="font-accent flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.22em] text-[#B8892F] uppercase">
                <ShieldCheck size={12} />
                {statCard.label}
              </span>
              <strong className="display italic text-2xl lg:text-3xl font-normal text-white drop-shadow-md">
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

      {/* 6. LAYER: Minimalist Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-80">
        <span className="font-accent text-[9px] font-semibold tracking-[0.28em] text-[#B8892F] uppercase">
          Explore
        </span>
        <div className="scroll-mouse">
          <div className="scroll-mouse-wheel" />
        </div>
        <ChevronDown size={14} className="text-[#B8892F] animate-bounce" />
      </div>
    </section>
  );
}
