import { Link } from 'react-router-dom';

export default function NotFound() {
  return <main className="bg-[#0C1730] text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
    <p className="eyebrow mb-2">404</p>
    <h1 className="display text-4xl mb-4">Page Not Found</h1>
    <p className="text-white/70 mb-8">The page you requested is unavailable. Explore our property collection or contact our team.</p>
    <Link to="/properties" className="luxury-btn-primary">Explore properties</Link>
    <Link to="/contact" className="mt-6 underline">Contact VITA Luxury Realty</Link>
  </main>;
}
