import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';

export default function About() {
  useEffect(() => {
    document.title = 'Our Heritage | VITA Luxury Realty';
  }, []);

  return (
    <main className="bg-[#040B16] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="HERITAGE &amp; PHILOSOPHY"
        titlePrefix="THE ESSENCE OF"
        rotatingWords={[
          'LIVE THE VITA',
          'ARCHITECTURAL ARTISTRY',
          'TIMELESS REFINEMENT',
          'UNCOMPROMISING LUXURY',
        ]}
        titleSuffix="REALTY"
        description="More than transactions. We curate and represent the way exceptional living should feel across Florida’s most historic and visionary destinations."
        backgroundImage="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85"
        badgeText="ESTABLISHED 2011"
        statCard={{
          label: 'TOTAL TRANSACTED CAPITAL',
          value: '$2.4B+',
          sub: 'Florida Private Portfolio',
        }}
        ctaText="SPEAK WITH MANAGING PARTNERS"
        ctaLink="/contact"
        ctaSecondaryText="EXPLORE OUR RESIDENCES"
        ctaSecondaryLink="/properties"
      />

      {/* 2. Brand Story & Ethos */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="eyebrow">OUR POINT OF VIEW</span>
              <h2 className="display text-3xl sm:text-5xl text-white font-normal leading-[1.05]">
                Architecture as a <br />
                <i>Way of Life.</i>
              </h2>
              <div className="w-24 gold-rule" />
              <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
                VITA was founded on a singular conviction: that exceptional real estate is not merely square footage, but an architectural vessel for an elevated human experience.
              </p>
              <p className="text-white/65 text-sm font-light leading-relaxed">
                Headquartered in Miami with private advisory suites in Palm Beach, we serve a global clientele of founders, industrialists, and collectors. We reject transactional velocity in favor of obsessive curation and generational discretion.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <strong className="display text-3xl text-[#fff1b8] font-normal">15+</strong>
                  <span className="text-xs text-white/50 block mt-1">Years of Florida Advisory</span>
                </div>
                <div>
                  <strong className="display text-3xl text-[#fff1b8] font-normal">99.4%</strong>
                  <span className="text-xs text-white/50 block mt-1">Client Retention Rate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D4AF37]/35 shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
                alt="VITA Architectural Presence"
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Four Pillars of Excellence */}
      <section className="luxury-section-alt">
        <div className="section-container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <span className="eyebrow">OUR CORE PRINCIPLES</span>
            <h2 className="display">
              Pillars of <i>Distinction.</i>
            </h2>
            <div className="w-24 mx-auto my-4 gold-rule" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Absolute Discretion',
                desc: 'Client identity and transactional terms are safeguarded behind multi-layered legal and operational protocols.',
              },
              {
                icon: Sparkles,
                title: 'Architectural Provenance',
                desc: 'We represent only properties that reflect genuine architectural importance, rare views, and superior craftsmanship.',
              },
              {
                icon: Compass,
                title: 'Market Intelligence',
                desc: 'Proprietary valuation models, off-market transaction data, and sovereign wealth capital flow analysis.',
              },
              {
                icon: Award,
                title: 'Generational Fiduciary',
                desc: 'Advising families across generations on estate consolidation, 1031 exchanges, and generational acquisitions.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="gold-glass-card p-8 rounded-sm space-y-4">
                  <div className="w-12 h-12 rounded-sm bg-[#081d3d] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <Icon size={20} />
                  </div>
                  <h3 className="display text-2xl text-white font-normal">{pillar.title}</h3>
                  <p className="text-xs text-white/65 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Heritage Timeline */}
      <section className="luxury-section">
        <div className="section-container max-w-4xl">
          <div className="section-header text-center max-w-xl mx-auto">
            <span className="eyebrow">A DECADE OF LANDMARKS</span>
            <h2 className="display">Key <i>Milestones.</i></h2>
            <div className="w-20 mx-auto my-4 gold-rule" />
          </div>

          <div className="space-y-8 border-l border-[#D4AF37]/30 pl-6 sm:pl-10 ml-4 sm:ml-8">
            {[
              { year: '2011', title: 'Founding of VITA Luxury Realty', desc: 'Established in Brickell with an initial advisory portfolio of $120M in private waterfront holdings.' },
              { year: '2016', title: 'Palm Beach Private Office Expansion', desc: 'Inauguration of our dedicated Palm Beach office on Worth Avenue, catering to classic island estates.' },
              { year: '2020', title: '$1 Billion Transaction Threshold', desc: 'Surpassing $1B in closed transactions with record-setting sales across Star Island and Gables Estates.' },
              { year: '2026', title: 'Global Family Office Advisory', desc: 'Managing an active Florida collection surpassing $2.4B in private representation and off-market syndication.' },
            ].map((milestone, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] sm:-left-[47px] top-1 w-3 h-3 rounded-full bg-[#040B16] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] transition-colors" />
                <span className="text-xs font-bold tracking-[0.24em] text-[#D4AF37] block">{milestone.year}</span>
                <h3 className="display text-2xl text-white font-normal mt-1">{milestone.title}</h3>
                <p className="text-xs text-white/65 font-light mt-1 max-w-xl leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Closing CTA */}
      <section className="luxury-section-alt text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="display text-3xl sm:text-5xl text-white font-normal">
            Experience the <i>VITA Standard.</i>
          </h2>
          <p className="text-white/70 text-sm font-light">
            We invite you to experience real estate representation conducted at the highest level of discretion and sophistication.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="luxury-btn-primary">
              <span>SCHEDULE AN INTRODUCTORY MEETING</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
