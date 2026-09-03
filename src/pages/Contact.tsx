import { useState, type FormEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefilledProp = searchParams.get('property') || '';
  const prefilledAdvisor = searchParams.get('advisor') || '';

  const [inquiryType, setInquiryType] = useState('Acquiring');
  const [capital, setCapital] = useState('$10M–$25M');
  const [meetingFormat, setMeetingFormat] = useState('Miami Office Suite');
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

  useEffect(() => {
    document.title = 'Private Consultation | VITA Luxury Realty';
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 6000);
  };

  return (
    <main className="bg-[#040B16] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="PRIVATE CLIENT RELATIONS"
        titlePrefix="BEGIN A"
        rotatingWords={[
          'CONFIDENTIAL DIALOGUE',
          'PRIVATE CONSULTATION',
          'DISCREET REPRESENTATION',
          'DIRECT PARTNER MEETING',
        ]}
        titleSuffix="WITH VITA"
        description="Connect directly with our Managing Partners to discuss acquisitions, property positioning, or off-market opportunities across Florida under strict non-disclosure."
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
      />

      {/* 2. Inquiry Form & Direct Concierge Details */}
      <section id="inquiry-form" className="luxury-section">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 gold-glass-card p-8 sm:p-12 rounded-sm border border-[#D4AF37]/45 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
              <div className="pb-6 mb-6 border-b border-[#D4AF37]/25">
                <span className="eyebrow">CONFIDENTIAL INQUIRY</span>
                <h2 className="display text-3xl sm:text-4xl text-white font-normal mt-1">
                  Schedule Private <i>Advisory.</i>
                </h2>
                <p className="text-xs text-white/60 font-light mt-1">
                  All communications are bound by mutual attorney-client standard confidentiality.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#071936] border border-[#D4AF37] rounded-sm space-y-4">
                  <CheckCircle2 size={36} className="text-[#D4AF37] mx-auto" />
                  <h3 className="display text-3xl text-white font-normal">Transmission Confirmed</h3>
                  <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                    Thank you, {name || 'Client'}. Your confidential inquiry has been transmitted directly to our Managing Partner desk. A senior fiduciary will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Select Inquiry Intent */}
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
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
                          className={`text-[10px] font-bold tracking-wider py-2.5 px-3 rounded-sm border transition-all ${
                            inquiryType === item.id
                              ? 'bg-[#D4AF37] text-[#040B16] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                              : 'bg-[#071936] text-white/70 border-white/10 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {item.label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capital & Format Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        Target Capital Allocation
                      </label>
                      <select
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        className="luxury-input cursor-pointer"
                      >
                        <option value="$5M–$10M" className="bg-[#071936]">$5,000,000 – $10,000,000</option>
                        <option value="$10M–$25M" className="bg-[#071936]">$10,000,000 – $25,000,000</option>
                        <option value="$25M–$50M" className="bg-[#071936]">$25,000,000 – $50,000,000</option>
                        <option value="$50M+" className="bg-[#071936]">$50,000,000+ (Ultra-Prime)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        Preferred Meeting Venue
                      </label>
                      <select
                        value={meetingFormat}
                        onChange={(e) => setMeetingFormat(e.target.value)}
                        className="luxury-input cursor-pointer"
                      >
                        <option value="Miami Office Suite" className="bg-[#071936]">Miami Brickell Suite</option>
                        <option value="Palm Beach Suite" className="bg-[#071936]">Palm Beach Private Lounge</option>
                        <option value="Confidential Call" className="bg-[#071936]">Encrypted Video / Phone</option>
                        <option value="On-Site Residence" className="bg-[#071936]">On-Site at Private Residence</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
                        Client / Principal Name
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
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
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
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
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
                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase block mb-2">
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
                    <ShieldCheck size={14} className="text-[#D4AF37]" />
                    <span>Protected by strict mutual non-disclosure obligations.</span>
                  </div>

                  <button type="submit" className="luxury-btn-primary w-full !py-3.5">
                    <Send size={15} />
                    <span>TRANSMIT ADVISORY INQUIRY</span>
                  </button>
                </form>
              )}
            </div>

            {/* Offices Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="eyebrow">FLORIDA HEADQUARTERS</span>
                <h3 className="display text-3xl text-white font-normal mt-1">
                  Private Office <i>Suites.</i>
                </h3>
              </div>

              <div className="space-y-6">
                {/* Miami Office */}
                <div className="gold-glass-card p-6 rounded-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                      Miami Flagship Office
                    </span>
                    <span className="gold-badge text-[8px]">PRIMARY DESK</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>1000 Brickell Avenue, Suite 1400<br />Miami, FL 33131</span>
                  </p>
                  <p className="text-xs text-white/80 flex items-center gap-2.5">
                    <Phone size={15} className="text-[#D4AF37] shrink-0" />
                    <span>+1 (305) 555-8482</span>
                  </p>
                  <p className="text-xs text-white/60 flex items-center gap-2.5">
                    <Clock size={15} className="text-[#D4AF37] shrink-0" />
                    <span>Mon – Sat: 9:00 AM – 7:00 PM EST (By Appointment)</span>
                  </p>
                </div>

                {/* Palm Beach Office */}
                <div className="gold-glass-card p-6 rounded-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                      Palm Beach Advisory Salon
                    </span>
                    <span className="gold-badge text-[8px]">PRIVATE LOUNGE</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>250 Worth Avenue, Suite 3B<br />Palm Beach, FL 33480</span>
                  </p>
                  <p className="text-xs text-white/80 flex items-center gap-2.5">
                    <Phone size={15} className="text-[#D4AF37] shrink-0" />
                    <span>+1 (561) 555-8488</span>
                  </p>
                  <p className="text-xs text-white/60 flex items-center gap-2.5">
                    <Clock size={15} className="text-[#D4AF37] shrink-0" />
                    <span>Private viewings scheduled 7 days a week</span>
                  </p>
                </div>

                {/* Direct Concierge Line */}
                <div className="p-6 bg-gradient-to-r from-[#061833] to-[#0b2b5c] rounded-sm border border-[#D4AF37]/60 space-y-2">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
                    <MessageSquare size={16} />
                    <span>DIRECT CLIENT DESK</span>
                  </div>
                  <p className="text-xs text-white/80">
                    For time-sensitive off-market inquiries or immediate principal-to-principal dialogue:
                  </p>
                  <a
                    href="tel:+13055558482"
                    className="display text-2xl text-[#fff1b8] font-normal block hover:underline"
                  >
                    +1 (305) 555-VITA
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
