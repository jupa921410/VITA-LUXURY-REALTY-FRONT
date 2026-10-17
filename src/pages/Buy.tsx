import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, KeyRound, Compass, CheckCircle2, Lock, Send } from 'lucide-react';
import { apiRequest } from '../lib/api';
import PageHero from '../components/layout/PageHero';
import { useLanguage } from '../context/LanguageContext';

export default function Buy() {
  const { t } = useLanguage();
  const [budget, setBudget] = useState('10M-25M');
  const [destination, setDestination] = useState('Tampa Bay');
  const [timeframe, setTimeframe] = useState('Immediate');
  const [submitted, setSubmitted] = useState(false);


  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const handleMandateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setError('');
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: data.get('name'), email: data.get('email'), interest: 'buy',
          message: ['Acquisition mandate', 'Destination: ' + destination, 'Budget: ' + budget, 'Timeframe: ' + timeframe, data.get('requirements')].join('\n'),
        }),
      });
      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to send your inquiry.');
    } finally { setSubmitting(false); }
  };

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow={t('buyEyebrow')}
        titlePrefix="ACQUIRING"
        rotatingWords={[
          'Off-Market Sanctuaries',
          'Private Island Compounds',
          'Tampa Bay Waterfront Homes',
          'South Tampa Estates',
        ]}
        titleSuffix="IN FLORIDA"
        description={t('buyHeroDesc')}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
        badgeText="DISCREET FIDUCIARY"
        statCard={{
          label: 'OFF-MARKET ACCESS',
          value: '42%',
          sub: 'Closed Without Public Listing',
        }}
        ctaText={t('buyHeroCta')}
        ctaLink="#mandate-form"
        ctaSecondaryText="EXPLORE ACTIVE COLLECTION"
        ctaSecondaryLink="/properties"
        coordinates="ACCESS THE EXCEPTIONAL"
      />

      {/* 2. The Four-Stage Acquisition Framework */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header text-center max-w-3xl mx-auto">
            <span className="eyebrow">{t('buyMethodEyebrow')}</span>
            <h2 className="display">
              {t('buyMethodH2')}
            </h2>
            <div className="w-24 mx-auto my-5 gold-rule" />
            <p className="text-white/70 text-sm font-light leading-relaxed">
              {t('buyMethodDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'PHASE 01',
                title: 'Mandate & Architecture',
                desc: 'A confidential briefing to define your geographic criteria, lifestyle requirements, yacht draft needs, and privacy parameters.',
                icon: Compass,
              },
              {
                step: 'PHASE 02',
                title: 'Off-Market Sourcing',
                desc: 'Leveraging direct owner relationships, estate attorneys, and private banking channels to surface unlisted opportunities.',
                icon: KeyRound,
              },
              {
                step: 'PHASE 03',
                title: 'Due Diligence & Valuation',
                desc: 'Rigorous structural assessment, sea-wall certification, zoning verification, and strategic valuation modelling.',
                icon: ShieldCheck,
              },
              {
                step: 'PHASE 04',
                title: 'Discreet Closing',
                desc: 'Anonymous entity structuring, NDA enforcement, and seamless white-glove settlement overseen by our senior partners.',
                icon: Lock,
              },
            ].map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.7 }}
                  className="gold-glass-card p-8 rounded-sm flex flex-col justify-between min-h-[340px]"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-[#B8892F]/20">
                      <span className="text-xs font-accent font-semibold tracking-[0.24em] text-[#B8892F] uppercase">
                        {phase.step}
                      </span>
                      <Icon size={20} className="text-[#B8892F]" />
                    </div>
                    <h3 className="display text-2xl text-white font-normal mt-6">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light leading-relaxed mt-4">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] text-[#B8892F] font-semibold tracking-widest uppercase">
                    <CheckCircle2 size={13} />
                    <span>GUARANTEED FIDUCIARY</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. The VITA Advantage vs Traditional Real Estate */}
      <section className="luxury-section-alt">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">THE FIDUCIARY DIFFERENCE</span>
              <h2 className="display text-3xl sm:text-5xl text-white font-normal leading-[1.05]">
                Why Discretion <br />
                <i>Matters Most.</i>
              </h2>
              <div className="w-24 gold-rule" />
              <p className="text-white/75 text-sm font-light leading-relaxed">
                The right Tampa Bay property is not always found through a simple online search. Our brokers combine active listings, local relationships, and private opportunities to expand your options.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  'Direct access to over 60+ pre-market Florida estate owners.',
                  'Complete confidentiality agreements prior to showing viewings.',
                  'In-house architectural and waterfront engineering consult.',
                  'Comprehensive tax residency and domicile transition advisory.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8892F] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 gold-glass-card p-8 lg:p-10 rounded-sm border border-[#B8892F]/45 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between pb-6 border-b border-[#B8892F]/30">
                <span className="eyebrow">COMPARATIVE ADVANTAGE</span>
                <span className="text-xs text-[#B8892F] font-bold">VITA STANDARDS</span>
              </div>

              <div className="space-y-6 mt-6 text-xs">
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <span className="text-white/60">Off-Market Inventory</span>
                  <span className="text-white font-semibold text-right">Dedicated Sourcing Team vs MLS-Only</span>
                </div>
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <span className="text-white/60">Client Representation</span>
                  <span className="text-white font-semibold text-right">Exclusive Single-Party Fiduciary</span>
                </div>
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <span className="text-white/60">Privacy Protocols</span>
                  <span className="text-white font-semibold text-right">Blind Trust &amp; LLC Structuring</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-white/60">Post-Acquisition</span>
                  <span className="text-white font-semibold text-right">Private Concierge &amp; Staffing Intros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Private Mandate Form */}
      <section id="mandate-form" className="luxury-section">
        <div className="section-container max-w-4xl">
          <div className="gold-glass-card p-8 sm:p-12 rounded-sm border border-[#B8892F]/50 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="eyebrow">CONFIDENTIAL CONSULTATION</span>
              <h2 className="display text-3xl sm:text-4xl text-white font-normal mt-2">
                Initiate Your Acquisition <i>Mandate</i>
              </h2>
              <div className="w-20 mx-auto my-4 gold-rule" />
              <p className="text-xs text-white/70 font-light">
                Submit your acquisition criteria. A Senior Partner will contact you within 4 business hours under strict mutual confidentiality.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-[#132C52]/90 border border-[#B8892F] rounded-sm space-y-3">
                <CheckCircle2 size={32} className="text-[#B8892F] mx-auto" />
                <h3 className="display text-2xl text-white">{t('buySuccessTitle')}</h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  {t('buySuccessDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleMandateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      {t('buyDestLabel')}
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="luxury-input cursor-pointer"
                    >
                      <option value="Tampa Bay" className="bg-[#132C52]">Tampa Bay Waterfront</option>
                      <option value="South Tampa" className="bg-[#132C52]">South Tampa Estates</option>
                      <option value="Clearwater" className="bg-[#132C52]">Clearwater Beach</option>
                      <option value="Coral Gables" className="bg-[#132C52]">Coral Gables Waterfront</option>
                      <option value="Naples" className="bg-[#132C52]">Naples / Port Royal</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      {t('buyBudgetLabel')}
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="luxury-input cursor-pointer"
                    >
                      <option value="5M-10M" className="bg-[#132C52]">$5,000,000 – $10,000,000</option>
                      <option value="10M-25M" className="bg-[#132C52]">$10,000,000 – $25,000,000</option>
                      <option value="25M-50M" className="bg-[#132C52]">$25,000,000 – $50,000,000</option>
                      <option value="50M+" className="bg-[#132C52]">$50,000,000+ (Trophy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      {t('buyTimeframeLabel')}
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="luxury-input cursor-pointer"
                    >
                      <option value="Immediate" className="bg-[#132C52]">Immediate (0–60 days)</option>
                      <option value="Q3-Q4" className="bg-[#132C52]">Within 3–6 months</option>
                      <option value="LongTerm" className="bg-[#132C52]">Strategic (6–12 months)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      {t('buyNameLabel')}
                    </label>
                    <input
                      required
                      type="text" name="name" maxLength={255}
                      placeholder="e.g. Lord Harrington / Family Office Rep"
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      {t('buyEmailLabel')}
                    </label>
                    <input
                      required
                      type="email" name="email" maxLength={255}
                      placeholder="advisory@familyoffice.com"
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      {t('buyReqLabel')}
                    </label>
                  <textarea
                    rows={3}
                    name="requirements" maxLength={1500}
                    placeholder="Specify deep water yacht draft, private helipad, security compound requirements, or off-market preferences..."
                    className="luxury-input resize-none"
                  />
                </div>

                {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
                <button disabled={submitting} type="submit" className="luxury-btn-primary w-full !py-3.5">
                  <Send size={15} />
                  <span>{submitting ? '...' : t('buySubmitBtn')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
