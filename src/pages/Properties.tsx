import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveUpRight, SlidersHorizontal, X, Bed, Bath, Maximize2, ShieldCheck, PhoneCall, Calendar, MapPin, Sparkles } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { allProperties, slugify, type Property } from '../data/properties';
import { apiRequest } from '../lib/api';
import { resolvePropertyImageUrl, handleImageError } from '../lib/media';



export default function Properties() {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get('location') || 'All';
  const initialType = searchParams.get('type') || 'All';

  const [selectedCity, setSelectedCity] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc'>('featured');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [remoteProperties, setRemoteProperties] = useState<Property[] | null>(null);

  useEffect(() => {
    apiRequest<Array<{ id: number; title: string; titleEs: string; slug: string; price: string; location: string; type: string; beds: number; baths: number; sqft: number; image: string | null; gallery: Array<{ src?: string; type: string }>; descriptionEn: string | null; featuresEn: string[] }>>('/properties')
      .then((properties) => setRemoteProperties(properties.map((property) => ({
        id: String(property.id),
        slug: property.slug,
        name: property.title,
        city: property.location.split(',')[0]?.trim() || property.location,
        neighborhood: property.location.split(',').slice(1).join(',').trim() || 'Tampa Bay',
        priceNum: Number(property.price),
        price: `$${Number(property.price).toLocaleString('en-US')}`,
        type: property.type,
        beds: property.beds,
        baths: property.baths,
        sqft: Number(property.sqft).toLocaleString('en-US'),
        img: resolvePropertyImageUrl(property.image || property.gallery.find((media) => media.src && media.type === 'image')?.src),
        gallery: property.gallery.filter((media) => media.src).map((media) => resolvePropertyImageUrl(media.src)),
        description: property.descriptionEn || 'Private residence represented by VITA Luxury Realty.',
        amenities: property.featuresEn || [],
        tag: property.type.toUpperCase(),
        has360: property.gallery.some(
          (m) =>
            m.type === 'image360' ||
            m.type === 'photo360' ||
            m.type === 'iframe360' ||
            Boolean(m.src && (m.src.includes('/image360s/') || m.src.includes('360')))
        ),
      })))).catch(() => setRemoteProperties(null));
  }, []);

  const filteredProperties = useMemo(() => {
    return (remoteProperties || allProperties)
      .filter((p) => {
        if (selectedCity !== 'All' && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
        if (selectedType !== 'All' && p.type !== selectedType) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
        if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
        return 0;
      });
  }, [selectedCity, selectedType, sortBy, remoteProperties]);

  return (
    <main className="bg-[#0C1730] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="TAMPA BAY LUXURY LISTINGS"
        titlePrefix="FIND YOUR"
        rotatingWords={[
          'Waterfront Home',
          'South Tampa Estate',
          'Clearwater Residence',
          'St. Petersburg Property',
        ]}
        titleSuffix="IN TAMPA BAY"
        description="Browse luxury homes, waterfront estates, and private residences for sale in Tampa, Clearwater, St. Petersburg, and surrounding Tampa Bay communities."
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
        badgeText="VERIFIED PRIVATE ASSETS"
        statCard={{
          label: 'TOTAL ACTIVE VALUATION',
          value: '$114.9M+',
          sub: 'Tampa Bay Listings',
        }}
        ctaText="REQUEST PRIVATE VIEWING"
        ctaLink="/contact"
        ctaSecondaryText="VIEW OFF-MARKET ASSETS"
        ctaSecondaryLink="/buy"
        coordinates="FIND YOUR PLACE IN THE EXTRAORDINARY"
      />

      {/* 2. Interactive Filter & Sorting Strip */}
      <section className="relative z-20 -mt-8 max-w-[1440px] mx-auto px-6">
        <div className="gold-glass-card p-6 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-4">
          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase mr-2 flex items-center gap-1.5">
              <SlidersHorizontal size={13} />
              LOCATION:
            </span>
            {['All', 'Tampa', 'Clearwater', 'St. Petersburg', 'South Tampa', 'Davis Islands', 'Miami Beach', 'Palm Beach'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-sm transition-all ${
                  selectedCity === city
                    ? 'bg-[#B8892F] text-[#0C1730] font-bold shadow-[0_0_15px_rgba(184,137,47,0.4)]'
                    : 'bg-[#132C52]/80 text-white/70 hover:text-white hover:bg-[#132C52] border border-white/10'
                }`}
              >
                {city.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Architecture & Sorting */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="luxury-input !py-2 !text-xs cursor-pointer"
            >
              <option value="All" className="bg-[#132548]">All Architectural Types</option>
              <option value="Waterfront Estate" className="bg-[#132548]">Waterfront Estate</option>
              <option value="Skyline Penthouse" className="bg-[#132548]">Skyline Penthouse</option>
              <option value="Modern Villa" className="bg-[#132548]">Modern Villa</option>
              <option value="Historic Compound" className="bg-[#132548]">Historic Compound</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="luxury-input !py-2 !text-xs cursor-pointer"
            >
              <option value="featured" className="bg-[#132548]">Sort: Curated</option>
              <option value="price-desc" className="bg-[#132548]">Valuation: High to Low</option>
              <option value="price-asc" className="bg-[#132548]">Valuation: Low to High</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Catalog Grid */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <p className="text-xs text-white/60 tracking-wider">
              SHOWING <strong className="text-[#B8892F]">{filteredProperties.length}</strong> EXCLUSIVE RESIDENCES
            </p>
            {(selectedCity !== 'All' || selectedType !== 'All') && (
              <button
                onClick={() => { setSelectedCity('All'); setSelectedType('All'); }}
                className="text-xs text-[#B8892F] hover:underline tracking-wider uppercase font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, idx) => (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group gold-glass-card rounded-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <Link
                  to={`/properties/${property.slug || slugify(property.name)}`}
                  className="relative aspect-[3/2] overflow-hidden bg-[#0F2244]"
                >
                  <img
                    src={property.img}
                    alt={property.name}
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.96] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1730] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 gold-badge text-[8px]">
                    {property.tag}
                  </span>
                  {property.has360 && (
                    <span className="absolute bottom-3 left-4 gold-badge text-[8px] bg-[#0C1730]/90 border border-[#B8892F] shadow-lg flex items-center gap-1 font-bold">
                      <Sparkles size={10} className="text-[#f0dda6]" />
                      360° TOUR
                    </span>
                  )}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0C1730]/80 border border-[#B8892F]/50 flex items-center justify-center text-[#B8892F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <MoveUpRight size={15} />
                  </div>
                </Link>

                {/* Meta */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.22em] font-bold text-[#B8892F] uppercase block">
                      {property.city} Â· {property.neighborhood}
                    </span>
                    <h3
                      className="display text-2xl text-white font-normal mt-1 cursor-pointer hover:text-[#f0dda6] transition-colors"
                    >
                      <Link to={`/properties/${property.slug || slugify(property.name)}`}>{property.name}</Link>
                    </h3>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#B8892F]/15 text-xs text-white/70 text-center">
                    <div>
                      <span className="text-[9px] text-white/40 uppercase block">Beds</span>
                      <strong className="text-white">{property.beds} Beds</strong>
                    </div>
                    <div className="border-x border-white/10">
                      <span className="text-[9px] text-white/40 uppercase block">Baths</span>
                      <strong className="text-white">{property.baths} Baths</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-white/40 uppercase block">Interior</span>
                      <strong className="text-white">{property.sqft} SQ FT</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[9px] text-white/40 uppercase block">Offered At</span>
                      <strong className="display text-2xl text-white font-normal">{property.price}</strong>
                    </div>
                    <Link
                      to={`/properties/${property.slug || slugify(property.name)}`}
                      className="luxury-btn-outline !py-2 !px-4 !text-[9px]"
                    >
                      DETAILS
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20 gold-glass-card rounded-sm">
              <p className="display text-2xl text-white">No properties found matching your current filter.</p>
              <button
                onClick={() => { setSelectedCity('All'); setSelectedType('All'); }}
                className="luxury-btn-primary mt-6"
              >
                <span>RESET ALL FILTERS</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Interactive Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0C1730] border border-[#B8892F]/50 rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-[#132C52] border border-[#B8892F]/40 flex items-center justify-center text-white hover:text-[#B8892F] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <span className="eyebrow">{selectedProperty.tag}</span>
                  <h2 className="display text-3xl sm:text-4xl text-white font-normal mt-1">
                    {selectedProperty.name}
                  </h2>
                  <p className="text-xs text-white/60 tracking-wider flex items-center gap-2 mt-1">
                    <MapPin size={14} className="text-[#B8892F]" />
                    {selectedProperty.neighborhood}, {selectedProperty.city}, Florida
                  </p>
                </div>

                {/* Big Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-[#B8892F]/30">
                  <img
                    src={selectedProperty.img}
                    alt={selectedProperty.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 gold-badge">
                    VALUATION: {selectedProperty.price}
                  </div>
                </div>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 gold-glass-card rounded-sm text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Bed size={18} className="text-[#B8892F]" />
                    <span className="text-sm font-semibold">{selectedProperty.beds} Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-white/10">
                    <Bath size={18} className="text-[#B8892F]" />
                    <span className="text-sm font-semibold">{selectedProperty.baths} Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-white/10">
                    <Maximize2 size={18} className="text-[#B8892F]" />
                    <span className="text-sm font-semibold">{selectedProperty.sqft} Living SQ FT</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-white/10">
                    <ShieldCheck size={18} className="text-[#B8892F]" />
                    <span className="text-sm font-semibold">Deeded Ownership</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase mb-2">
                    ARCHITECTURAL SUMMARY
                  </h4>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Curated Amenities */}
                <div>
                  <h4 className="text-xs font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase mb-3">
                    RESIDENCE AMENITIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1.5 rounded-sm bg-[#132C52] border border-[#B8892F]/30 text-xs text-white/80"
                      >
                        âœ“ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-white/50 tracking-widest uppercase block">Offered At</span>
                    <strong className="display text-3xl text-[#f0dda6] font-normal">{selectedProperty.price}</strong>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/contact?property=${encodeURIComponent(selectedProperty.name)}`}
                      className="luxury-btn-primary"
                    >
                      <Calendar size={14} />
                      <span>SCHEDULE PRIVATE TOUR</span>
                    </Link>
                    <a
                      href="tel:+18134129468"
                      className="luxury-btn-outline flex items-center gap-2"
                    >
                      <PhoneCall size={14} />
                      <span>CALL ADVISOR</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

