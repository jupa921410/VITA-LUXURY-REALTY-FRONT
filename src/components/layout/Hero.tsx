import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '@/assets/hero.jpg';
import brokerImg from '@/assets/broker.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#01040A] via-[#040D1B] to-[#01040A] pt-28 pb-20 selection:bg-[#D4AF37] selection:text-[#01040A]">
      {/* Background Image with Dark Contrast */}
      <div className="absolute inset-0 z-0 origin-center pointer-events-none">
        <img
          src={heroImg}
          alt="VITA Luxury Estate Florida"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.18] saturate-[0.8]"
        />
      </div>

      {/* Deep Navy Dark Overlays & Gradients */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#01040A] via-[#020712]/80 to-[#01040A]/95 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#01040A] via-[#051428]/60 to-[#01040A]/95 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-28 w-[600px] h-[600px] rounded-full bg-[#081F3E]/40 blur-[150px] pointer-events-none z-1" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-[#0B254A]/35 blur-[160px] pointer-events-none z-1" />

      {/* Hero Grid Container */}
      <div className="relative z-10 max-w-[1480px] w-full mx-auto px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Heading & Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/45 bg-[#030A17]/85 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-[0.28em] text-[#fff1b8] uppercase">
                FLORIDA PRIVATE ADVISORY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[9px] tracking-[0.22em] text-white/70 uppercase">
                ESTABLISHED 2011
              </span>
            </div>

            <h1 className="display text-4xl sm:text-6xl md:text-7xl lg:text-[4.4rem] xl:text-[5.4rem] font-normal text-white tracking-tight leading-[1.03] max-w-4xl">
              <span className="block text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 font-light">
                DISCOVER &amp;
              </span>
              <span className="text-gold-gradient font-normal italic drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
                LIVE THE VITA
              </span>
            </h1>

            <div className="w-32 my-6 gold-rule" />

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

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/properties" className="luxury-btn-primary">
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="luxury-btn-outline">
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

                {/* Broker Portrait Photo */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden">
                  <img
                    src={brokerImg}
                    alt="Elena Rostova - Managing Broker & Founder of VITA Luxury Realty"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.05] brightness-[0.97]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01040A] via-[#020712]/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#01040A]/35 via-transparent to-[#01040A]/30 pointer-events-none" />
                </div>

                {/* Broker Credentials Bar */}
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

              {/* Floating Metric Pill */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 z-30 floating-glass-stat p-4 rounded-sm border border-[#D4AF37]/60 max-w-[210px] flex-col gap-1 shadow-2xl">
                <div className="flex items-center gap-1.5 text-[#D4AF37] text-[9px] font-bold tracking-widest uppercase">
                  <Star size={11} fill="currentColor" />
                  <span>TOP 0.1% PRODUCER</span>
                </div>
                <strong className="display text-xl text-white font-normal">$780M+</strong>
                <span className="text-[10px] text-white/60">Career Transacted Volume</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
