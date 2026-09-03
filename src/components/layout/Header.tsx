import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const links = [
  { label: 'Properties', href: '/properties' },
  { label: 'Buy', href: '/buy' },
  { label: 'Sell', href: '/sell' },
  { label: 'Agents', href: '/agents' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-[#040b16]/90 border-b border-[#D4AF37]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-gradient-to-b from-[#040b16]/80 via-[#040b16]/40 to-transparent border-b border-white/5 py-5'
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1500px] items-center justify-between px-6 lg:px-12"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link to="/" className="relative z-20 flex items-center gap-3 group" aria-label="VITA Luxury Realty">
          <img
            src={logo}
            alt="VITA Luxury Realty"
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {links.map(({ label, href }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`relative text-[11px] font-semibold tracking-[0.2em] transition-all duration-300 py-1 ${
                  isActive ? 'text-[#D4AF37]' : 'text-white/80 hover:text-[#D4AF37]'
                }`}
              >
                {label.toUpperCase()}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Action Button */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:+13055558482"
            className="text-xs text-white/70 hover:text-[#D4AF37] flex items-center gap-2 transition-colors"
            title="Call Concierge"
          >
            <PhoneCall size={14} className="text-[#D4AF37]" />
            <span className="tracking-widest text-[10px] font-medium">+1 (305) 555-VITA</span>
          </a>
          <Link
            to="/contact"
            className="luxury-btn-primary !py-2.5 !px-5 !text-[9px]"
          >
            <span>PRIVATE CONSULTATION</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-20 grid size-10 place-items-center text-white border border-[#D4AF37]/40 rounded-sm bg-[#07172e]/60 backdrop-blur-md lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} className="text-[#D4AF37]" /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-10 flex flex-col justify-between bg-[#040b16] px-8 pt-28 pb-12 overflow-y-auto"
          >
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <span className="eyebrow">NAVIGATION</span>
              <div className="space-y-4">
                {links.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={href}
                      onClick={() => setOpen(false)}
                      className="display block border-b border-white/10 py-3 text-3xl font-light text-white hover:text-[#D4AF37] transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-[#D4AF37]/25 space-y-4">
              <p className="text-xs text-white/50 tracking-wider">MIAMI · PALB BEACH · TAMPA BAY · NAPLES</p>
              <Link
                to="/contact"
                className="luxury-btn-primary w-full text-center block"
              >
                REQUEST PRIVATE CONSULTATION
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
