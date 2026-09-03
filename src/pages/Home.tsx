import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MoveUpRight, Search, ShieldCheck, Sparkles, Star, Award, Compass, KeyRound, Building2, Users } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '@/assets/hero.jpg';
import brokerImg from '@/assets/broker.jpg';
import teamImg from '@/assets/team.jpg';

const rotatingHeroTitles = [
  'LIVE THE VITA',
  'ARCHITECTURAL MASTERPIECES',
  'FLORIDA’S FINEST ESTATES',
  'UNRIVALED DISTINCTION',
];

const featuredProperties = [
  {
    id: 'residence-1',
    city: 'Miami Beach',
    neighborhood: 'Star Island',
    name: 'Villa Sole di Mare',
    price: '$18,950,000',
    detail: '6 Beds · 7.5 Baths · 8,450 SQ FT',
    tag: 'WATERFRONT TROPHY',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'residence-2',
    city: 'Palm Beach',
    neighborhood: 'Ocean Boulevard',
    name: 'The Breakers Haven',
    price: '$24,500,000',
    detail: '7 Beds · 9 Baths · 11,200 SQ FT',
    tag: 'PRIVATE COMPOUND',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'residence-3',
    city: 'Brickell',
    neighborhood: 'Biscayne Bay',
    name: 'Aura Crown Penthouse',
    price: '$14,200,000',
    detail: '4 Beds · 5.5 Baths · 6,100 SQ FT',
    tag: 'SKYLINE SANCTUARY',
    img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85',
  },
];

const destinations = [
  {
    name: 'Miami Beach',
    count: '18 Exclusive Residences',
    img: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1100&q=80',
    tag: 'Coastal Luxury',
  },
  {
    name: 'Palm Beach',
    count: '12 Historic Estates',
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1100&q=80',
    tag: 'Old World Grandeur',
  },
  {
    name: 'Brickell & Coral Gables',
    count: '24 Modern Penthouses',
    img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1100&q=80',
    tag: 'Metropolitan Elegance',
  },
  {
    name: 'Naples & Gulf Coast',
    count: '15 Waterfront Mansions',
    img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1100&q=80',
    tag: 'Island Serenity',
  },
];

const revealMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Search form states
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchType, setSearchType] = useState('All');
  const [searchPrice, setSearchPrice] = useState('All');

  // Rotating title interval
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingHeroTitles.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  // Parallax Scroll for Home Hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yHeroBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scaleHeroBg = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const yHeroText = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const yFloatingCard1 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const yFloatingCard2 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  // Pointer move glow effect
  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty('--cursor-x', `${x}%`);
    heroRef.current.style.setProperty('--cursor-y', `${y}%`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation !== 'All') params.set('location', searchLocation);
    if (searchType !== 'All') params.set('type', searchType);
    if (searchPrice !== 'All') params.set('price', searchPrice);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <main className="bg-[#01040A] text-[#F8FAFC] overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC MONUMENTAL HERO WITH BROKER PORTRAIT & DEEPER NAVY GRADIENTS */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        onPointerMove={handlePointerMove}
        className="relative min-h-[96vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#01040A] via-[#040D1B] to-[#01040A] pt-28 pb-20 selection:bg-[#D4AF37] selection:text-[#01040A]"
        style={{
          ['--cursor-x' as string]: '50%',
          ['--cursor-y' as string]: '40%',
        }}
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: yHeroBg, scale: scaleHeroBg }}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
        >
          <img
            src={heroImg}
            alt="VITA Luxury Estate Florida"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.18] saturate-[0.8]"
          />
        </motion.div>

        {/* Deep Dark Navy & Gold Depth Overlays */}
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#01040A] via-[#020712]/80 to-[#01040A]/95 pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#01040A] via-[#051428]/60 to-[#01040A]/95 pointer-events-none" />

        {/* Radial Cursor Light Tracker */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-50 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle 650px at var(--cursor-x) var(--cursor-y), rgba(212, 175, 55, 0.12), transparent 75%)',
          }}
        />

        {/* Ambient Dark Navy Glow Lights */}
        <div className="absolute top-1/4 -left-28 w-[600px] h-[600px] rounded-full bg-[#081F3E]/40 blur-[150px] pointer-events-none z-1" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-[#0B254A]/35 blur-[160px] pointer-events-none z-1" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[140px] pointer-events-none z-1" />

        {/* Hero Content Grid (Left: Proposition, Right: Broker Portrait) */}
        <motion.div
          style={{ y: yHeroText, opacity: opacityHero }}
          className="relative z-10 max-w-[1480px] w-full mx-auto px-6 lg:px-12 py-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Brand Message, Rotating Title & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/45 bg-[#030A17]/85 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(212,175,55,0.15)]"
              >
                <Sparkles size={14} className="text-[#D4AF37]" />
                <span className="text-[10px] font-bold tracking-[0.28em] text-[#fff1b8] uppercase">
                  FLORIDA PRIVATE ADVISORY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[9px] tracking-[0.22em] text-white/70 uppercase">
                  ESTABLISHED 2011
                </span>
              </motion.div>

              {/* Changing Animated Hero Title */}
              <h1 className="display text-4xl sm:text-6xl md:text-7xl lg:text-[4.4rem] xl:text-[5.4rem] font-normal text-white tracking-tight leading-[1.03] max-w-4xl">
                <span className="block text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 font-light">
                  DISCOVER &amp;
                </span>
                <span className="relative inline-block overflow-hidden py-1 min-h-[1.25em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingHeroTitles[wordIndex]}
                      initial={{ y: 55, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -55, opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-gold-gradient font-normal italic drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] pr-2"
                    >
                      {rotatingHeroTitles[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Gold Divider Rule */}
              <div className="w-32 my-6 gold-rule" />

              {/* Subtitle */}
              <p className="text-white/80 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-7">
                Representing Florida’s most extraordinary private residences, architectural icons, and off-market sanctuaries with unyielding discretion.
              </p>

              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 mb-8 border-y border-[#D4AF37]/20 w-full max-w-xl">
                <div>
                  <strong className="display text-2xl sm:text-3xl text-[#fff1b8] font-normal block">$2.4B+</strong>
                  <span className="text-[10px] tracking-wider text-white/60 uppercase block mt-0.5">Transacted Volume</span>
                </div>
                <div>
                  <strong className="display text-2xl sm:text-3xl text-[#fff1b8] font-normal block">99.4%</strong>
                  <span className="text-[10px] tracking-wider text-white/60 uppercase block mt-0.5">Client Retention</span>
                </div>
                <div>
                  <strong className="display text-2xl sm:text-3xl text-[#fff1b8] font-normal block">Top 0.1%</strong>
                  <span className="text-[10px] tracking-wider text-white/60 uppercase block mt-0.5">Florida Advisory</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/properties" className="luxury-btn-primary">
                  <span>EXPLORE THE COLLECTION</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="luxury-btn-outline">
                  <span>CONFIDENTIAL CONSULTATION</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Broker Portrait Card with Gold & Dark Navy Accents */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[430px] lg:max-w-[460px] group"
              >
                {/* Ambient Halo Glow */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#D4AF37]/20 via-[#0A264F]/50 to-[#D4AF37]/15 rounded-sm blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Frame Container */}
                <div className="relative rounded-sm overflow-hidden border border-[#D4AF37]/50 bg-gradient-to-b from-[#06152B] via-[#030B17] to-[#01040A] shadow-[0_30px_90px_rgba(0,0,0,0.92)] transition-transform duration-700 group-hover:-translate-y-1.5">
                  {/* Gold Corner Accents */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-20" />
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-20" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/60 bg-[#020712]/85 backdrop-blur-md shadow-lg">
                    <ShieldCheck size={13} className="text-[#D4AF37]" />
                    <span className="text-[9px] font-bold tracking-[0.24em] text-[#fff1b8] uppercase">
                      MANAGING BROKER &amp; FOUNDER
                    </span>
                  </div>

                  {/* High Fashion Portrait Photo */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden">
                    <img
                      src={brokerImg}
                      alt="Elena Rostova - Managing Broker & Founder of VITA Luxury Realty"
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.05] brightness-[0.97]"
                    />
                    {/* Seamless Dark Navy Gradient Blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01040A] via-[#020712]/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#01040A]/35 via-transparent to-[#01040A]/30 pointer-events-none" />
                  </div>

                  {/* Broker Credentials & Direct Action Bar */}
                  <div className="relative z-20 p-5 sm:p-6 bg-gradient-to-b from-[#051326]/95 via-[#020712]/98 to-[#01040A] border-t border-[#D4AF37]/35">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="eyebrow block mb-1">PRINCIPAL ADVISOR</span>
                        <h3 className="display text-2xl sm:text-3xl text-white font-normal group-hover:text-[#fff1b8] transition-colors">
                          Elena Rostova
                        </h3>
                        <p className="text-xs text-[#D4AF37] font-medium tracking-wider mt-0.5">
                          Licensed Real Estate Broker · Managing Partner
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#020712] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                        <Award size={18} />
                      </div>
                    </div>

                    <p className="text-[12px] text-white/70 font-light leading-relaxed mt-3 pt-3 border-t border-white/10">
                      Confidential advisory for Star Island, Palm Beach, and Miami Beach trophy waterfront estates.
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-[#D4AF37] uppercase hover:text-white transition-colors"
                      >
                        <span>DIRECT CONSULTATION</span>
                        <ArrowRight size={13} />
                      </Link>
                      <span className="text-[11px] text-white/50 tracking-wider">
                        +1 (305) 555-8482
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Floating Metric Pill Bottom Left */}
                <motion.div
                  style={{ y: yFloatingCard1 }}
                  className="hidden sm:flex absolute -bottom-5 -left-5 z-30 floating-glass-stat p-4 rounded-sm border border-[#D4AF37]/60 max-w-[210px] flex-col gap-1 shadow-2xl"
                >
                  <div className="flex items-center gap-1.5 text-[#D4AF37] text-[9px] font-bold tracking-widest uppercase">
                    <Star size={11} fill="currentColor" />
                    <span>TOP 0.1% PRODUCER</span>
                  </div>
                  <strong className="display text-xl text-white font-normal">$780M+</strong>
                  <span className="text-[10px] text-white/60">Career Transacted Volume</span>
                </motion.div>

                {/* Overlapping Floating Badge Top Right */}
                <motion.div
                  style={{ y: yFloatingCard2 }}
                  className="hidden xl:flex absolute -top-4 -right-4 z-30 floating-glass-stat px-3.5 py-2 rounded-sm border border-[#D4AF37]/60 items-center gap-2 shadow-2xl"
                >
                  <Award size={14} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-bold tracking-widest text-[#fff1b8] uppercase">
                    FLORIDA TROPHY PORTFOLIO
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Mouse Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-80">
          <span className="text-[9px] font-bold tracking-[0.28em] text-[#D4AF37] uppercase">
            SCROLL TO DISCOVER
          </span>
          <div className="scroll-mouse">
            <div className="scroll-mouse-wheel" />
          </div>
          <ChevronDown size={14} className="text-[#D4AF37] animate-bounce" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REFINED SEARCH CONSOLE (DEEP NAVY & GOLD GLASS) */}
      {/* ========================================================================= */}
      <section className="relative z-20 max-w-[1360px] mx-auto px-6 -mt-10 lg:-mt-14">
        <form
          onSubmit={handleSearchSubmit}
          className="gold-glass-card p-6 lg:p-8 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
        >
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#D4AF37]/25">
            <div>
              <span className="eyebrow">FIND YOUR SANCTUARY</span>
              <h3 className="display text-xl lg:text-2xl text-white font-normal mt-0.5">
                Search the Florida Collection
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs text-[#D4AF37]">
              <Compass size={16} />
              <span className="tracking-widest uppercase text-[10px]">Private Off-Market Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-end">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                Location
              </label>
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="luxury-input cursor-pointer"
              >
                <option value="All" className="bg-[#07172e] text-white">All Florida Destinations</option>
                <option value="Miami Beach" className="bg-[#07172e] text-white">Miami Beach</option>
                <option value="Palm Beach" className="bg-[#07172e] text-white">Palm Beach</option>
                <option value="Brickell" className="bg-[#07172e] text-white">Brickell & Downtown</option>
                <option value="Coral Gables" className="bg-[#07172e] text-white">Coral Gables</option>
                <option value="Naples" className="bg-[#07172e] text-white">Naples & Gulf Coast</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                Property Architecture
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="luxury-input cursor-pointer"
              >
                <option value="All" className="bg-[#07172e] text-white">Any Architectural Style</option>
                <option value="Waterfront Estate" className="bg-[#07172e] text-white">Waterfront Estate</option>
                <option value="Skyline Penthouse" className="bg-[#07172e] text-white">Skyline Penthouse</option>
                <option value="Modern Villa" className="bg-[#07172e] text-white">Modern Architectural Villa</option>
                <option value="Historic Compound" className="bg-[#07172e] text-white">Historic Compound</option>
              </select>
            </div>

            {/* Price Bracket */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                Acquisition Bracket
              </label>
              <select
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                className="luxury-input cursor-pointer"
              >
                <option value="All" className="bg-[#07172e] text-white">Any Valuation</option>
                <option value="5M+" className="bg-[#07172e] text-white">$5,000,000+</option>
                <option value="10M+" className="bg-[#07172e] text-white">$10,000,000+</option>
                <option value="20M+" className="bg-[#07172e] text-white">$20,000,000+</option>
                <option value="50M+" className="bg-[#07172e] text-white">$50,000,000+ (Trophy)</option>
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button type="submit" className="luxury-btn-primary w-full !py-3">
                <Search size={15} />
                <span>SEARCH COLLECTION</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED CURATED COLLECTION */}
      {/* ========================================================================= */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div {...revealMotion}>
              <span className="eyebrow">CURATED RESIDENCES</span>
              <h2 className="display">
                Addresses with <i>Presence.</i>
              </h2>
            </motion.div>
            <motion.p {...revealMotion} className="text-white/65 text-sm max-w-md font-light leading-relaxed">
              Every residence in the VITA collection is curated for architectural provenance, rare vistas, and unrivaled lifestyle stature.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((prop, idx) => (
              <motion.article
                key={prop.id}
                {...revealMotion}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group gold-glass-card rounded-sm overflow-hidden flex flex-col"
              >
                {/* Property Image Container with Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#06162d]">
                  <img
                    src={prop.img}
                    alt={prop.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.88] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-transparent to-transparent opacity-85" />
                  <span className="absolute top-4 left-4 gold-badge text-[9px]">
                    {prop.tag}
                  </span>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#040B16]/80 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <MoveUpRight size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.24em] font-bold text-[#D4AF37] uppercase block">
                      {prop.city} · {prop.neighborhood}
                    </span>
                    <h3 className="display text-2xl text-white font-normal mt-1 group-hover:text-[#fff1b8] transition-colors">
                      {prop.name}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest block">Valuation</span>
                      <strong className="display text-xl text-white font-normal">{prop.price}</strong>
                    </div>
                    <span className="text-right text-[10px] text-white/60 tracking-wider">
                      {prop.detail}
                    </span>
                  </div>

                  <Link
                    to="/properties"
                    className="luxury-btn-outline !py-2.5 !text-[10px] w-full text-center group-hover:border-[#D4AF37]"
                  >
                    INQUIRE ON RESIDENCE
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/properties" className="luxury-btn-primary">
              <span>EXPLORE ALL 42 RESIDENCES</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE VITA STATEMENT (LUXURY ART DIRECTION) */}
      {/* ========================================================================= */}
      <section className="luxury-section-alt">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image with Gold Frame Accent */}
          <motion.div {...revealMotion} className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[#D4AF37]/35 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
                alt="Architectural Waterfront Interior"
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#040B16]/20 to-[#040B16]/90 hidden lg:block" />
            </div>

            {/* Overlapping Floating Metric */}
            <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:left-6 floating-glass-stat p-6 rounded-sm border border-[#D4AF37]/50 max-w-xs hidden sm:block">
              <span className="text-[10px] font-bold tracking-[0.24em] text-[#D4AF37] uppercase block">
                CLIENT SATISFACTION
              </span>
              <strong className="display text-3xl text-white font-normal">99.4%</strong>
              <p className="text-xs text-white/60 mt-1">
                Repeat and referral client relationships across global family offices.
              </p>
            </div>
          </motion.div>

          {/* Right Column Statement Text */}
          <motion.div {...revealMotion} className="lg:col-span-5 space-y-6">
            <span className="eyebrow">THE VITA ETHOS</span>
            <h2 className="display text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.05]">
              A Life Without <br />
              <i>Compromise.</i>
            </h2>
            <div className="w-24 gold-rule" />
            <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
              Representation with intention. A sharper eye, quiet confidence, and an uncompromising standard that begins with how you envision living.
            </p>
            <p className="text-white/65 text-sm font-light leading-relaxed">
              From historic waterfront enclaves in Palm Beach to ultra-modern sky mansions in Miami, VITA provides direct access to off-market inventory, bespoke transaction architecture, and private family office advisory.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/about" className="luxury-btn-primary">
                <span>OUR STORY &amp; ETHOS</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="luxury-btn-outline">
                <span>PRIVATE CONSULTATION</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICES OF DISTINCTION */}
      {/* ========================================================================= */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <span className="eyebrow">OUR EXPERTISE</span>
            <h2 className="display">
              At Your <i>Service.</i>
            </h2>
            <div className="w-24 mx-auto my-4 gold-rule" />
            <p className="text-white/65 text-sm font-light">
              Comprehensive real estate advisory structured for high-net-worth individuals and institutional family offices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Bespoke Acquisition',
                desc: 'Access off-market sanctuaries and architectural estates prior to public market introduction.',
                icon: KeyRound,
                link: '/buy',
              },
              {
                num: '02',
                title: 'Global Representation',
                desc: 'Position your property with cinematic narratives designed to command record-setting valuations.',
                icon: Building2,
                link: '/sell',
              },
              {
                num: '03',
                title: 'Cinematic Marketing',
                desc: 'High-production 4K architectural films, curated private viewings, and targeted global wealth distribution.',
                icon: Award,
                link: '/sell',
              },
              {
                num: '04',
                title: 'Private Client Office',
                desc: 'Confidential advisory spanning portfolio restructuring, 1031 exchanges, and discreet acquisitions.',
                icon: ShieldCheck,
                link: '/contact',
              },
            ].map((srv, index) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.num}
                  {...revealMotion}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  className="group gold-glass-card p-8 rounded-sm flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:-translate-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
                      <span className="display text-xl text-[#D4AF37] font-light">{srv.num}</span>
                      <Icon size={20} className="text-[#D4AF37] opacity-75 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="display text-2xl text-white font-normal mt-6 group-hover:text-[#fff1b8] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light leading-relaxed mt-3">
                      {srv.desc}
                    </p>
                  </div>

                  <Link
                    to={srv.link}
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase pt-6 hover:text-white transition-colors"
                  >
                    <span>DISCOVER MORE</span>
                    <ArrowRight size={12} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NUESTROS AGENTES / PRIVATE ADVISORY TEAM */}
      {/* ========================================================================= */}
      <section className="luxury-section relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] rounded-full bg-[#081F3E]/35 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Team Photo Showcase */}
            <motion.div {...revealMotion} className="lg:col-span-6 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-sm overflow-hidden border border-[#D4AF37]/45 shadow-[0_30px_90px_rgba(0,0,0,0.95)] group">
                <img
                  src={teamImg}
                  alt="Equipo de Asesores Privados de VITA Luxury Realty"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.04] brightness-[0.98]"
                />
                
                {/* Dark Navy Subtle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#01040A] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#01040A]/40 via-transparent to-transparent pointer-events-none" />

                {/* Decorative Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />

                {/* Top Floating Badge */}
                <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#020712]/85 backdrop-blur-md shadow-lg">
                  <Users size={13} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-bold tracking-[0.24em] text-[#fff1b8] uppercase">
                    EQUIPO DE ASESORÍA PRIVADA
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 floating-glass-stat p-5 rounded-sm border border-[#D4AF37]/60 max-w-[240px] shadow-2xl z-20">
                <div className="flex items-center gap-1.5 text-[#D4AF37] text-[9px] font-bold tracking-widest uppercase">
                  <Award size={13} />
                  <span>EXPERIENCIA COMBINADA</span>
                </div>
                <strong className="display text-2xl text-white font-normal block mt-1">100% Capacitados</strong>
                <p className="text-[11px] text-white/60 mt-0.5">
                  Especialistas en enclaves privados, off-market y family offices.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Narrative, Capabilities & Action */}
            <motion.div {...revealMotion} className="lg:col-span-6 space-y-6">
              <div>
                <span className="eyebrow">NUESTROS AGENTES</span>
                <h2 className="display text-3xl sm:text-5xl lg:text-5xl text-white font-normal leading-[1.08] mt-2">
                  Asesores de Élite, <br />
                  <i>Capacitados para lo Extraordinario.</i>
                </h2>
              </div>

              <div className="w-24 gold-rule" />

              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                En <strong>VITA Luxury Realty</strong>, nuestros agentes cuentan con una formación integral de primer nivel. No son intermediarios convencionales, sino especialistas patrimoniales preparados para representar transacciones de alta complejidad con rigurosa precisión.
              </p>

              <p className="text-white/65 text-xs sm:text-sm font-light leading-relaxed">
                Cada asesor está altamente capacitado en análisis de valor arquitectónico, estructuración legal y fiscal de activos inmobiliarios, discreción fiduciaria absoluta y negociación confidencial en las zonas más exclusivas de Florida.
              </p>

              {/* Training & Skills Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#030A17]/80 border border-[#D4AF37]/25">
                  <ShieldCheck size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Confidencialidad Absoluta</strong>
                    <span className="text-[11px] text-white/60">Protocolos rigurosos de privacidad para clientes distinguidos.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#030A17]/80 border border-[#D4AF37]/25">
                  <Compass size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Dominio de Florida</strong>
                    <span className="text-[11px] text-white/60">Star Island, Palm Beach, Brickell y Coral Gables.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#030A17]/80 border border-[#D4AF37]/25">
                  <KeyRound size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Acceso Off-Market</strong>
                    <span className="text-[11px] text-white/60">Propiedades trofeo que nunca llegan al mercado público.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#030A17]/80 border border-[#D4AF37]/25">
                  <Award size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Certificación Internacional</strong>
                    <span className="text-[11px] text-white/60">Capacitados para asesorar fondos familiares y compradores globales.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to="/agents" className="luxury-btn-primary">
                  <span>CONOCER A TODOS LOS AGENTES</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="luxury-btn-outline">
                  <span>SOLICITAR ASIGNACIÓN PRIVADA</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FLORIDA DESTINATIONS */}
      {/* ========================================================================= */}
      <section className="luxury-section-alt">
        <div className="section-container">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div {...revealMotion}>
              <span className="eyebrow">FLORIDA, CONSIDERED</span>
              <h2 className="display">
                Live Where Life <br />
                <i>Feels Different.</i>
              </h2>
            </motion.div>
            <Link to="/properties" className="luxury-btn-outline self-start md:self-auto">
              <span>EXPLORE ALL REGIONS</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.name}
                {...revealMotion}
                transition={{ delay: idx * 0.12, duration: 0.8 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-[#D4AF37]/30 shadow-2xl cursor-pointer"
                onClick={() => navigate(`/properties?location=${encodeURIComponent(dest.name.split(' ')[0])}`)}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.75] group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01040A] via-[#01040A]/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="gold-badge text-[8px]">{dest.tag}</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between border-b border-[#D4AF37]/40 pb-4">
                  <div>
                    <h3 className="display text-2xl text-white font-normal group-hover:text-[#fff1b8] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-[#D4AF37] font-medium tracking-wider mt-1">
                      {dest.count}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#01040A]/80 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRIVATE CLIENT TESTIMONIAL */}
      {/* ========================================================================= */}
      <section className="luxury-section text-center relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          <blockquote className="display text-2xl sm:text-4xl md:text-5xl font-light text-white leading-snug">
            “VITA understood that the home itself was only part of the story. They navigated our Star Island acquisition with complete discretion, strategic precision, and uncompromising elegance.”
          </blockquote>

          <div className="w-24 mx-auto gold-rule" />

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
              ALEXANDRA &amp; MICHAEL V.
            </p>
            <span className="text-[11px] text-white/50 tracking-wider">
              PRIVATE FAMILY OFFICE · STAR ISLAND, MIAMI BEACH
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLOSING CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-[#01040A] via-[#051428] to-[#010307] border-t border-[#D4AF37]/30 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <span className="eyebrow">BEGIN YOUR EXTRAORDINARY CHAPTER</span>
          <h2 className="display text-4xl sm:text-6xl text-white font-normal">
            Your Next Legacy <br />
            <i>Starts Here.</i>
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Connect with our private advisory group to explore confidential listings, schedule private showings, or receive a valuation of your Florida holding.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="luxury-btn-primary">
              <span>SCHEDULE PRIVATE CONSULTATION</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/properties" className="luxury-btn-outline">
              <span>VIEW THE COLLECTION</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
