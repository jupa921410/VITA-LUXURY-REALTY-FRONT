import { useState, useMemo } from 'react';
import { Calculator, Globe, Video, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import { useLanguage, formatNumber } from '../context/LanguageContext';

export default function Sell() {
  const { t } = useLanguage();
  const [sqft, setSqft] = useState<number>(6500);
  const [locationMultiplier, setLocationMultiplier] = useState<number>(2400); // base $/sqft
  const [tierMultiplier, setTierMultiplier] = useState<number>(1.25); // architecture tier


  // Compute estimated valuation bracket
  const valuation = useMemo(() => {
    const baseValue = sqft * locationMultiplier * tierMultiplier;
    const lower = Math.round((baseValue * 0.93) / 50000) * 50000;
    const upper = Math.round((baseValue * 1.08) / 50000) * 50000;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    return {
      lower: formatter.format(lower),
      upper: formatter.format(upper),
      base: formatter.format(baseValue),
    };
  }, [sqft, locationMultiplier, tierMultiplier]);

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="GLOBAL LISTING &amp; DISPOSITION"
        titlePrefix="COMMANDING"
        rotatingWords={[
          'Record-Breaking Reach',
          'Cinematic Narratives',
          'Global Wealth Access',
          'Peak Market Value',
        ]}
        titleSuffix="FOR YOUR PROPERTY"
        description="Sell your Tampa Bay luxury home with accurate pricing, strategic marketing, qualified buyer outreach, and experienced negotiation from listing to closing."
        backgroundImage="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85"
        badgeText="GLOBAL DISTRIBUTION"
        statCard={{
          label: t('avgSalesPremium'),
          value: '+14.8%',
          sub: 'Above Standard Market Benchmarks',
        }}
        ctaText={t('calculateAssetValuation')}
        ctaLink="#valuation-calculator"
        ctaSecondaryText={t('viewOurTrackRecord')}
        ctaSecondaryLink="/properties"
        coordinates={t('makeYourPropertyMatterMore')}
      />

      {/* 2. Interactive Real-Time Property Valuation Calculator */}
      <section id="valuation-calculator" className="luxury-section relative">
        <div className="section-container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <span className="eyebrow">ESTIMATE YOUR ASSET</span>
            <h2 className="display">
              Tampa Bay Property <i>Valuation.</i>
            </h2>
            <div className="w-24 mx-auto my-4 gold-rule" />
            <p className="text-white/70 text-sm font-light">
              Interactive real-time estimation algorithm powered by recent ultra-prime Florida waterfront and penthouse sales data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 gold-glass-card p-8 rounded-sm space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#B8892F] pb-4 border-b border-[#B8892F]/25 text-xs font-accent font-semibold tracking-widest uppercase">
                  <Calculator size={16} />
                  <span>{t('propertyValuationDetails')}</span>
                </div>

                {/* Slider: SQ FT */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/70 font-semibold tracking-wider uppercase">{t('interiorLivingSpace')}</span>
                    <strong className="text-[#B8892F] text-base">{formatNumber(sqft)} {t('sqftLabel')}</strong>
                  </div>
                  <input
                    type="range"
                    min={2500}
                    max={18000}
                    step={250}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="luxury-range"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>2,500 SQ FT</span>
                    <span>10,000 SQ FT</span>
                    <span>18,000 SQ FT</span>
                  </div>
                </div>

                {/* Select Location Tier */}
                <div className="mt-6 space-y-2">
                  <label className="text-xs text-white/70 font-semibold tracking-wider uppercase block">
                    {t('locationTier')}
                  </label>
                  <select
                    value={locationMultiplier}
                    onChange={(e) => setLocationMultiplier(Number(e.target.value))}
                    className="luxury-input cursor-pointer"
                  >
                    <option value={2800} className="bg-[#132C52]">Tampa Bay Waterfront ($2,800+/sqft)</option>
                    <option value={2400} className="bg-[#132C52]">South Tampa Estate ($2,400+/sqft)</option>
                    <option value={2100} className="bg-[#132C52]">Clearwater Beach ($2,100+/sqft)</option>
                    <option value={1900} className="bg-[#132C52]">St. Petersburg Waterfront ($1,900+/sqft)</option>
                    <option value={1700} className="bg-[#132C52]">Coral Gables Waterway ($1,700+/sqft)</option>
                  </select>
                </div>

                {/* Select Architectural Class */}
                <div className="mt-6 space-y-2">
                  <label className="text-xs text-white/70 font-semibold tracking-wider uppercase block">
                    {t('architecturalClass')}
                  </label>
                  <select
                    value={tierMultiplier}
                    onChange={(e) => setTierMultiplier(Number(e.target.value))}
                    className="luxury-input cursor-pointer"
                  >
                    <option value={1.35} className="bg-[#132C52]">Mega-Yacht Deepwater Frontage / Trophy Lot (+35%)</option>
                    <option value={1.25} className="bg-[#132C52]">Designer Architectural Custom / Signature Architect (+25%)</option>
                    <option value={1.1} className="bg-[#132C52]">Renovated Ultra-Luxury Waterfront (+10%)</option>
                    <option value={1.0} className="bg-[#132C52]">Classic Luxury Turn-Key Condition (Base)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-white/50 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#B8892F]" />
                <span>{t('confidentialAlgorithmEstimate')}</span>
              </div>
            </div>

            {/* Estimated Value Card */}
            <div className="lg:col-span-5 gold-glass-card p-8 rounded-sm border border-[#B8892F]/60 flex flex-col justify-between text-center bg-gradient-to-b from-[#081f44] to-[#040f22]">
              <div>
                <span className="gold-badge text-[9px] mb-4">{t('projectedDispositionBracket')}</span>
                <span className="text-xs text-white/60 uppercase tracking-widest block mt-4">
                  {t('estimatedValuationRange')}
                </span>
                <div className="display text-3xl sm:text-4xl text-gold-gradient font-normal my-4 leading-snug">
                  {valuation.lower}
                  <span className="block text-xl text-white/50 my-1 font-light">to</span>
                  {valuation.upper}
                </div>
                <p className="text-xs text-white/60 font-light max-w-xs mx-auto leading-relaxed">
                  Based on current private liquidity demand across New York, California, and European family offices.
                </p>
              </div>

              <div className="pt-6 border-t border-[#B8892F]/25 space-y-3">
                <Link
                  to={`/contact?subject=Valuation&sqft=${sqft}`}
                  className="luxury-btn-primary w-full block text-center !py-3"
                >
                  <span>{t('orderFormalCmaReport')}</span>
                  <ArrowRight size={14} />
                </Link>
                <p className="text-[10px] text-white/40 tracking-wider">
                  {t('complimentaryConfidential')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The VITA Cinematic Marketing Engine */}
      <section className="luxury-section-alt">
        <div className="section-container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <span className="eyebrow">THE CAMPAIGN BLUEPRINT</span>
            <h2 className="display">
              Unrivaled <i>Exposure.</i>
            </h2>
            <div className="w-24 mx-auto my-4 gold-rule" />
            <p className="text-white/70 text-sm font-light">
              We create targeted marketing campaigns for Tampa Bay luxury listings, combining strong presentation, private showings, and qualified buyer outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: '4K Architectural Films',
                desc: 'Hollywood-caliber production capturing dawn-to-dusk light, yacht arrival perspectives, and the emotional narrative of the estate.',
              },
              {
                icon: Globe,
                title: 'Global Family Office Syndication',
                desc: 'Direct dispatch to our proprietary network of 12,000+ verified global wealth advisors across London, Zurich, Dubai, and Singapore.',
              },
              {
                icon: TrendingUp,
                title: 'Record Valuation Record',
                desc: 'Strategic pricing architecture and multi-party negotiation that regularly establishes new price-per-square-foot benchmarks.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="gold-glass-card p-8 rounded-sm space-y-4">
                  <div className="w-12 h-12 rounded-sm bg-[#0a234a] border border-[#B8892F]/40 flex items-center justify-center text-[#B8892F]">
                    <Icon size={22} />
                  </div>
                  <h3 className="display text-2xl text-white font-normal">{feature.title}</h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="luxury-section text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="eyebrow">{t('readyToList')}</span>
          <h2 className="display text-3xl sm:text-5xl text-white font-normal">
            {t('representYourEstateWithDistinction')}
          </h2>
          <p className="text-white/70 text-sm font-light max-w-lg mx-auto">
            Speak directly with our senior managing partners for a private market assessment of your Florida residence.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="luxury-btn-primary">
              <span>{t('schedulePrivateListingConsultation')}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
