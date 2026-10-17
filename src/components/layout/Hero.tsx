import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '@/assets/hero_new.jpg';
import brokerImg from '@/assets/broker.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#060912] via-[#0D1A34] to-[#060912] pt-28 pb-20 selection:bg-[#B8892F] selection:text-[#060912]">
      {/* Background Image with Dark Contrast */}
      <div className="absolute inset-0 z-0 origin-center pointer-events-none">
        <img
          src={heroImg}
          alt="VITA Luxury Estate Florida"
          className="w-full h-full object-cover filter brightness-[0.42] contrast-[1.2] saturate-[0.9]"
        />
      </div>

      {/* Cinematic Vignette & Deep Dark Overlays */}
      <div className="absolute inset-0 z-1 cinematic-vignette pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#060912]/70 via-[#0A1226]/50 to-[#060912]/60 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#060912]/64 via-[#0A1830]/38 to-[#060912]/64 pointer-events-none" />
      <div className="absolute inset-0 z-1 arch-grid-bg opacity-30 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
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
          LIVE THE VITA DIFFERENCE
        </span>
        <Compass size={13} className="text-[#B8892F]/60" />
        <span className="w-px h-16 bg-gradient-to-t from-transparent to-[#B8892F]/50" />
      </div>

      {/* Hero Grid Container */}
      <div className="relative z-10 max-w-[1480px] w-full mx-auto px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Heading & Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Badge */}
            <div className="gold-badge mb-7 bg-[#0A1226]/85 shadow-[0_0_30px_rgba(184,137,47,0.18)]">
              <Sparkles size={13} className="text-[#B8892F]" />
              <span>FLORIDA PRIVATE ADVISORY</span>
              <span className="w-1 h-1 bg-[#B8892F] rotate-45" />
              <span className="text-white/60">ESTABLISHED 2011</span>
            </div>

            <h1 className="display text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.6rem] font-normal text-white tracking-tight leading-[1.02] max-w-4xl">
              <span className="block text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 font-light not-italic">
                Discover &amp;
              </span>
              <span className="text-gold-gradient font-script text-[1.4em]">
                Live the VITA
              </span>
            </h1>

            <div className="w-36 my-6 gold-rule" />

            <p className="text-white/80 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-7">
              Representing Florida’s most extraordinary private residences, architectural icons, and off-market sanctuaries with unyielding discretion.
            </p>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 mb-8 border-y border-[#B8892F]/20 w-full max-w-xl">
              {[
                { v: '$2.4B+', l: 'Transacted Volume' },
                { v: '99.4%', l: 'Client Retention' },
                { v: 'Top 0.1%', l: 'Florida Advisory' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.l}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <strong className="display italic text-2xl sm:text-3xl text-[#f0dda6] font-normal block">{stat.v}</strong>
                  <span className="font-accent text-[8.5px] tracking-[0.18em] text-white/60 uppercase block mt-1">{stat.l}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/properties" className="luxury-btn-primary group">
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="luxury-btn-outline group">
                <span>CONFIDENTIAL CONSULTATION</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Broker Portrait Presentation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[430px] lg:max-w-[460px] group"
            >
              {/* Ambient Halo Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#B8892F]/25 via-[#16335E]/50 to-[#B8892F]/20 rounded-sm blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative min-h-[570px] sm:min-h-[650px] overflow-visible transition-transform duration-700 group-hover:-translate-y-1.5">
                <div className="absolute top-8 right-0 w-[84%] h-[62%] overflow-hidden border border-[#B8892F]/55 bg-[#0A1226]/70 shadow-[0_28px_70px_rgba(0,0,0,0.7)] rotate-3 transition-transform duration-700 group-hover:rotate-1">
                  <img src={heroImg} alt="Luxury Florida estate" className="w-full h-full object-cover brightness-[0.72] contrast-[1.08] saturate-[0.95]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/68 via-[#060912]/18 to-[#0A1226]/12" />
                  <span className="absolute bottom-4 left-4 font-accent text-[9px] tracking-[0.25em] text-[#F0DDA6] uppercase">Private waterfront collection</span>
                </div>
                <div className="absolute top-5 left-0 z-20 gold-badge bg-[#0A1226]/85 shadow-lg">MANAGING BROKER &amp; FOUNDER</div>
                <img
                  src={brokerImg}
                  alt="Elena Rostova - Managing Broker & Founder of VITA Luxury Realty"
                  className="absolute inset-x-0 bottom-0 z-10 w-full h-[96%] object-contain object-bottom transition-transform duration-1000 group-hover:scale-[1.03] filter contrast-[1.05] brightness-[0.98] drop-shadow-[0_24px_28px_rgba(0,0,0,0.65)]"
                />
                <div className="absolute bottom-4 left-0 z-20 w-[78%] border-l border-[#B8892F] bg-[#060912]/88 px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                  <span className="eyebrow block mb-1">PRINCIPAL ADVISOR</span>
                  <h3 className="display italic text-2xl sm:text-3xl text-white font-normal group-hover:text-[#f0dda6] transition-colors">Elena Rostova</h3>
                  <p className="font-accent text-[10px] text-[#B8892F] tracking-wider mt-1 uppercase">Licensed Broker · Managing Partner</p>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed mt-3">Confidential advisory for Florida&apos;s most exceptional waterfront estates.</p>
                  <Link to="/contact" className="font-accent inline-flex items-center gap-2 mt-3 text-[10px] font-semibold tracking-[0.2em] text-[#B8892F] uppercase hover:text-white transition-colors group/link">
                    <span>DIRECT CONSULTATION</span><ArrowRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Floating Metric Pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="hidden sm:flex absolute -bottom-6 -left-6 z-30 floating-glass-stat p-4 border border-[#B8892F]/60 max-w-[210px] flex-col gap-1 shadow-2xl"
              >
                <div className="font-accent flex items-center gap-1.5 text-[#B8892F] text-[9px] font-semibold tracking-[0.2em] uppercase">
                  <Star size={11} fill="currentColor" />
                  <span>Top 0.1% Producer</span>
                </div>
                <strong className="display italic text-xl text-white font-normal">$780M+</strong>
                <span className="text-[10px] text-white/60">Career Transacted Volume</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
