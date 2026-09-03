import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

interface Article {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  img: string;
  summary: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 'report-2026',
    category: 'MARKET INTELLIGENCE',
    title: 'The 2026 Florida Ultra-Prime Index: The Sovereign Shift Towards Trophy Waterfronts',
    date: 'FEBRUARY 2026',
    readTime: '6 MIN READ',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    summary: 'An in-depth empirical analysis of private capital migration into Miami Beach, Palm Beach, and Naples, evaluating mega-yacht accessibility and historical price resilience.',
    featured: true,
  },
  {
    id: 'architectural-frontiers',
    category: 'ARCHITECTURAL ESSAY',
    title: 'Biophilic Minimalism: How World-Class Architects Are Re-Envisioning Biscayne Bay Estates',
    date: 'JANUARY 2026',
    readTime: '4 MIN READ',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    summary: 'Examining the convergence of organic limestone, monolithic glass spans, and integrated subtropical botanical landscaping in contemporary Miami villas.',
  },
  {
    id: 'buyers-guide',
    category: 'ACQUISITION ADVISORY',
    title: 'Navigating Deep-Water Seawall Engineering: A Buyer’s Essential Fiduciary Checklist',
    date: 'DECEMBER 2025',
    readTime: '5 MIN READ',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    summary: 'Crucial considerations for prospective yacht owners acquiring Florida waterfront parcels, including tidal draft, riparian rights, and environmental permits.',
  },
  {
    id: 'penthouse-metrics',
    category: 'MARKET INTELLIGENCE',
    title: 'Sky Mansions vs Ground Compounds: Comparative Asset Allocation in Miami vs Palm Beach',
    date: 'NOVEMBER 2025',
    readTime: '7 MIN READ',
    img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85',
    summary: 'Evaluating liquidity premiums, maintenance efficiencies, and lifestyle differences between trophy duplex penthouses and oceanfront compounds.',
  },
];

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'Market Intelligence | VITA Luxury Realty';
  }, []);

  const filteredArticles = articles.filter((art) => {
    if (selectedCategory === 'All') return true;
    return art.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <main className="bg-[#040B16] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="VITA JOURNAL &amp; DISPATCH"
        titlePrefix="ANALYZING"
        rotatingWords={[
          '2026 MARKET FORECASTS',
          'ARCHITECTURAL BRILLIANCE',
          'WATERFRONT CAPITAL FLOWS',
          'PRIVATE WEALTH INDICES',
        ]}
        titleSuffix="IN FLORIDA"
        description="Proprietary market intelligence, architectural critiques, and confidential insights curated exclusively for our global private clients."
        backgroundImage="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85"
        badgeText="RESEARCH DESK"
        statCard={{
          label: 'QUARTERLY CIRCULATION',
          value: '14,800+',
          sub: 'Private Client Subscribers',
        }}
        ctaText="SUBSCRIBE TO DISPATCH"
        ctaLink="#subscribe"
        ctaSecondaryText="VIEW THE RESIDENCES"
        ctaSecondaryLink="/properties"
      />

      {/* 2. Intelligence Articles Grid */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="eyebrow">EDITORIAL DESK</span>
              <h2 className="display">
                Thought <i>Leadership.</i>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Market Intelligence', 'Architectural', 'Acquisition'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-[#040B16] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#071936] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="group gold-glass-card rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#061730]">
                  <img
                    src={article.img}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 gold-badge text-[8px]">
                    {article.category}
                  </span>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-[10px] text-[#D4AF37] tracking-widest uppercase">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="display text-2xl text-white font-normal mt-3 group-hover:text-[#fff1b8] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light mt-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#D4AF37]/20">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase group-hover:text-white transition-colors cursor-pointer">
                      <span>READ FULL MONOGRAPH</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIP Private Dispatch Subscription Strip */}
      <section id="subscribe" className="luxury-section-alt text-center">
        <div className="section-container max-w-2xl mx-auto space-y-6">
          <BookOpen size={36} className="text-[#D4AF37] mx-auto" />
          <h2 className="display text-3xl sm:text-4xl text-white font-normal">
            Subscribe to the <i>VITA Monograph.</i>
          </h2>
          <p className="text-xs text-white/70 font-light leading-relaxed">
            Quarterly private market intelligence, off-market transaction data, and architectural essays delivered confidentially to your executive inbox.
          </p>
          <div className="flex max-w-md mx-auto items-center border border-[#D4AF37]/45 bg-[#040B16] p-1.5 rounded-sm">
            <input
              type="email"
              placeholder="Executive email address..."
              className="w-full bg-transparent px-3 py-2 text-xs text-white outline-none placeholder-white/40"
            />
            <button className="luxury-btn-primary !py-2 !px-4 !text-[9px] shrink-0">
              <span>SUBSCRIBE</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
