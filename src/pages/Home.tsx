import { preload } from 'react-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MoveUpRight, Search, ShieldCheck, Sparkles, Award, Compass, KeyRound, Building2, Users } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';
import { apiRequest } from '../lib/api';
import { resolvePropertyImageUrl, handleImageError } from '../lib/media';
import heroImg from '@/assets/hero.jpg';
import teamImg from '@/assets/team.jpg';
import GoldOrnament from '../components/layout/GoldOrnament';

// rotatingHeroTitles removed; titles are now obtained via translations within the component.

const featuredProperties: Array<{ id: string; slug?: string; city: string; neighborhood: string; name: string; price: string; detail: string; tag: string; img: string; has360?: boolean }> = [
  {
    id: 'residence-1', city: 'Miami Beach', neighborhood: 'Star Island', name: 'Villa Sole di Mare', price: '$18,950,000', detail: '6 Beds Â· 7.5 Baths Â· 8,450 SQ FT', tag: 'WATERFRONT TROPHY', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'residence-2', city: 'Palm Beach', neighborhood: 'Ocean Boulevard', name: 'The Breakers Ocean Estate', price: '$24,500,000', detail: '7 Beds Â· 9 Baths Â· 11,200 SQ FT', tag: 'PALM BEACH COMPOUND', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'residence-3', city: 'Brickell', neighborhood: 'Brickell Key', name: 'Aura Crown Penthouse', price: '$14,200,000', detail: '4 Beds Â· 6 Baths Â· 6,100 SQ FT', tag: 'SKYLINE SANCTUARY', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85', has360: true,
  },
  {
    id: 'residence-4', city: 'Coral Gables', neighborhood: 'Snapper Creek Lakes', name: 'Palazzo di Palma', price: '$11,800,000', detail: '5 Beds Â· 6 Baths Â· 7,800 SQ FT', tag: 'PRIVATE ENCLAVE', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'residence-5', city: 'Naples', neighborhood: 'Port Royal Club', name: 'Port Royal Sanctuary', price: '$29,000,000', detail: '6 Beds Â· 8 Baths Â· 9,950 SQ FT', tag: 'PORT ROYAL TROPHY', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'residence-6', city: 'Miami Beach', neighborhood: 'Venetian Islands', name: 'The Venetian Isle Retreat', price: '$16,500,000', detail: '5 Beds Â· 6 Baths Â· 6,400 SQ FT', tag: 'VENETIAN ISLANDS', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
  },
];

const destinations = [
  { name: 'Tampa Bay', count: '12 Waterfront Residences', tag: 'COASTAL ICONS', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Clearwater Beach', count: '9 Coastal Residences', tag: 'GULF FRONT LIVING', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' },
  { name: 'St. Petersburg', count: '14 Private Residences', tag: 'WATERFRONT ARTISTRY', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85' },
  { name: 'South Tampa', count: '7 Signature Estates', tag: 'PRIVATE ENCLAVES', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85' },
];

const revealMotion = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

// â”€â”€â”€ Testimonials Carousel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type TestimonialItem = {
  id: number; type: string; src: string; poster: string | null;
  alt: string | null; captionEs: string | null; captionEn: string | null;
};

function TestimonialsCarousel({
  testimonials,
  language,
  revealMotion: rm,
}: {
  testimonials: TestimonialItem[];
  language: string;
  revealMotion: typeof revealMotion;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  // Autoplay
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const item = testimonials[current];
  const caption = language === 'es' ? item.captionEs || item.captionEn : item.captionEn || item.captionEs;

  return (
    <section
      className="luxury-section relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#B8892F]/8 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* â”€â”€ Section Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div {...rm}>
            <span className="eyebrow">
              {language === 'es' ? 'EXPERIENCIAS DE CLIENTES' : 'CLIENT EXPERIENCES'}
            </span>
            <h2 className="display">
              {language === 'es' ? (
                <>Voces que <br /><i>nos inspiran.</i></>
              ) : (
                <>Voices that <br /><i>inspire us.</i></>
              )}
            </h2>
          </motion.div>
          {/* Dot indicators + counter */}
          <div className="flex flex-col items-start md:items-end gap-3 self-start md:self-auto">
            <span className="text-[#B8892F]/70 text-xs tracking-[0.2em] font-medium font-accent">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-500 ${
                    i === current
                      ? 'w-8 h-2 bg-[#B8892F]'
                      : 'w-2 h-2 bg-[#B8892F]/30 hover:bg-[#B8892F]/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* â”€â”€ Carousel Stage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end"
            >
              {/* Media */}
              <div className="relative aspect-video rounded-sm overflow-hidden border border-[#B8892F]/30 shadow-2xl bg-[#060912]">
                {/* Gold corner accents */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8892F]/60 rounded-tl-sm z-10" />
                <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B8892F]/60 rounded-tr-sm z-10" />
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B8892F]/60 rounded-bl-sm z-10" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8892F]/60 rounded-br-sm z-10" />

                {item.type === 'video' ? (
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={item.poster || undefined}
                    src={item.src}
                    aria-label={item.alt || 'Client testimonial'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt || 'Client testimonial'}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Caption + Nav */}
              <div className="flex flex-col gap-8 lg:min-w-[220px] lg:max-w-[260px]">
                {caption && (
                  <blockquote className="space-y-3">
                    <span className="text-[#B8892F] text-4xl leading-none font-accent select-none">"</span>
                    <p className="display text-lg text-white/90 font-normal leading-relaxed italic">
                      {caption}
                    </p>
                  </blockquote>
                )}
                {/* Arrow nav */}
                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-12 h-12 rounded-full border border-[#B8892F]/40 flex items-center justify-center text-[#B8892F] hover:bg-[#B8892F]/10 hover:border-[#B8892F] transition-all duration-300 group"
                  >
                    <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-12 h-12 rounded-full border border-[#B8892F]/40 flex items-center justify-center text-[#B8892F] hover:bg-[#B8892F]/10 hover:border-[#B8892F] transition-all duration-300 group"
                  >
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Home() {
  preload(heroImg, { as: 'image', fetchPriority: 'high' });
  const [testimonials, setTestimonials] = useState<Array<{
    id: number; type: string; src: string; poster: string | null;
    alt: string | null; captionEs: string | null; captionEn: string | null;
  }>>([]);
  useEffect(() => {
    const controller = new AbortController();
    apiRequest<typeof testimonials>('/testimonios-media', { signal: controller.signal })
      .then(setTestimonials)
      .catch(() => { if (!controller.signal.aborted) setTestimonials([]); });
    return () => controller.abort();
  }, []);
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const update = () => setPlayVideo(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const [wordIndex, setWordIndex] = useState(0);
  const rotatingTitles = [
    t('rotatingTitle1'),
    t('rotatingTitle2'),
    t('rotatingTitle3'),
    t('rotatingTitle4'),
];
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchType, setSearchType] = useState('All');
  const [searchPrice, setSearchPrice] = useState('All');
  const [remoteFeaturedProperties, setRemoteFeaturedProperties] = useState<typeof featuredProperties | null>(null);

  useEffect(() => {
    apiRequest<Array<{
      id: number;
      title: string;
      slug: string;
      price: string;
      location: string;
      type: string;
      beds: number;
      baths: number;
      sqft: number;
      image: string | null;
      gallery: Array<{ src?: string; type: string }>;
    }>>('/properties?featured=1')
      .then((properties) => {
        const mappedProperties = properties.map((property) => ({
          id: String(property.id),
          slug: property.slug,
          city: property.location.split(',')[0]?.trim() || property.location,
          neighborhood: property.location.split(',').slice(1).join(',').trim() || 'Tampa Bay',
          name: property.title,
          price: `$${Number(property.price).toLocaleString('en-US')}`,
          detail: `${property.beds} Beds Â· ${property.baths} Baths Â· ${Number(property.sqft).toLocaleString('en-US')} SQ FT`,
          tag: property.type.toUpperCase(),
          img: resolvePropertyImageUrl(property.image || property.gallery.find((media) => media.src && media.type === 'image')?.src),
          has360: property.gallery.some(
            (media) =>
              media.type === 'image360' ||
              media.type === 'photo360' ||
              media.type === 'iframe360' ||
              Boolean(media.src && (media.src.includes('/image360s/') || media.src.includes('360')))
          ),
        }));
        setRemoteFeaturedProperties(mappedProperties.length ? mappedProperties.slice(0, 3) : null);
      })
      .catch(() => setRemoteFeaturedProperties(null));
  }, []);

  const displayedFeaturedProperties = remoteFeaturedProperties || featuredProperties;
  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingTitles.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [rotatingTitles.length]);

  const yHeroBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scaleHeroBg = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const yHeroText = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

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
    <main className="bg-[#060912] text-[#F7F3EA] overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC MONUMENTAL HERO WITH BROKER PORTRAIT & DEEP NAVY GRADIENTS */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        onPointerMove={handlePointerMove}
        className="relative min-h-[96vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#060912] via-[#0D1A34] to-[#060912] pt-28 pb-20 selection:bg-[#B8892F] selection:text-[#060912]"
        style={{
          ['--cursor-x' as string]: '50%',
          ['--cursor-y' as string]: '40%',
        }}
      >
        {/* Tampa aerial footage with the existing poster as a graceful fallback. */}
        <motion.div
          style={{ y: yHeroBg, scale: scaleHeroBg }}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
        >
          <video
            className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.15] saturate-[1]"
            autoPlay={playVideo}
            preload="none"
            loop
            muted
            playsInline
            poster={heroImg}
            aria-hidden="true"
          >
            {playVideo && <source src="https://videos.pexels.com/video-files/19699162/19699162-uhd_3840_2160_60fps.mp4" type="video/mp4" />}
          </video>
        </motion.div>

        {/* Cinematic Vignette & Deep Dark Navy / Gold Overlays */}
        <div className="absolute inset-0 z-1 cinematic-vignette pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#060912]/45 via-[#0A1226]/28 to-[#060912]/38 pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#060912]/38 via-[#0A1830]/20 to-[#060912]/38 pointer-events-none" />
        <div className="absolute inset-0 z-1 arch-grid-bg opacity-15 pointer-events-none" />

        {/* Radial Cursor Light Spotlight Tracker */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-55 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle 650px at var(--cursor-x) var(--cursor-y), rgba(184, 137, 47, 0.14), transparent 75%)',
          }}
        />

        {/* Ambient Atmospheric Glow Lights */}
        <div className="absolute top-1/4 -left-28 w-[600px] h-[600px] rounded-full bg-[#12356A]/45 blur-[150px] pointer-events-none z-1" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-[#15305C]/38 blur-[160px] pointer-events-none z-1" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#B8892F]/12 blur-[140px] pointer-events-none z-1" />

        {/* Vertical editorial coordinate tag, left edge */}
        <div className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 pointer-events-none">
          <span className="w-px h-16 bg-gradient-to-b from-transparent to-[#B8892F]/50" />
          <span
            className="font-accent text-[9px] tracking-[0.35em] text-[#B8892F]/70 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            LIVE THE TAMPA BAY LIFESTYLE
          </span>
          <Compass size={13} className="text-[#B8892F]/60" />
          <span className="w-px h-16 bg-gradient-to-t from-transparent to-[#B8892F]/50" />
        </div>

        {/* Centered hero proposition */}
        <motion.div
          style={{ y: yHeroText, opacity: opacityHero }}
          className="relative z-10 flex w-full max-w-[1480px] mx-auto justify-center px-6 lg:px-12 py-6"
        >
          <div className="flex w-full flex-col items-center text-center">
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="gold-badge mb-7 bg-[#0A1226]/85 shadow-[0_0_30px_rgba(184,137,47,0.18)]"
              >
                <Sparkles size={14} className="text-[#B8892F]" />
                <span>{t('heroLabel')}</span>
                <span className="w-1 h-1 bg-[#B8892F] rotate-45" />
                <span className="text-white/60">ESTABLISHED 2011</span>
              </motion.div>

              {/* Changing Animated Hero Title */}
              <h1 className="display text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.6rem] font-normal text-white tracking-tight leading-[1.02] max-w-4xl">
                <span className="block text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 font-light not-italic">
                  Discover &amp;
                </span>
                <span className="relative inline-block overflow-hidden py-1 min-h-[1.25em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingTitles[wordIndex]}
                      initial={{ y: 55, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -55, opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-gold-gradient font-script text-[1.4em] pr-3"
                    >
                      {rotatingTitles[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Gold Divider Rule */}
              <div className="w-36 my-6 gold-rule" />

              {/* Subtitle */}
              <p className="text-white/80 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-7">
                {t('heroDescription')}
              </p>

              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 mb-8 border-y border-[#B8892F]/20 w-full max-w-xl">
                {([
                  { v: '$2.4B+', label: t('trustMetric1Label') },
                  { v: '99.4%', label: t('trustMetric2Label') },
                  { v: 'Top 0.1%', label: t('trustMetric3Label') },
                ] as const).map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <strong className="display italic text-2xl sm:text-3xl text-[#f0dda6] font-normal block">{stat.v}</strong>
                    <span className="font-accent text-[8.5px] tracking-[0.18em] text-white/60 uppercase block mt-1">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/properties" className="luxury-btn-primary group">
                  <span>{t('exploreListings')}</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/contact" className="luxury-btn-outline group">
                  <span>{t('confidentialConsultation')}</span>
                </Link>
                <Link to="/join-team" className="luxury-btn-outline group">
                  <span>{t('joinTeamButton')}</span>
                </Link>
              </div>

          </div>
        </motion.div>

        {/* Scroll Mouse Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-80">
          <span className="text-[9px] font-accent font-semibold tracking-[0.28em] text-[#B8892F] uppercase">
            SCROLL TO DISCOVER
          </span>
          <div className="scroll-mouse">
            <div className="scroll-mouse-wheel" />
          </div>
          <ChevronDown size={14} className="text-[#B8892F] animate-bounce" />
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
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#B8892F]/25">
            <div>
                  <span className="eyebrow">{t('searchProperty')}</span>
              <h3 className="display text-xl lg:text-2xl text-white font-normal mt-0.5">
                {t('searchHeading')}
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs text-[#B8892F]">
              <Compass size={16} />
              <span className="tracking-widest uppercase text-[10px]">Private Off-Market Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-end">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase">
                {t('searchLocationLabel')}
              </label>
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="luxury-input cursor-pointer"
              >
                <option value="All" className="bg-[#132548] text-white">All Tampa Bay Destinations</option>
                <option value="Tampa" className="bg-[#132548] text-white">Tampa & South Tampa</option>
                <option value="Clearwater" className="bg-[#132548] text-white">Clearwater Beach</option>
                <option value="St. Petersburg" className="bg-[#132548] text-white">St. Petersburg</option>
                <option value="Davis Islands" className="bg-[#132548] text-white">Davis Islands</option>
                <option value="Tampa Bay" className="bg-[#132548] text-white">Tampa Bay Waterfront</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase">
                {t('searchTypeLabel')}
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="luxury-input cursor-pointer"
              >
                <option value="All" className="bg-[#132548] text-white">Any Architectural Style</option>
                <option value="Waterfront Estate" className="bg-[#132548] text-white">Waterfront Estate</option>
                <option value="Skyline Penthouse" className="bg-[#132548] text-white">Skyline Penthouse</option>
                <option value="Modern Villa" className="bg-[#132548] text-white">Modern Architectural Villa</option>
                <option value="Historic Compound" className="bg-[#132548] text-white">Historic Compound</option>
              </select>
            </div>

            {/* Price Bracket */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase">
                {t('searchPriceLabel')}
              </label>
              <select
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                className="luxury-input cursor-pointer"
              >
                <option value="All" className="bg-[#132548] text-white">Any Valuation</option>
                <option value="5M+" className="bg-[#132548] text-white">$5,000,000+</option>
                <option value="10M+" className="bg-[#132548] text-white">$10,000,000+</option>
                <option value="20M+" className="bg-[#132548] text-white">$20,000,000+</option>
                <option value="50M+" className="bg-[#132548] text-white">$50,000,000+ (Trophy)</option>
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button type="submit" className="luxury-btn-primary w-full !py-3">
                <Search size={15} />
                <span>{t('searchButton')}</span>
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
              <span className="eyebrow">{t('featuredListings')}</span>
              <h2 className="display">
                {t('featuredHeading')}
              </h2>
            </motion.div>
            <motion.p {...revealMotion} className="text-white/65 text-sm max-w-md font-light leading-relaxed">
              {t('featuredDescription')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedFeaturedProperties.map((prop, idx) => (
              <motion.article
                key={prop.id}
                {...revealMotion}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group gold-glass-card rounded-sm overflow-hidden flex flex-col"
              >
                {/* Property Image Container with Zoom */}
                <Link
                  to={`/properties/${prop.slug || slugify(prop.name)}`}
                  className="relative aspect-[3/2] overflow-hidden bg-[#0D2040]"
                >
                  <img
                    src={prop.img}
                    alt={prop.name}
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.96] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1730] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 gold-badge text-[9px]">
                    {prop.tag}
                  </span>
                  {'has360' in prop && prop.has360 && (
                    <span className="absolute bottom-3 left-4 gold-badge text-[8px] bg-[#0C1730]/90 border border-[#B8892F] shadow-lg flex items-center gap-1 font-bold">
                      <Sparkles size={10} className="text-[#f0dda6]" />
                      360° TOUR
                    </span>
                  )}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0C1730]/80 border border-[#B8892F]/50 flex items-center justify-center text-[#B8892F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <MoveUpRight size={16} />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.24em] font-bold text-[#B8892F] uppercase block">
                      {prop.city} Â· {prop.neighborhood}
                    </span>
                    <h3 className="display text-2xl text-white font-normal mt-1 group-hover:text-[#f0dda6] transition-colors">
                      <Link to={`/properties/${prop.slug || slugify(prop.name)}`}>{prop.name}</Link>
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-[#B8892F]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest block">Valuation</span>
                      <strong className="display text-xl text-white font-normal">{prop.price}</strong>
                    </div>
                    <span className="text-right text-[10px] text-white/60 tracking-wider">
                      {prop.detail}
                    </span>
                  </div>

                  <Link
                    to={`/properties/${prop.slug || slugify(prop.name)}`}
                    className="luxury-btn-outline !py-2.5 !text-[10px] w-full text-center group-hover:border-[#B8892F]"
                  >
                    VIEW PROPERTY DETAILS
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
      <section className="cream-section">
        <GoldOrnament
          variant="frond"
          className="hidden lg:block absolute top-10 right-[6%] w-16 h-32 rotate-[16deg] opacity-80"
        />
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image with Gold Frame Accent */}
          <motion.div {...revealMotion} className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[#B8892F]/40 shadow-[0_30px_70px_-15px_rgba(22,35,61,0.35)]">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
                alt="Architectural Waterfront Interior"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0C1730]/15 to-[#0C1730]/75 hidden lg:block" />
            </div>

            {/* Overlapping Floating Metric â€” cream card, gold-shadowed */}
            <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:left-6 cream-card p-6 max-w-xs hidden sm:block">
              <span className="text-[10px] font-accent font-semibold tracking-[0.24em] text-[#7a5a16] uppercase block">
                CLIENT SATISFACTION
              </span>
              <strong className="display text-3xl text-[#16233D] font-normal">99.4%</strong>
              <p className="text-xs text-[#16233D]/65 mt-1">
                Repeat and referral client relationships across global family offices.
              </p>
            </div>

            {/* Overlapping gold sprig â€” transparent SVG cutout, floats over the frame corner */}
            <GoldOrnament
              variant="sprig"
              className="hidden sm:block absolute -top-10 right-6 w-9 h-14 rotate-[10deg] z-20"
            />
          </motion.div>

          {/* Right Column Statement Text */}
          <motion.div {...revealMotion} className="lg:col-span-5 space-y-6">
            <span className="eyebrow">TAMPA BAY REAL ESTATE ADVISORY</span>
            <h2 className="display text-3xl sm:text-5xl lg:text-6xl text-[#16233D] font-normal leading-[1.05]">
              A Better Way to <br />
              <i>Buy and Sell.</i>
            </h2>
            <div className="w-24 gold-rule" />
            <p className="text-[#16233D]/80 text-sm sm:text-base font-light leading-relaxed">
              VITA Luxury Realty provides focused representation for buyers, sellers, and owners of exceptional Tampa Bay properties.
            </p>
            <p className="text-[#16233D]/65 text-sm font-light leading-relaxed">
              From South Tampa estates to Clearwater waterfront homes and St. Petersburg architectural residences, our brokerage manages valuation, marketing, negotiations, private showings, and acquisition strategy.
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
            <span className="eyebrow">{t('services')}</span>
            <h2 className="display">
              {t('servicesHeading')}
            </h2>
            <div className="w-24 mx-auto my-4 gold-rule" />
            <p className="text-white/65 text-sm font-light">
              Full-service real estate support for Tampa Bay buyers, sellers, investors, and private clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Buyer Representation',
                desc: 'Identify, evaluate, and negotiate luxury homes and waterfront properties that match your criteria.',
                icon: KeyRound,
                link: '/buy',
              },
              {
                num: '02',
                title: 'Seller Representation',
                desc: 'Build a pricing, positioning, and negotiation strategy designed to protect value and attract qualified buyers.',
                icon: Building2,
                link: '/sell',
              },
              {
                num: '03',
                title: 'Luxury Property Marketing',
                desc: 'Professional photography, video, private showings, and targeted exposure for distinctive Tampa Bay listings.',
                icon: Award,
                link: '/sell',
              },
              {
                num: '04',
                title: 'Valuation & Advisory',
                desc: 'Market analysis, property valuation, acquisition planning, and discreet advice for complex real estate decisions.',
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
                    <div className="flex items-center justify-between pb-6 border-b border-[#B8892F]/20">
                      <span className="display text-xl text-[#B8892F] font-light">{srv.num}</span>
                      <Icon size={20} className="text-[#B8892F] opacity-75 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="display text-2xl text-white font-normal mt-6 group-hover:text-[#f0dda6] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light leading-relaxed mt-3">
                      {srv.desc}
                    </p>
                  </div>

                  <Link
                    to={srv.link}
                    className="inline-flex items-center gap-2 text-[10px] font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase pt-6 hover:text-white transition-colors"
                  >
                    <span>LEARN ABOUT THIS SERVICE</span>
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
        <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] rounded-full bg-[#12356A]/35 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-[#B8892F]/10 blur-[150px] pointer-events-none" />

        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Team Photo Showcase */}
            <motion.div {...revealMotion} className="lg:col-span-6 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-sm overflow-hidden border border-[#B8892F]/45 shadow-[0_30px_90px_rgba(0,0,0,0.95)] group">
                <img
                  src={teamImg}
                  alt="Equipo de Asesores Privados de VITA Luxury Realty"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.04] brightness-[0.98]"
                />
                
                {/* Dark Navy Subtle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060912]/40 via-transparent to-transparent pointer-events-none" />

                {/* Decorative Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#B8892F] pointer-events-none z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#B8892F] pointer-events-none z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#B8892F] pointer-events-none z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#B8892F] pointer-events-none z-10" />

                {/* Top Floating Badge */}
                <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8892F]/50 bg-[#0A1226]/85 backdrop-blur-md shadow-lg">
                  <Users size={13} className="text-[#B8892F]" />
                  <span className="text-[9px] font-accent font-semibold tracking-[0.24em] text-[#f0dda6] uppercase">
                    EQUIPO DE ASESORÃA PRIVADA
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 floating-glass-stat p-5 rounded-sm border border-[#B8892F]/60 max-w-[240px] shadow-2xl z-20">
                <div className="flex items-center gap-1.5 text-[#B8892F] text-[9px] font-accent font-semibold tracking-widest uppercase">
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
                <span className="eyebrow">{t('team')}</span>
                <h2 className="display text-3xl sm:text-5xl lg:text-5xl text-white font-normal leading-[1.08] mt-2">
                  Local Advisors for <br />
                  <i>Exceptional Properties.</i>
                </h2>
              </div>

              <div className="w-24 gold-rule" />

              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                At <strong>VITA Luxury Realty</strong>, our brokers represent buyers and sellers throughout Tampa Bay with local market knowledge, disciplined negotiation, and attentive service.
              </p>

              <p className="text-white/65 text-xs sm:text-sm font-light leading-relaxed">
                Our team supports property valuation, listing preparation, private showings, offer strategy, and confidential negotiations for luxury homes and waterfront estates.
              </p>

              {/* Training & Skills Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#060D1C]/80 border border-[#B8892F]/25">
                  <ShieldCheck size={18} className="text-[#B8892F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Confidential Representation</strong>
                    <span className="text-[11px] text-white/60">Private communication and discreet handling of sensitive transactions.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#060D1C]/80 border border-[#B8892F]/25">
                  <Compass size={18} className="text-[#B8892F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Tampa Bay Expertise</strong>
                    <span className="text-[11px] text-white/60">Tampa, Clearwater, St. Petersburg, and Davis Islands.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#060D1C]/80 border border-[#B8892F]/25">
                  <KeyRound size={18} className="text-[#B8892F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Off-Market Opportunities</strong>
                    <span className="text-[11px] text-white/60">Access to select properties before broad public marketing.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[#060D1C]/80 border border-[#B8892F]/25">
                  <Award size={18} className="text-[#B8892F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white font-semibold block">Experienced Advisors</strong>
                    <span className="text-[11px] text-white/60">Guidance for local buyers, investors, and international clients.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to="/agents" className="luxury-btn-primary">
                  <span>MEET OUR BROKERS</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="luxury-btn-outline">
                  <span>REQUEST A BROKER CONSULTATION</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FLORIDA DESTINATIONS */}
      {/* ========================================================================= */}
      <section className="cream-section">
        <GoldOrnament
          variant="sprig"
          className="hidden lg:block absolute bottom-10 left-[4%] w-12 h-20 rotate-[-14deg] opacity-70"
        />
        <div className="section-container">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div {...revealMotion}>
              <span className="eyebrow">{t('serviceAreas')}</span>
              <h2 className="display">
                Find Your Next <br />
                <i>Tampa Bay Property.</i>
              </h2>
            </motion.div>
            <Link to="/properties" className="luxury-btn-outline self-start md:self-auto">
              <span>VIEW ALL LISTINGS</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.name}
                {...revealMotion}
                transition={{ delay: idx * 0.12, duration: 0.8 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-[#B8892F]/30 shadow-2xl cursor-pointer"
                onClick={() => navigate(`/properties?location=${encodeURIComponent(dest.name.split(' ')[0])}`)}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.75] group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-[#060912]/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="gold-badge text-[8px]">{dest.tag}</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between border-b border-[#B8892F]/40 pb-4">
                  <div>
                    <h3 className="display text-2xl text-white font-normal group-hover:text-[#f0dda6] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-[#B8892F] font-medium tracking-wider mt-1">
                      {dest.count}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#060912]/80 border border-[#B8892F]/60 flex items-center justify-center text-[#B8892F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRIVATE CLIENT TESTIMONIAL CAROUSEL */}
      {/* ========================================================================= */}
      {testimonials.length > 0 && (
        <TestimonialsCarousel testimonials={testimonials} language={language} revealMotion={revealMotion} />
      )}

      {/* ========================================================================= */}
      {/* 8. CLOSING CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-[#060912] via-[#0F2340] to-[#05070c] border-t border-[#B8892F]/30 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#B8892F]/10 blur-[130px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <span className="eyebrow">{t('ctaReady')}</span>
          <h2 className="display text-4xl sm:text-6xl text-white font-normal">
            {t('ctaHeading')}
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            {t('ctaDescription')}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="luxury-btn-primary">
              <span>{t('speakBroker')}</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/properties" className="luxury-btn-outline">
              <span>{t('browseListings')}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

