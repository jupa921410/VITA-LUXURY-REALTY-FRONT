import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Post, formatPostDate } from '../lib/posts';
import PageHero from '../components/layout/PageHero';
import { apiRequest } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export default function Insights() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [remoteArticles, setRemoteArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');


  useEffect(() => {
    const controller = new AbortController();
    apiRequest<Post[]>('/posts', { signal: controller.signal })
      .then((posts) => {
        if (!Array.isArray(posts)) throw new Error('Invalid posts response');
        if (!controller.signal.aborted) setRemoteArticles(posts);
      })
      .catch(() => { if (!controller.signal.aborted) setLoadError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  const handleSubscribe = async (event: FormEvent) => {
    event.preventDefault();
    setSubscribeError('');
    setSubscribing(true);
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'VITA Dispatch Subscriber',
          email: subscribeEmail,
          message: 'Please add this contact to the VITA Monograph private dispatch.',
          interest: 'other',
        }),
      });
      setSubscribed(true);
      setSubscribeEmail('');
    } catch (subscriptionError) {
      setSubscribeError(subscriptionError instanceof Error ? subscriptionError.message : 'Unable to complete your subscription.');
    } finally {
      setSubscribing(false);
    }
  };

  const categories = [...new Set(remoteArticles.map(post => post.category || 'Uncategorized'))];
  const filteredArticles = remoteArticles.filter(post =>
    selectedCategory === 'All' || (post.category || 'Uncategorized') === selectedCategory);

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow={t('insightsEyebrow')}
        titlePrefix="ANALYZING"
        rotatingWords={[
          '2026 Market Forecasts',
          'Tampa Bay Market Intelligence',
          'Waterfront Capital Flows',
          'Private Wealth Indices',
        ]}
        titleSuffix="IN FLORIDA"
        description={t('insightsHeroDesc')}
        backgroundImage="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85"
        badgeText="RESEARCH DESK"
        statCard={{
          label: 'QUARTERLY CIRCULATION',
          value: '14,800+',
          sub: 'Private Client Subscribers',
        }}
        ctaText={t('insightsSubscribeBtn')}
        ctaLink="#subscribe"
        ctaSecondaryText="VIEW THE RESIDENCES"
        ctaSecondaryLink="/properties"
        coordinates="INTELLIGENCE FOR YOUR NEXT MOVE"
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
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#B8892F] text-[#0C1730] font-bold shadow-[0_0_15px_rgba(184,137,47,0.4)]'
                      : 'bg-[#132C52] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loading && <p role="status">{t('insightsLoadingPosts')}</p>}
          {!loading && loadError && <div role="alert"><p>{t('insightsErrorTitle')}</p><button className="luxury-btn-outline mt-4" onClick={() => { setLoading(true); setLoadError(false); setSelectedCategory('All'); setAttempt(value => value + 1); }}>{t('insightsRetry')}</button></div>}
          {!loading && !loadError && filteredArticles.length === 0 && <p role="status">{t('insightsNoArticles')}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {!loading && !loadError && filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="group gold-glass-card rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0F2244]">
                  <img
                    src={article.featuredImage || "/logo.png"}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1730] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 gold-badge text-[8px]">
                    {article.category}
                  </span>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-[10px] text-[#B8892F] tracking-widest uppercase">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatPostDate(article.publishedAt)}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        VITA JOURNAL
                      </span>
                    </div>

                    <h3 className="display text-2xl text-white font-normal mt-3 group-hover:text-[#f0dda6] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light mt-3 leading-relaxed">
                      {article.excerptEn}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#B8892F]/20">
                    <Link to={`/insights/${encodeURIComponent(article.slug)}`} className="inline-flex items-center gap-2 text-[10px] font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase group-hover:text-white transition-colors cursor-pointer">
                      <span>{t('insightsReadMore')}</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
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
          <BookOpen size={36} className="text-[#B8892F] mx-auto" />
          <h2 className="display text-3xl sm:text-4xl text-white font-normal">
            {t('insightsSubscribeH2')}
          </h2>
          <p className="text-xs text-white/70 font-light leading-relaxed">
            {t('insightsSubscribeDesc')}
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            {subscribed ? (
              <p className="text-sm text-[#B8892F] border border-[#B8892F]/45 bg-[#0C1730] p-4">{t('insightsSubscribeSuccess')}</p>
            ) : (
              <div className="flex items-center border border-[#B8892F]/45 bg-[#0C1730] p-1.5 rounded-sm">
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={(event) => setSubscribeEmail(event.target.value)}
                  placeholder="Executive email address..."
                  className="w-full bg-transparent px-3 py-2 text-xs text-white outline-none placeholder-white/40"
                />
                <button disabled={subscribing} className="luxury-btn-primary !py-2 !px-4 !text-[9px] shrink-0 disabled:opacity-60">
                  <span>{subscribing ? '...' : t('insightsSubscribeBtn')}</span>
                </button>
              </div>
            )}
            {subscribeError && <p className="text-xs text-red-300 mt-2">{subscribeError}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
