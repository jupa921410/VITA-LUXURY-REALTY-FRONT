import { useState, type FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, KeyRound, Compass, CheckCircle2, Lock, Send } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

export default function Buy() {
  const [budget, setBudget] = useState('10M-25M');
  const [destination, setDestination] = useState('Miami Beach');
  const [timeframe, setTimeframe] = useState('Immediate');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Private Acquisition | VITA Luxury Realty';
  }, []);

  const handleMandateSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <main className="bg-[#040B16] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="BESPOKE BUYER REPRESENTATION"
        titlePrefix="ACQUIRING"
        rotatingWords={[
          'OFF-MARKET SANCTUARIES',
          'PRIVATE ISLAND COMPOUNDS',
          'TROPHY WATERFRONT ESTATES',
          'ARCHITECTURAL LEGACIES',
        ]}
        titleSuffix="IN FLORIDA"
        description="We act exclusively as trusted fiduciaries for high-net-worth buyers seeking rare, off-market, and trophy assets with paramount discretion."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
        badgeText="DISCREET FIDUCIARY"
        statCard={{
          label: 'OFF-MARKET ACCESS',
          value: '42%',
          sub: 'Closed Without Public Listing',
        }}
        ctaText="INITIATE ACQUISITION MANDATE"
        ctaLink="#mandate-form"
        ctaSecondaryText="EXPLORE ACTIVE COLLECTION"
        ctaSecondaryLink="/properties"
      />

      {/* 2. The Four-Stage Acquisition Framework */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header text-center max-w-3xl mx-auto">
            <span className="eyebrow">THE VITA METHOD</span>
            <h2 className="display">
              The Art of the <i>Acquisition.</i>
            </h2>
            <div className="w-24 mx-auto my-5 gold-rule" />
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Every acquisition is orchestrated as an architectural procurement. We bypass conventional broker channels to unlock true private equity real estate.
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
                    <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
                      <span className="text-xs font-bold tracking-[0.24em] text-[#D4AF37] uppercase">
                        {phase.step}
                      </span>
                      <Icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="display text-2xl text-white font-normal mt-6">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light leading-relaxed mt-4">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] text-[#D4AF37] font-semibold tracking-widest uppercase">
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
                In ultra-prime Florida real estate, the most extraordinary transactions are never broadcast on public portals. They take place in boardroom discussions and private dinners.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  'Direct access to over 60+ pre-market Florida estate owners.',
                  'Complete confidentiality agreements prior to showing viewings.',
                  'In-house architectural and waterfront engineering consult.',
                  'Comprehensive tax residency and domicile transition advisory.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 gold-glass-card p-8 lg:p-10 rounded-sm border border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/30">
                <span className="eyebrow">COMPARATIVE ADVANTAGE</span>
                <span className="text-xs text-[#D4AF37] font-bold">VITA STANDARDS</span>
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
          <div className="gold-glass-card p-8 sm:p-12 rounded-sm border border-[#D4AF37]/50 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
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
              <div className="p-8 text-center bg-[#071936]/90 border border-[#D4AF37] rounded-sm space-y-3">
                <CheckCircle2 size={32} className="text-[#D4AF37] mx-auto" />
                <h3 className="display text-2xl text-white">Mandate Received</h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  Thank you. Your confidential acquisition criteria has been routed directly to our Managing Partner. We will reach out discreetly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMandateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Primary Destination
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="luxury-input cursor-pointer"
                    >
                      <option value="Miami Beach" className="bg-[#071936]">Miami Beach & Islands</option>
                      <option value="Palm Beach" className="bg-[#071936]">Palm Beach & Manalapan</option>
                      <option value="Brickell" className="bg-[#071936]">Brickell Penthouse</option>
                      <option value="Coral Gables" className="bg-[#071936]">Coral Gables Waterfront</option>
                      <option value="Naples" className="bg-[#071936]">Naples / Port Royal</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Target Capital Allocation
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="luxury-input cursor-pointer"
                    >
                      <option value="5M-10M" className="bg-[#071936]">$5,000,000 – $10,000,000</option>
                      <option value="10M-25M" className="bg-[#071936]">$10,000,000 – $25,000,000</option>
                      <option value="25M-50M" className="bg-[#071936]">$25,000,000 – $50,000,000</option>
                      <option value="50M+" className="bg-[#071936]">$50,000,000+ (Trophy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Acquisition Horizon
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="luxury-input cursor-pointer"
                    >
                      <option value="Immediate" className="bg-[#071936]">Immediate (0–60 days)</option>
                      <option value="Q3-Q4" className="bg-[#071936]">Within 3–6 months</option>
                      <option value="LongTerm" className="bg-[#071936]">Strategic (6–12 months)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Client Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lord Harrington / Family Office Rep"
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Confidential Email / Telephone
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="advisory@familyoffice.com"
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                    Bespoke Architectural or Lifestyle Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify deep water yacht draft, private helipad, security compound requirements, or off-market preferences..."
                    className="luxury-input resize-none"
                  />
                </div>

                <button type="submit" className="luxury-btn-primary w-full !py-3.5">
                  <Send size={15} />
                  <span>TRANSMIT CONFIDENTIAL MANDATE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
