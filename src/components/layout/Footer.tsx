import { ArrowRight, Mail, Phone, MapPin, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoldOrnament from './GoldOrnament';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1220] border-t border-[#B8892F]/25 text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#B8892F]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#24487A]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* VIP Private Market CTA Strip */}
      <div className="border-b border-[#B8892F]/15 bg-[#0F2340] py-12 px-6 lg:px-12 relative z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-xl">
            <span className="eyebrow">PRIVATE MARKET DISPATCH</span>
            <h3 className="display text-2xl lg:text-3xl mt-2 text-white font-normal">
              Receive <em className="text-gold-gradient not-italic sm:italic">confidential</em> off-market intelligence &amp; curated Florida estates.
            </h3>
          </div>
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <Link
              to="/contact"
              className="luxury-btn-primary !py-3.5 !px-8 !text-xs flex items-center justify-center gap-2.5 group shrink-0"
            >
              <span>CONTACT ADVISORY</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6 relative">
            <GoldOrnament
              variant="frond"
              className="hidden lg:block absolute -top-8 -left-6 w-12 h-24 -rotate-[12deg] -z-0 opacity-90"
            />
            <Link to="/" className="relative inline-block">
              <img src="/logo.png" alt="VITA Luxury Realty" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              Tampa Bay’s luxury real estate advisory. Curating singular architectural masterpieces, waterfront sanctuaries, and confidential off-market acquisitions with uncompromising distinction.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#B8892F]">
                <ShieldCheck size={16} />
                <span>Strict Confidentiality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#B8892F]">
                <Award size={16} />
                <span>$2.4B+ Florida Portfolio</span>
              </div>
            </div>
          </div>

          {/* Nav Col */}
          <div>
            <h4 className="font-accent text-[11px] font-semibold tracking-[0.28em] text-[#B8892F] uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs tracking-wider text-white/70">
              <li>
                <Link to="/properties" className="hover:text-[#B8892F] transition-colors">THE COLLECTION</Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-[#B8892F] transition-colors">PRIVATE ACQUISITION</Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#B8892F] transition-colors">VALUATION & LISTING</Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-[#B8892F] transition-colors">PRIVATE ADVISORS</Link>
              </li>
              <li>
                <Link to="/join-team" className="hover:text-[#B8892F] transition-colors">JOIN THE VITA TEAM</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B8892F] transition-colors">OUR HERITAGE</Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#B8892F] transition-colors">MARKET INTELLIGENCE</Link>
              </li>
            </ul>
          </div>

          {/* Markets Col */}
          <div>
            <h4 className="font-accent text-[11px] font-semibold tracking-[0.28em] text-[#B8892F] uppercase mb-6">
              Prime Destinations
            </h4>
            <ul className="space-y-3.5 text-xs tracking-wider text-white/70">
              <li>
                <Link to="/properties?location=Tampa" className="hover:text-[#B8892F] transition-colors">Tampa & South Tampa</Link>
              </li>
              <li>
                <Link to="/properties?location=Clearwater" className="hover:text-[#B8892F] transition-colors">Clearwater Beach</Link>
              </li>
              <li>
                <Link to="/properties?location=St.%20Petersburg" className="hover:text-[#B8892F] transition-colors">St. Petersburg</Link>
              </li>
              <li>
                <Link to="/properties?location=Coral%20Gables" className="hover:text-[#B8892F] transition-colors">Coral Gables</Link>
              </li>
              <li>
                <Link to="/properties?location=Davis%20Islands" className="hover:text-[#B8892F] transition-colors">Davis Islands</Link>
              </li>
              <li>
                <Link to="/properties?location=Tampa%20Bay" className="hover:text-[#B8892F] transition-colors">Tampa Bay Waterfront</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-accent text-[11px] font-semibold tracking-[0.28em] text-[#B8892F] uppercase mb-6">
              Private Offices
            </h4>
            <div className="space-y-4 text-xs text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#B8892F] mt-0.5 shrink-0" />
                <span>8900 N ARMENAI AVE, STE 206<br />Tampa, FL 33604</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#B8892F] shrink-0" />
                <a href="tel:+18134129468" className="hover:text-[#B8892F] transition-colors">(813) 412-9468</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#B8892F] shrink-0" />
                <a href="mailto:yaixy@vitaluxuryrealty.com" className="hover:text-[#B8892F] transition-colors">yaixy@vitaluxuryrealty.com</a>
              </div>
              <div className="pt-2">
                <Link to="/contact" className="luxury-btn-outline !py-2.5 !px-4 !text-[9px] w-full text-center">
                  REQUEST CONSULTATION
                </Link>
                <Link to="/join-team" className="luxury-btn-primary !py-2.5 !px-4 !text-[9px] w-full text-center mt-2">
                  JOIN THE TEAM
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

      {/* Destinations marquee band */}
      <div className="marquee-wrap relative z-10 overflow-hidden border-t border-[#B8892F]/15 bg-[#05070C] py-3">
        <div className="marquee-track">
          {[...Array(2)].flatMap(() => [
            'TAMPA BAY', 'DOWNTOWN TAMPA', 'SOUTH TAMPA', 'YBOR CITY', 'CHANNELSIDE', 'HYDE PARK',
            'DAVIS ISLANDS', 'HARBOUR ISLAND', 'TAMPA HEIGHTS', 'SEMINOLE HEIGHTS', 'PALMA CEIA',
            'ST. PETERSBURG', 'DOWNTOWN ST. PETE', 'CLEARWATER', 'CLEARWATER BEACH', 'SAFETY HARBOR',
            'TREASURE ISLAND', 'MADEIRA BEACH', 'LARGO', 'APOLLO BEACH', 'RIVERVIEW', 'WESLEY CHAPEL',
          ]).map((d, i) => (
            <span key={i} className="marquee-item text-[0.68rem] text-white/35">
              <span className="dot" />
              {d}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
