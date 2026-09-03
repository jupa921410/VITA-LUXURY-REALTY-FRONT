import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';

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

const advisors: Advisor[] = [
  {
    id: 'julian-vance',
    name: 'Julian Vance-Moretti',
    role: 'Managing Partner & Founder',
    specialty: 'Star Island & Palm Beach Compounds',
    volume: '$780M+ Career Volume',
    languages: ['English', 'Italian', 'French'],
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    phone: '+1 (305) 555-8482',
    email: 'julian@vitaluxuryrealty.com',
    bio: 'Over 18 years negotiating the most confidential landmark acquisitions in Star Island, Indian Creek, and Palm Beach with discreet global family offices.',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Senior Vice President · Waterfront Assets',
    specialty: 'Miami Beach Mega-Yacht Estates',
    volume: '$540M+ Career Volume',
    languages: ['English', 'Russian', 'German'],
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    phone: '+1 (305) 555-8483',
    email: 'elena@vitaluxuryrealty.com',
    bio: 'Renowned authority on Biscayne Bay deep-water navigability and architectural waterfront modernism, serving sovereign wealth funds and European industrialists.',
  },
  {
    id: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Managing Director · Penthouse Division',
    specialty: 'Brickell & Sunny Isles Penthouses',
    volume: '$420M+ Career Volume',
    languages: ['English', 'Spanish', 'Portuguese'],
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    phone: '+1 (305) 555-8484',
    email: 'marcus@vitaluxuryrealty.com',
    bio: 'Specializing in trophy sky mansions and pre-construction architectural developments with direct relationships to leading international developers.',
  },
  {
    id: 'sophia-delacroix',
    name: 'Sophia Delacroix',
    role: 'Director · Historic & Gated Enclaves',
    specialty: 'Coral Gables & Coconut Grove Estates',
    volume: '$390M+ Career Volume',
    languages: ['English', 'French', 'Spanish'],
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
    phone: '+1 (305) 555-8485',
    email: 'sophia@vitaluxuryrealty.com',
    bio: 'Expert in Florida historic preservation, coral-stone estates, and gated enclave privacy architecture, representing second-generation family estates.',
  },
];

export default function Agents() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  useEffect(() => {
    document.title = 'Private Advisors | VITA Luxury Realty';
  }, []);

  const filteredAdvisors = advisors.filter((adv) => {
    if (selectedSpecialty === 'All') return true;
    return adv.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
  });

  return (
    <main className="bg-[#040B16] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="PRIVATE CLIENT ADVISORY"
        titlePrefix="MEET OUR"
        rotatingWords={[
          'TRUSTED CONFIDANTS',
          'MASTER NEGOTIATORS',
          'TOP FLORIDA PRODUCERS',
          'PRIVATE FIDUCIARIES',
        ]}
        titleSuffix="AT VITA"
        description="Our advisors possess deep market intelligence, unmatched discretion, and direct personal access to the world’s most private real estate transactions."
        backgroundImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85"
        badgeText="VITA ADVISORY COUNCIL"
        statCard={{
          label: 'COMBINED TRANSACTIONS',
          value: '$2.13B+',
          sub: 'Florida Career Production',
        }}
        ctaText="REQUEST PRIVATE INTRODUCTION"
        ctaLink="/contact"
        ctaSecondaryText="VIEW EXCLUSIVE PORTFOLIO"
        ctaSecondaryLink="/properties"
      />

      {/* 2. Advisors Catalog */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="eyebrow">THE ADVISORY BOARD</span>
              <h2 className="display">
                Principals of <i>Integrity.</i>
              </h2>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Palm Beach', 'Waterfront', 'Penthouse', 'Coral Gables'].map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-sm transition-all ${
                    selectedSpecialty === spec
                      ? 'bg-[#D4AF37] text-[#040B16] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#071936] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {spec.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAdvisors.map((adv, idx) => (
              <motion.article
                key={adv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="group gold-glass-card rounded-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Advisor Photo */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#061730]">
                  <img
                    src={adv.img}
                    alt={adv.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 gold-badge text-[8px]">
                    {adv.volume}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37] uppercase block">
                      {adv.role}
                    </span>
                    <h3 className="display text-2xl text-white font-normal mt-1">
                      {adv.name}
                    </h3>
                    <p className="text-xs text-[#fff1b8]/80 font-medium mt-1">
                      {adv.specialty}
                    </p>
                    <p className="text-xs text-white/60 font-light mt-3 leading-relaxed">
                      {adv.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-white/50">
                      <Globe size={13} className="text-[#D4AF37]" />
                      <span>{adv.languages.join(' · ')}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:${adv.phone}`}
                        className="luxury-btn-outline !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5"
                      >
                        <Phone size={12} className="text-[#D4AF37]" />
                        <span>CALL</span>
                      </a>
                      <Link
                        to={`/contact?advisor=${encodeURIComponent(adv.name)}`}
                        className="luxury-btn-primary !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5"
                      >
                        <Mail size={12} />
                        <span>MESSAGE</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fiduciary Charter Strip */}
      <section className="luxury-section-alt">
        <div className="section-container max-w-4xl text-center space-y-6">
          <ShieldCheck size={36} className="text-[#D4AF37] mx-auto" />
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
