import { ArrowRight, Mail, Phone, MapPin, ShieldCheck, Award } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#020710] border-t border-[#D4AF37]/25 text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#143d75]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* VIP Private Market Newsletter Strip */}
      <div className="border-b border-[#D4AF37]/15 bg-gradient-to-r from-[#040d1c] via-[#081b38] to-[#040d1c] py-12 px-6 lg:px-12 relative z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-xl">
            <span className="eyebrow">PRIVATE MARKET DISPATCH</span>
            <h3 className="display text-2xl lg:text-3xl mt-2 text-white font-normal">
              Receive confidential off-market intelligence & curated Florida estates.
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="w-full lg:w-auto flex-1 max-w-md">
            <div className="relative flex items-center border border-[#D4AF37]/40 bg-[#040c1a]/90 backdrop-blur-md px-4 py-2 focus-within:border-[#D4AF37] focus-within:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all">
              <Mail size={16} className="text-[#D4AF37] mr-3 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your confidential email..."
                className="w-full bg-transparent text-sm text-white placeholder-white/35 outline-none py-1.5"
              />
              <button
                type="submit"
                className="luxury-btn-primary !py-2 !px-4 !text-[10px] shrink-0 ml-2"
              >
                <span>JOIN VIP</span>
                <ArrowRight size={12} />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-[#D4AF37] mt-2 tracking-wider animate-fadeIn">
                ✓ Thank you. You have been added to our confidential client dispatch.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img src={logo} alt="VITA Luxury Realty" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              Florida’s premier luxury real estate advisory. Curating singular architectural masterpieces, waterfront sanctuaries, and confidential off-market acquisitions with uncompromising distinction.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                <ShieldCheck size={16} />
                <span>Strict Confidentiality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                <Award size={16} />
                <span>$2.4B+ Florida Portfolio</span>
              </div>
            </div>
          </div>

          {/* Nav Col */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs tracking-wider text-white/70">
              <li>
                <Link to="/properties" className="hover:text-[#D4AF37] transition-colors">THE COLLECTION</Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-[#D4AF37] transition-colors">PRIVATE ACQUISITION</Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#D4AF37] transition-colors">VALUATION & LISTING</Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-[#D4AF37] transition-colors">PRIVATE ADVISORS</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors">OUR HERITAGE</Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#D4AF37] transition-colors">MARKET INTELLIGENCE</Link>
              </li>
            </ul>
          </div>

          {/* Markets Col */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-6">
              Prime Destinations
            </h4>
            <ul className="space-y-3.5 text-xs tracking-wider text-white/70">
              <li>
                <Link to="/properties?location=Miami%20Beach" className="hover:text-[#D4AF37] transition-colors">Miami Beach</Link>
              </li>
              <li>
                <Link to="/properties?location=Palm%20Beach" className="hover:text-[#D4AF37] transition-colors">Palm Beach</Link>
              </li>
              <li>
                <Link to="/properties?location=Brickell" className="hover:text-[#D4AF37] transition-colors">Brickell & Downtown</Link>
              </li>
              <li>
                <Link to="/properties?location=Coral%20Gables" className="hover:text-[#D4AF37] transition-colors">Coral Gables</Link>
              </li>
              <li>
                <Link to="/properties?location=Naples" className="hover:text-[#D4AF37] transition-colors">Naples & Sarasota</Link>
              </li>
              <li>
                <Link to="/properties?location=Tampa%20Bay" className="hover:text-[#D4AF37] transition-colors">Tampa Bay Waterfront</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-6">
              Private Offices
            </h4>
            <div className="space-y-4 text-xs text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span>1000 Brickell Ave, Suite 1400<br />Miami, FL 33131</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#D4AF37] shrink-0" />
                <a href="tel:+13055558482" className="hover:text-[#D4AF37] transition-colors">+1 (305) 555-VITA</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:concierge@vitaluxuryrealty.com" className="hover:text-[#D4AF37] transition-colors">concierge@vitaluxuryrealty.com</a>
              </div>
              <div className="pt-2">
                <Link to="/contact" className="luxury-btn-outline !py-2.5 !px-4 !text-[9px] w-full text-center">
                  REQUEST CONSULTATION
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40 tracking-wider">
          <p>© {new Date().getFullYear()} VITA LUXURY REALTY LLC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/70 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span>·</span>
            <span className="hover:text-white/70 transition-colors cursor-pointer">TERMS OF SERVICE</span>
            <span>·</span>
            <span className="hover:text-white/70 transition-colors cursor-pointer">EQUAL HOUSING OPPORTUNITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
