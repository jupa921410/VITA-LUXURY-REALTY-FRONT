import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    { icon: ShieldCheck, title: t('pillar1Title'), desc: t('pillar1Desc') },
    { icon: Sparkles, title: t('pillar2Title'), desc: t('pillar2Desc') },
    { icon: Compass, title: t('pillar3Title'), desc: t('pillar3Desc') },
    { icon: Award, title: t('pillar4Title'), desc: t('pillar4Desc') },
  ];

  const milestones = [
    { year: '2011', title: t('milestone1Title'), desc: t('milestone1Desc') },
    { year: '2016', title: t('milestone2Title'), desc: t('milestone2Desc') },
    { year: '2020', title: t('milestone3Title'), desc: t('milestone3Desc') },
    { year: '2026', title: t('milestone4Title'), desc: t('milestone4Desc') },
  ];

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow={t('aboutEyebrow')}
        titlePrefix="THE ESSENCE OF"
        rotatingWords={[
          'Live The Vita',
          'Architectural Artistry',
          'Timeless Refinement',
          'Uncompromising Luxury',
        ]}
        titleSuffix="REALTY"
        description={t('aboutHeroDesc')}
        backgroundImage="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85"
        badgeText="ESTABLISHED 2011"
        statCard={{
          label: 'TOTAL TRANSACTED CAPITAL',
          value: '$2.4B+',
          sub: 'Florida Private Portfolio',
        }}
        ctaText={t('aboutHeroCta')}
        ctaLink="/contact"
        ctaSecondaryText={t('aboutHeroCtaSecondary')}
        ctaSecondaryLink="/properties"
        coordinates="LIVE BEYOND EXPECTATION"
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
              <span className="eyebrow">{t('aboutPointOfView')}</span>
              <h2 className="display text-3xl sm:text-5xl text-white font-normal leading-[1.05]">
                {t('aboutH2')}
              </h2>
              <div className="w-24 gold-rule" />
              <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
                {t('aboutP1')}
              </p>
              <p className="text-white/65 text-sm font-light leading-relaxed">
                {t('aboutP2')}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <strong className="display text-3xl text-[#f0dda6] font-normal">15+</strong>
                  <span className="text-xs text-white/50 block mt-1">{t('aboutStat1Label')}</span>
                </div>
                <div>
                  <strong className="display text-3xl text-[#f0dda6] font-normal">99.4%</strong>
                  <span className="text-xs text-white/50 block mt-1">{t('aboutStat2Label')}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-[#B8892F]/35 shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            >
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
                alt="VITA Architectural Presence"
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1730] via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Four Pillars of Excellence */}
      <section className="luxury-section-alt">
        <div className="section-container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <span className="eyebrow">{t('aboutPillarsEyebrow')}</span>
            <h2 className="display">
              {t('aboutPillarsH2')}
            </h2>
            <div className="w-24 mx-auto my-4 gold-rule" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="gold-glass-card p-8 rounded-sm space-y-4">
                  <div className="w-12 h-12 rounded-sm bg-[#12356A] border border-[#B8892F]/40 flex items-center justify-center text-[#B8892F]">
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
            <span className="eyebrow">{t('aboutTimelineEyebrow')}</span>
            <h2 className="display">{t('aboutTimelineH2')}</h2>
            <div className="w-20 mx-auto my-4 gold-rule" />
          </div>

          <div className="space-y-8 border-l border-[#B8892F]/30 pl-6 sm:pl-10 ml-4 sm:ml-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] sm:-left-[47px] top-1 w-3 h-3 rounded-full bg-[#0C1730] border-2 border-[#B8892F] group-hover:bg-[#B8892F] transition-colors" />
                <span className="text-xs font-accent font-semibold tracking-[0.24em] text-[#B8892F] block">{milestone.year}</span>
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
            {t('aboutCtaH2')}
          </h2>
          <p className="text-white/70 text-sm font-light">
            {t('aboutCtaP')}
          </p>
          <div className="pt-2">
            <Link to="/contact" className="luxury-btn-primary">
              <span>{t('aboutCtaBtn')}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
