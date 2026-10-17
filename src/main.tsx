import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './index.css';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter><App /></BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);

