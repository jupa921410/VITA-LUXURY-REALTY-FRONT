import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { apiRequest } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const prefilledProp = searchParams.get('property') || '';
  const prefilledAdvisor = searchParams.get('advisor') || '';

  const [inquiryType, setInquiryType] = useState('Acquiring');
  const [capital, setCapital] = useState('$10M–$25M');
  const [meetingFormat, setMeetingFormat] = useState('Tampa Bay Private Office');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    prefilledProp
      ? `I would like to schedule a private confidential showing for ${prefilledProp}.`
      : prefilledAdvisor
      ? `I would like to connect directly with ${prefilledAdvisor} regarding private representation.`
      : ''
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone,
          message: message || `Consultation request: ${inquiryType}. Capital: ${capital}. Meeting: ${meetingFormat}.`,
          interest: inquiryType === 'Acquiring' ? 'buy' : inquiryType === 'Listing' ? 'sell' : 'other',
        }),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'No se pudo enviar la consulta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow={t('contactEyebrow')}
        titlePrefix="BEGIN A"
        rotatingWords={[
          'Confidential Dialogue',
          'Private Consultation',
          'Discreet Representation',
          'Direct Partner Meeting',
        ]}
        titleSuffix="WITH VITA"
        description={t('contactHeroDesc')}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
        badgeText="GUARANTEED NON-DISCLOSURE"
        statCard={{
          label: 'DISPATCH RESPONSE TIME',
          value: '< 2 HOURS',
          sub: 'Senior Partner Response Protocol',
        }}
        ctaText="FILL CONSULTATION FORM"
        ctaLink="#inquiry-form"
        ctaSecondaryText="EXPLORE ALL RESIDENCES"
        ctaSecondaryLink="/properties"
        coordinates="YOUR NEXT MOVE STARTS HERE"
      />

      {/* 2. Inquiry Form & Direct Concierge Details */}
      <section id="inquiry-form" className="luxury-section">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 gold-glass-card p-8 sm:p-12 rounded-sm border border-[#B8892F]/45 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
              <div className="pb-6 mb-6 border-b border-[#B8892F]/25">
                <span className="eyebrow">{t('contactFormEyebrow')}</span>
                <h2 className="display text-3xl sm:text-4xl text-white font-normal mt-1">
                  {t('contactFormH2')}
                </h2>
                <p className="text-xs text-white/60 font-light mt-1">
                  {t('contactFormDesc')}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#132C52] border border-[#B8892F] rounded-sm space-y-4">
                  <CheckCircle2 size={36} className="text-[#B8892F] mx-auto" />
                  <h3 className="display text-3xl text-white font-normal">{t('contactSuccessTitle')}</h3>
                  <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                    {t('contactSuccessDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Select Inquiry Intent */}
                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Primary Objective
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'Acquiring', label: 'Acquire' },
                        { id: 'Listing', label: 'List / Sell' },
                        { id: 'Valuation', label: 'Valuation' },
                        { id: 'Off-Market', label: 'Off-Market' },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setInquiryType(item.id)}
                          className={`text-[10px] font-accent font-semibold tracking-wider py-2.5 px-3 rounded-sm border transition-all ${
                            inquiryType === item.id
                              ? 'bg-[#B8892F] text-[#0C1730] border-[#B8892F] shadow-[0_0_15px_rgba(184,137,47,0.4)]'
                              : 'bg-[#132C52] text-white/70 border-white/10 hover:border-[#B8892F]/50'
                          }`}
                        >
                          {item.label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-300 border border-red-400/30 bg-red-950/30 p-3">{error}</p>}

                  {/* Capital & Format Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        {t('contactCapitalLabel')}
                      </label>
                      <select
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        className="luxury-input cursor-pointer"
                      >
                        <option value="$5M–$10M" className="bg-[#132C52]">$5,000,000 – $10,000,000</option>
                        <option value="$10M–$25M" className="bg-[#132C52]">$10,000,000 – $25,000,000</option>
                        <option value="$25M–$50M" className="bg-[#132C52]">$25,000,000 – $50,000,000</option>
                        <option value="$50M+" className="bg-[#132C52]">$50,000,000+ (Ultra-Prime)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        {t('contactMeetingLabel')}
                      </label>
                      <select
                        value={meetingFormat}
                        onChange={(e) => setMeetingFormat(e.target.value)}
                        className="luxury-input cursor-pointer"
                      >
                        <option value="Tampa Bay Private Office" className="bg-[#132C52]">Tampa Bay Private Office</option>
                        <option value="Clearwater Waterfront" className="bg-[#132C52]">Clearwater Waterfront Meeting</option>
                        <option value="Confidential Call" className="bg-[#132C52]">Encrypted Video / Phone</option>
                        <option value="On-Site Residence" className="bg-[#132C52]">On-Site at Private Residence</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        {t('contactNameLabel')}
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="luxury-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        Confidential Email
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@familyoffice.com"
                        className="luxury-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        Direct Phone / WhatsApp
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (305) 000-0000"
                        className="luxury-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-accent font-semibold tracking-[0.2em] text-white/60 uppercase block mb-2">
                      Confidential Notes / Special Instructions
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify yacht berth requirements, architectural preferences, or confidential timing requirements..."
                      className="luxury-input resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-white/50">
                    <ShieldCheck size={14} className="text-[#B8892F]" />
                    <span>Protected by strict mutual non-disclosure obligations.</span>
                  </div>

                  <button type="submit" disabled={submitting} className="luxury-btn-primary w-full !py-3.5 disabled:opacity-60">
                    <Send size={15} />
                    <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT ADVISORY INQUIRY'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Offices Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="eyebrow">TAMPA BAY HEADQUARTERS</span>
                <h3 className="display text-3xl text-white font-normal mt-1">
                  Private Office <i>Suites.</i>
                </h3>
              </div>

              <div className="space-y-6">
                {/* Tampa Bay Office */}
                <div className="gold-glass-card p-6 rounded-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#B8892F]/20">
                    <span className="text-xs font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase">
                      Tampa Bay Private Office
                    </span>
                    <span className="gold-badge text-[8px]">PRIMARY DESK</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#B8892F] shrink-0 mt-0.5" />
                    <span>8900 N ARMENAI AVE, STE 206<br />Tampa, FL 33604</span>
                  </p>
                  <p className="text-xs text-white/80 flex items-center gap-2.5">
                    <Phone size={15} className="text-[#B8892F] shrink-0" />
                    <span>(813) 412-9468</span>
                  </p>
                  <p className="text-xs text-white/60 flex items-center gap-2.5">
                    <Clock size={15} className="text-[#B8892F] shrink-0" />
                    <span>Mon – Sat: 9:00 AM – 7:00 PM EST (By Appointment)</span>
                  </p>
                </div>

                {/* Clearwater Advisory Desk */}
                <div className="gold-glass-card p-6 rounded-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#B8892F]/20">
                    <span className="text-xs font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase">
                      Client Advisory Desk
                    </span>
                    <span className="gold-badge text-[8px]">PRIVATE LOUNGE</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#B8892F] shrink-0 mt-0.5" />
                    <span>8900 N ARMENAI AVE, STE 206<br />Tampa, FL 33604</span>
                  </p>
                  <p className="text-xs text-white/80 flex items-center gap-2.5">
                    <Phone size={15} className="text-[#B8892F] shrink-0" />
                    <span>(813) 412-9468</span>
                  </p>
                  <p className="text-xs text-white/60 flex items-center gap-2.5">
                    <Clock size={15} className="text-[#B8892F] shrink-0" />
                    <span>Private viewings scheduled 7 days a week</span>
                  </p>
                </div>

                {/* Direct Concierge Line */}
                <div className="p-6 bg-gradient-to-r from-[#102548] to-[#173B78] rounded-sm border border-[#B8892F]/60 space-y-2">
                  <div className="flex items-center gap-2 text-[#B8892F] text-xs font-accent font-semibold tracking-widest uppercase">
                    <MessageSquare size={16} />
                    <span>DIRECT CLIENT DESK</span>
                  </div>
                  <p className="text-xs text-white/80">
                    For time-sensitive off-market inquiries or immediate principal-to-principal dialogue:
                  </p>
                  <a
                    href="tel:+18134129468"
                    className="display text-2xl text-[#f0dda6] font-normal block hover:underline"
                  >
                    (813) 412-9468
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
