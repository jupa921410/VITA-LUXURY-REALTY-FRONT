import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Agents from './pages/Agents';
import About from './pages/About';
import Contact from './pages/Contact';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import './App.css';
import PropertyDetail from './pages/PropertyDetail';
import JoinTeam from './pages/JoinTeam';
import SeoManager from './components/SeoManager';
import NotFound from './pages/NotFound';

// Automatically scrolls to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Gold scroll progress tracker
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}

// Adds AOS-style reveals to content rendered by every route.
function ScrollRevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const revealableElements = document.querySelectorAll<HTMLElement>(
      'main > section:not(.interior-hero), main article, main .gold-glass-card:not([data-aos])',
    );

    revealableElements.forEach((element, index) => {
      if (element.dataset.aos) return;
      element.dataset.aos = 'fade-up';
      const delay = Math.min((index % 4) * 80, 240);
      element.dataset.aosDelay = String(delay);
      element.style.setProperty('--aos-delay', String(delay));
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealableElements.forEach((element) => element.classList.add('aos-animate'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    revealableElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

// Soft gold-ring cursor that trails the pointer and blooms open over any
// clickable / interactive surface. Desktop-only (fine pointer), and fully
// disabled under prefers-reduced-motion.
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion || !ref.current) return;

    const el = ref.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;

    const move = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const hovered = (e.target as HTMLElement)?.closest?.(
        'a, button, .luxury-btn-primary, .luxury-btn-outline, .gold-glass-card, input, textarea, [role="button"]',
      );
      el.classList.toggle('is-active', Boolean(hovered));
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

// Gives every signature button a subtle magnetic pull toward the cursor
// when it passes nearby — applies globally, no per-button wiring needed.
function MagneticButtons() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const RADIUS = 90;
    const STRENGTH = 0.35;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const apply = () => {
      const buttons = document.querySelectorAll<HTMLElement>(
        '.luxury-btn-primary, .luxury-btn-outline',
      );
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = pointerX - cx;
        const dy = pointerY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS + rect.width / 2) {
          btn.style.transform = `translate(${dx * STRENGTH * 0.25}px, ${dy * STRENGTH * 0.25}px)`;
        } else if (btn.style.transform) {
          btn.style.transform = '';
        }
      });
      raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(apply);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <ScrollProgress />
      <ScrollRevealObserver />
      <CursorGlow />
      <MagneticButtons />
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join-team" element={<JoinTeam />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
