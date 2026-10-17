import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, PhoneCall, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, type TranslationKey } from '../../context/LanguageContext';

const links = [
  { key: 'home', href: '/' },
  { key: 'collection', href: '/properties' },
  { key: 'buy', href: '/buy' },
  { key: 'sell', href: '/sell' },
  { key: 'advisors', href: '/agents' },
  { key: 'heritage', href: '/about' },
  { key: 'insights', href: '/insights' },
  { key: 'contact', href: '/contact' },
] satisfies Array<{ key: TranslationKey; href: string }>;

const destinations = [
  'TAMPA BAY', 'DOWNTOWN TAMPA', 'SOUTH TAMPA', 'YBOR CITY', 'CHANNELSIDE', 'HYDE PARK',
  'DAVIS ISLANDS', 'HARBOUR ISLAND', 'TAMPA HEIGHTS', 'SEMINOLE HEIGHTS', 'PALMA CEIA',
  'ST. PETERSBURG', 'DOWNTOWN ST. PETE', 'CLEARWATER', 'CLEARWATER BEACH', 'SAFETY HARBOR',
  'TREASURE ISLAND', 'MADEIRA BEACH', 'LARGO', 'APOLLO BEACH', 'RIVERVIEW', 'WESLEY CHAPEL',
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Slim editorial ticker — hides once scrolled or menu open, to keep the header lean */}
      <div
        className={`marquee-wrap overflow-hidden border-b border-[#B8892F]/15 bg-[#05070C] transition-all duration-500 ${
          scrolled || open ? 'h-0 opacity-0' : 'h-8 opacity-100'
        }`}
      >
        <div className="marquee-track py-2">
          {[...destinations, ...destinations].map((d, i) => (
            <span key={i} className="marquee-item">
              <span className="dot" />
              {d}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled || open
            ? 'bg-[#05070C]/92 border-b border-[#B8892F]/25 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3.5'
            : 'bg-[#05070C]/45 border-b border-white/5 py-5'
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1560px] items-center justify-between px-6 lg:px-12"
          aria-label="Main navigation"
        >
          <Link to="/" className="relative z-20 flex items-center gap-3 group" aria-label="VITA Luxury Realty" onClick={() => setOpen(false)}>
            <img
              src="/logo.png"
              alt="VITA Luxury Realty"
              className="h-11 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <nav className="flex items-center gap-4 lg:gap-5" aria-label="Primary navigation">
              {links.map(({ key, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={`font-accent text-[9px] tracking-[0.12em] uppercase transition-colors ${location.pathname === href ? 'text-[#E8C878]' : 'text-white/65 hover:text-white'}`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/join-team" className="hidden lg:inline-flex luxury-btn-outline !py-2 !px-3 !text-[9px] items-center gap-1.5">
              JOIN THE TEAM
            </Link>
            <a
              href="tel:+18134129468"
              className="hidden lg:flex items-center gap-2 text-xs text-white/70 hover:text-[#E8C878] transition-colors"
              title="Call Concierge"
            >
              <PhoneCall size={14} className="text-[#B8892F]" />
              <span className="font-accent tracking-widest text-[10px]">(813) 412-9468</span>
            </a>

            <div className="flex items-center border border-[#B8892F]/35 bg-[#0F2340]/45 p-0.5" aria-label="Language selector">
              <button type="button" onClick={() => setLanguage('en')} className={`px-2 py-1 font-accent text-[9px] tracking-widest transition-colors ${language === 'en' ? 'bg-[#B8892F] text-[#05070C]' : 'text-white/60 hover:text-white'}`}>EN</button>
              <button type="button" onClick={() => setLanguage('es')} className={`px-2 py-1 font-accent text-[9px] tracking-widest transition-colors ${language === 'es' ? 'bg-[#B8892F] text-[#05070C]' : 'text-white/60 hover:text-white'}`}>ES</button>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="group relative z-20 flex items-center gap-3 px-4 py-2.5 text-white border border-[#B8892F]/40 bg-[#0F2340]/50 backdrop-blur-md clip-path-none md:hidden"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={17} className="text-[#E8C878]" /> : <Menu size={17} />}
              <span className="font-accent text-[10px] tracking-[0.28em]">{open ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen Editorial Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-40 bg-[#05070C]"
          >
            <div className="absolute inset-0 arch-grid-bg opacity-30 pointer-events-none" />
            <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#B8892F]/8 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#24487A]/25 blur-[150px] pointer-events-none" />

            <div className="relative z-10 h-full mx-auto max-w-[1560px] px-6 lg:px-12 pt-32 pb-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 overflow-y-auto">
              <div>
                <span className="eyebrow block mb-8">{t('navigate')}</span>
                <div>
                  {links.map(({ key, href }, i) => {
                    const isActive = location.pathname === href;
                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.055, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-white/10 group"
                      >
                        <Link
                          to={href}
                          onClick={() => setOpen(false)}
                          className="flex items-baseline gap-4 sm:gap-7 py-3.5 sm:py-4"
                        >
                          <span className="font-accent text-[10px] sm:text-xs text-[#B8892F]/70 w-6">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`display italic text-[2.1rem] sm:text-5xl lg:text-6xl font-normal transition-colors duration-300 ${
                              isActive ? 'text-gold-gradient' : 'text-white/90 group-hover:text-[#E8C878]'
                            }`}
                          >
                            {t(key)}
                          </span>
                          <ArrowUpRight
                            size={22}
                            className="ml-auto text-[#B8892F] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col justify-between gap-10 lg:pl-10 lg:border-l lg:border-[#B8892F]/15"
              >
                <div className="space-y-6">
                  <span className="eyebrow block">{t('privateOffice')}</span>
                  <div className="space-y-4 text-sm text-white/65">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-[#B8892F] mt-0.5 shrink-0" />
                      <span>8900 N ARMENAI AVE, STE 206<br />Tampa, FL 33604</span>
                    </div>
                    <a href="tel:+18134129468" className="flex items-center gap-3 hover:text-[#E8C878] transition-colors">
                      <PhoneCall size={15} className="text-[#B8892F] shrink-0" />
                      (813) 412-9468
                    </a>
                    <a href="mailto:yaixy@vitaluxuryrealty.com" className="flex items-center gap-3 hover:text-[#E8C878] transition-colors">
                      <Mail size={15} className="text-[#B8892F] shrink-0" />
                      yaixy@vitaluxuryrealty.com
                    </a>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="font-accent text-[10px] tracking-[0.24em] text-white/40">
                    TAMPA · CLEARWATER · ST. PETERSBURG · TAMPA BAY
                  </p>
                  <Link to="/contact" onClick={() => setOpen(false)} className="luxury-btn-primary w-full justify-center">
                    <span>{t('consultation')}</span>
                  </Link>
                  <Link to="/join-team" onClick={() => setOpen(false)} className="luxury-btn-outline w-full justify-center">
                    JOIN THE TEAM
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
