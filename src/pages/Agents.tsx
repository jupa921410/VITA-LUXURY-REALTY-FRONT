import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, ShieldCheck, Globe, X, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import { apiRequest } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

interface Advisor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  volume: string;
  languages: string[];
  img: string;
  phone: string;
  email: string;
  bio: string;
}

function phoneNumber(phone: string) {
  return phone.replace(/[^+0-9]/g, '');
}

function AgentContactButtons({ advisor, spanish }: { advisor: Advisor; spanish: boolean }) {
  const number = phoneNumber(advisor.phone);
  if (!/\d/.test(number)) {
    return <p className="text-xs text-white/50">{spanish ? 'Telefono no disponible' : 'Phone unavailable'}</p>;
  }
  return (
    <div className="relative z-20 grid grid-cols-2 gap-2 pt-1">
      <a href={`tel:${number}`} aria-label={`${spanish ? 'Llamar a' : 'Call'} ${advisor.name}`} className="luxury-btn-outline !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5">
        <Phone size={12} className="text-[#B8892F]" />
        <span>{spanish ? 'LLAMAR' : 'CALL'}</span>
      </a>
      <a href={`sms:${number}`} aria-label={`${spanish ? 'Enviar SMS a' : 'Text'} ${advisor.name}`} className="luxury-btn-primary !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5">
        <MessageSquare size={12} />
        <span>{spanish ? 'MENSAJE' : 'MESSAGE'}</span>
      </a>
    </div>
  );
}

function AdvisorModal({ advisor, spanish, onClose }: { advisor: Advisor; spanish: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} aria-labelledby="advisor-modal-title" onCancel={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }} className="m-auto w-[calc(100%-2rem)] max-w-4xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-sm border border-[#B8892F]/40 bg-[#0C1730] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm" data-lenis-prevent>
      <div className="relative p-6 sm:p-8">
        <button type="button" autoFocus onClick={onClose} aria-label={spanish ? 'Cerrar detalles' : 'Close details'} className="absolute right-3 top-3 z-10 rounded-full bg-[#132C52] p-2 text-white hover:bg-[#B8892F] focus-visible:outline-2 focus-visible:outline-[#B8892F]">
          <X size={20} />
        </button>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <img src={advisor.img} alt={advisor.name} className="w-full max-h-[55dvh] rounded-sm object-contain bg-[#0F2244]" />
          <div className="min-w-0 space-y-4 md:pr-5">
            <p className="text-xs tracking-widest uppercase text-[#B8892F]">{advisor.role}</p>
            <h2 id="advisor-modal-title" className="display text-3xl sm:text-4xl">{advisor.name}</h2>
            <p className="text-sm text-[#f0dda6]">{advisor.specialty}</p>
            <p className="text-xs tracking-wider text-[#B8892F]">{advisor.volume}</p>
            <p className="whitespace-pre-line break-words text-sm leading-relaxed text-white/75">{advisor.bio}</p>
            <p className="flex items-center gap-2 text-xs text-white/60"><Globe size={14} />{advisor.languages.join(' / ')}</p>
            {advisor.phone && <p className="text-sm text-white/80">{advisor.phone}</p>}
            {advisor.email && <a href={`mailto:${advisor.email}`} className="flex items-center gap-2 text-sm text-[#f0dda6] break-all"><Mail size={14} className="shrink-0" />{advisor.email}</a>}
            <AgentContactButtons advisor={advisor} spanish={spanish} />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Agents() {
  const { t, language } = useLanguage();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [remoteAdvisors, setRemoteAdvisors] = useState<Advisor[]>([]);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<{ data: Array<{ id: number; name: string; title: string | null; bio: string | null; contact?: { email: string | null; phone: string | null; whatsapp: string | null } | null; photo_url: string | null }> }>('/real-estate-agents', { signal: controller.signal })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        setRemoteAdvisors(data.map((agent) => ({
        id: String(agent.id),
        name: agent.name,
        role: agent.title || 'Real Estate Advisor',
        specialty: 'Tampa Bay Private Advisory',
        volume: 'VITA ADVISORY COUNCIL',
        languages: ['English', 'Spanish'],
        img: agent.photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
        phone: agent.contact?.phone || agent.contact?.whatsapp || '',
        email: agent.contact?.email || '',
        bio: agent.bio || 'Private real estate representation across Tampa Bay.',
      })));
        setLoadStatus('success');
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadStatus('error');
      });
    return () => controller.abort();
  }, []);

  const filteredAdvisors = remoteAdvisors.filter((adv) => {
    if (selectedSpecialty === 'All') return true;
    return adv.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
  });

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow={t('agentsEyebrow')}
        titlePrefix="MEET OUR"
        rotatingWords={[
          'Tampa Bay Brokers',
          'Buyer Representatives',
          'Listing Specialists',
          'Property Advisors',
        ]}
        titleSuffix="AT VITA"
        description={t('agentsHeroDesc')}
        backgroundImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85"
        badgeText="VITA ADVISORY COUNCIL"
        statCard={{
          label: 'COMBINED TRANSACTIONS',
          value: '$2.13B+',
          sub: 'Florida Career Production',
        }}
        ctaText={t('agentsCtaBtn')}
        ctaLink="/contact"
        ctaSecondaryText="VIEW EXCLUSIVE PORTFOLIO"
        ctaSecondaryLink="/properties"
        coordinates="EXPERTISE THAT MOVES YOU"
      />

      <section className="luxury-section pt-0">
        <div className="section-container flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-y border-[#B8892F]/20 py-8">
          <div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2 className="display text-3xl">Bring your perspective to <i>VITA.</i></h2></div>
          <Link to="/join-team" className="luxury-btn-primary shrink-0">JOIN THE TEAM <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      {/* 2. Advisors Catalog */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="eyebrow">{t('agentsListEyebrow')}</span>
              <h2 className="display">
                {t('agentsListH2')}
              </h2>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Tampa Bay', 'Waterfront', 'South Tampa', 'Clearwater'].map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-sm transition-all ${
                    selectedSpecialty === spec
                      ? 'bg-[#B8892F] text-[#0C1730] font-bold shadow-[0_0_15px_rgba(184,137,47,0.4)]'
                      : 'bg-[#132C52] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {spec.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loadStatus === 'loading' && (
              <div role="status" className="col-span-full flex min-h-64 items-center justify-center gap-3 text-white/70">
                <LoaderCircle aria-hidden="true" size={22} className="animate-spin motion-reduce:animate-none text-[#B8892F]" />
                <span>{language === 'es' ? 'Cargando agentes...' : 'Loading advisors...'}</span>
              </div>
            )}
            {loadStatus === 'error' && (
              <p role="alert" className="col-span-full py-12 text-center text-white/70">
                {language === 'es' ? 'No se pudieron cargar los agentes. Intenta recargar la pagina.' : 'Unable to load advisors. Please try refreshing the page.'}
              </p>
            )}
            {loadStatus === 'success' && filteredAdvisors.length === 0 && (
              <div role="status" className="col-span-full text-center py-12 space-y-4">
                <p className="text-white/70">
                  {remoteAdvisors.length === 0
                    ? (language === 'es' ? 'No hay agentes disponibles en este momento.' : 'No advisors are available at the moment.')
                    : (language === 'es' ? 'No hay agentes para esta especialidad.' : 'No advisors match this specialty.')}
                </p>
                {remoteAdvisors.length > 0 && <button onClick={() => setSelectedSpecialty('All')} className="luxury-btn-outline">
                  {language === 'es' ? 'VER TODOS LOS AGENTES' : 'VIEW ALL ADVISORS'}
                </button>}
              </div>
            )}
            {filteredAdvisors.map((adv, idx) => (
              <motion.article
                key={adv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="relative group gold-glass-card rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <button
                  type="button"
                  onClick={() => setSelectedAdvisor(adv)}
                  aria-label={`${t('agentViewProfile')}: ${adv.name}`}
                  aria-haspopup="dialog"
                  className="absolute inset-0 z-10 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#B8892F]"
                />
                {/* Advisor Photo */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0F2244]">
                  <img
                    src={adv.img}
                    alt={adv.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1730] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 gold-badge text-[8px]">
                    {adv.volume}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.22em] font-bold text-[#B8892F] uppercase block">
                      {adv.role}
                    </span>
                    <h3 className="display text-2xl text-white font-normal mt-1">
                      {adv.name}
                    </h3>
                    <p className="text-xs text-[#f0dda6]/80 font-medium mt-1">
                      {adv.specialty}
                    </p>
                    <p className="text-xs text-white/60 font-light mt-3 leading-relaxed line-clamp-3">
                      {adv.bio.length > 160 ? adv.bio.slice(0, 157).replace(/\s+\S*$/, '') + '...' : adv.bio}
                    </p>
                    <span className="mt-3 inline-block text-[10px] font-semibold tracking-wider text-[#B8892F] group-hover:underline">{t('agentViewProfile')} &rarr;</span>
                  </div>

                  <div className="pt-4 border-t border-[#B8892F]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-white/50">
                      <Globe size={13} className="text-[#B8892F]" />
                      <span>{adv.languages.join(' · ')}</span>
                    </div>

                    <AgentContactButtons advisor={adv} spanish={language === 'es'} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {selectedAdvisor && (
        <AdvisorModal advisor={selectedAdvisor} spanish={language === 'es'} onClose={() => setSelectedAdvisor(null)} />
      )}

      {/* 3. Fiduciary Charter Strip */}
      <section className="luxury-section-alt">
        <div className="section-container max-w-4xl text-center space-y-6">
          <ShieldCheck size={36} className="text-[#B8892F] mx-auto" />
          <h2 className="display text-3xl sm:text-4xl text-white font-normal">
            The VITA Fiduciary Charter
          </h2>
          <div className="w-24 mx-auto gold-rule" />
          <p className="text-sm text-white/70 font-light leading-relaxed">
            Every VITA advisor is bound by strict non-disclosure obligations, fiduciary commitment, and zero conflict-of-interest principles. Your financial architecture, private holdings, and identity remain impeccably protected.
          </p>
        </div>
      </section>
    </main>
  );
}
