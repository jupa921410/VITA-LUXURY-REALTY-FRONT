import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveUpRight, SlidersHorizontal, X, Bed, Bath, Maximize2, ShieldCheck, PhoneCall, Calendar, MapPin } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

interface Property {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  priceNum: number;
  price: string;
  type: string;
  beds: number;
  baths: number;
  sqft: string;
  img: string;
  gallery: string[];
  description: string;
  amenities: string[];
  tag: string;
}

const allProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Villa Sole di Mare',
    city: 'Miami Beach',
    neighborhood: 'Star Island',
    priceNum: 18950000,
    price: '$18,950,000',
    type: 'Waterfront Estate',
    beds: 6,
    baths: 8,
    sqft: '8,450',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'An architectural tour-de-force poised on the most exclusive private island in Biscayne Bay. Features 120 feet of prime deep-water frontage, private mega-yacht dock, infinity pool, and bespoke Italian craftsmanship throughout.',
    amenities: ['Private Yacht Dock', 'Wine Cellar (1,200 bottles)', 'Infinity Pool', 'Smart Home Automation', 'Staff Quarters'],
    tag: 'STAR ISLAND EXCLUSIVE'
  },
  {
    id: 'prop-2',
    name: 'The Breakers Ocean Estate',
    city: 'Palm Beach',
    neighborhood: 'South Ocean Blvd',
    priceNum: 24500000,
    price: '$24,500,000',
    type: 'Historic Compound',
    beds: 7,
    baths: 9,
    sqft: '11,200',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Mizner-inspired timeless Mediterranean compound featuring direct deeded ocean access, manicured coral stone loggias, tennis pavilion, and guest estate on lush tropical grounds.',
    amenities: ['Deeded Oceanfront', 'Championship Tennis Court', 'Separate Guest Villa', 'Coral Stone Loggias', 'Sub-Zero & La Cornue Kitchen'],
    tag: 'PALM BEACH COMPOUND'
  },
  {
    id: 'prop-3',
    name: 'Aura Crown Penthouse',
    city: 'Brickell',
    neighborhood: 'Brickell Key',
    priceNum: 14200000,
    price: '$14,200,000',
    type: 'Skyline Penthouse',
    beds: 4,
    baths: 6,
    sqft: '6,100',
    img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Occupying the entire 58th and 59th levels with 360-degree panoramic views of Biscayne Bay and the Miami skyline. Private rooftop glass-bottom plunge pool and private high-speed biometric elevator.',
    amenities: ['Private Rooftop Pool', 'Biometric Elevator', '360° Panoramic Vistas', 'Custom Poliform Millwork', '4 Valet Spaces'],
    tag: 'DUPLEX PENTHOUSE'
  },
  {
    id: 'prop-4',
    name: 'Palazzo di Palma',
    city: 'Coral Gables',
    neighborhood: 'Snapper Creek Lakes',
    priceNum: 11800000,
    price: '$11,800,000',
    type: 'Modern Villa',
    beds: 5,
    baths: 6,
    sqft: '7,800',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'A contemporary sanctuary enveloped by mature banyan trees and serene waterways. Designed by renowned modernist architects with glass curtain walls and seamless indoor-outdoor living pavilions.',
    amenities: ['Gated 24h Security', 'Private Marina Basin', 'Designer Fire Pits', 'Zero-Edge Reflection Pool', 'Crestron Lighting'],
    tag: 'PRIVATE ENCLAVE'
  },
  {
    id: 'prop-5',
    name: 'Port Royal Sanctuary',
    city: 'Naples',
    neighborhood: 'Port Royal Club',
    priceNum: 29000000,
    price: '$29,000,000',
    type: 'Waterfront Estate',
    beds: 6,
    baths: 8,
    sqft: '9,950',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'One of the crown jewels of Port Royal with cut-through yacht passage to the Gulf of Mexico. Ultra-luxe master suite, private wellness spa, and deeded membership eligibility.',
    amenities: ['Gulf Yacht Access', 'Wellness Spa & Sauna', 'Outdoor Kitchen & Cabana', 'Elevated Helipad Access', 'Air-Conditioned 6-Car Garage'],
    tag: 'PORT ROYAL TROPHY'
  },
  {
    id: 'prop-6',
    name: 'The Venetian Isle Retreat',
    city: 'Miami Beach',
    neighborhood: 'Venetian Islands',
    priceNum: 16500000,
    price: '$16,500,000',
    type: 'Modern Villa',
    beds: 5,
    baths: 6,
    sqft: '6,400',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Showcasing spectacular Miami sunset views across Biscayne Bay. Features warm organic limestone, ipe wood decking, rooftop terrace, and private dock equipped for two tenders.',
    amenities: ['Sunset Facing Vistas', 'Rooftop Lounge', 'Limestone & Ipe Finishes', 'Double Tender Dock', 'Chef Prep Kitchen'],
    tag: 'VENETIAN ISLANDS'
  }
];

export default function Properties() {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get('location') || 'All';
  const initialType = searchParams.get('type') || 'All';

  const [selectedCity, setSelectedCity] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc'>('featured');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    document.title = 'The Collection | VITA Luxury Realty';
  }, []);

  const filteredProperties = useMemo(() => {
    return allProperties
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
  }, [selectedCity, selectedType, sortBy]);

  return (
    <main className="bg-[#040B16] text-white">
      {/* 1. Page Hero with Rotating Titles & Scroll Reaction */}
      <PageHero
        eyebrow="EXCLUSIVE FLORIDA PORTFOLIO"
        titlePrefix="CURATING"
        rotatingWords={[
          'WATERFRONT SANCTUARIES',
          'SKYLINE PENTHOUSES',
          'PRIVATE ISLAND COMPOUNDS',
          'ARCHITECTURAL ICONS',
        ]}
        titleSuffix="IN FLORIDA"
        description="Explore an exceptional collection of private estates, historic enclaves, and premier waterfront residences across Florida's prime destinations."
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
        badgeText="VERIFIED PRIVATE ASSETS"
        statCard={{
          label: 'TOTAL ACTIVE VALUATION',
          value: '$114.9M+',
          sub: 'Florida Portfolio',
        }}
        ctaText="REQUEST PRIVATE VIEWING"
        ctaLink="/contact"
        ctaSecondaryText="VIEW OFF-MARKET ASSETS"
        ctaSecondaryLink="/buy"
      />

      {/* 2. Interactive Filter & Sorting Strip */}
      <section className="relative z-20 -mt-8 max-w-[1440px] mx-auto px-6">
        <div className="gold-glass-card p-6 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-4">
          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mr-2 flex items-center gap-1.5">
              <SlidersHorizontal size={13} />
              LOCATION:
            </span>
            {['All', 'Miami Beach', 'Palm Beach', 'Brickell', 'Coral Gables', 'Naples'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-sm transition-all ${
                  selectedCity === city
                    ? 'bg-[#D4AF37] text-[#040B16] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-[#071936]/80 text-white/70 hover:text-white hover:bg-[#071936] border border-white/10'
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
              <option value="All" className="bg-[#07172e]">All Architectural Types</option>
              <option value="Waterfront Estate" className="bg-[#07172e]">Waterfront Estate</option>
              <option value="Skyline Penthouse" className="bg-[#07172e]">Skyline Penthouse</option>
              <option value="Modern Villa" className="bg-[#07172e]">Modern Villa</option>
              <option value="Historic Compound" className="bg-[#07172e]">Historic Compound</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="luxury-input !py-2 !text-xs cursor-pointer"
            >
              <option value="featured" className="bg-[#07172e]">Sort: Curated</option>
              <option value="price-desc" className="bg-[#07172e]">Valuation: High to Low</option>
              <option value="price-asc" className="bg-[#07172e]">Valuation: Low to High</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Catalog Grid */}
      <section className="luxury-section">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <p className="text-xs text-white/60 tracking-wider">
              SHOWING <strong className="text-[#D4AF37]">{filteredProperties.length}</strong> EXCLUSIVE RESIDENCES
            </p>
            {(selectedCity !== 'All' || selectedType !== 'All') && (
              <button
                onClick={() => { setSelectedCity('All'); setSelectedType('All'); }}
                className="text-xs text-[#D4AF37] hover:underline tracking-wider uppercase font-semibold"
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
                <div
                  className="relative aspect-[16/11] overflow-hidden bg-[#061730] cursor-pointer"
                  onClick={() => setSelectedProperty(property)}
                >
                  <img
                    src={property.img}
                    alt={property.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.88] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 gold-badge text-[8px]">
                    {property.tag}
                  </span>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#040B16]/80 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <MoveUpRight size={15} />
                  </div>
                </div>

                {/* Meta */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37] uppercase block">
                      {property.city} · {property.neighborhood}
                    </span>
                    <h3
                      onClick={() => setSelectedProperty(property)}
                      className="display text-2xl text-white font-normal mt-1 cursor-pointer hover:text-[#fff1b8] transition-colors"
                    >
                      {property.name}
                    </h3>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D4AF37]/15 text-xs text-white/70 text-center">
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
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="luxury-btn-outline !py-2 !px-4 !text-[9px]"
                    >
                      DETAILS
                    </button>
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
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#040B16] border border-[#D4AF37]/50 rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-[#071936] border border-[#D4AF37]/40 flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors"
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
                    <MapPin size={14} className="text-[#D4AF37]" />
                    {selectedProperty.neighborhood}, {selectedProperty.city}, Florida
                  </p>
                </div>

                {/* Big Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-[#D4AF37]/30">
                  <img
                    src={selectedProperty.img}
                    alt={selectedProperty.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 gold-badge">
                    VALUATION: {selectedProperty.price}
                  </div>
                </div>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 gold-glass-card rounded-sm text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Bed size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-semibold">{selectedProperty.beds} Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-white/10">
                    <Bath size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-semibold">{selectedProperty.baths} Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-white/10">
                    <Maximize2 size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-semibold">{selectedProperty.sqft} Living SQ FT</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-l border-white/10">
                    <ShieldCheck size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-semibold">Deeded Ownership</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
                    ARCHITECTURAL SUMMARY
                  </h4>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Curated Amenities */}
                <div>
                  <h4 className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
                    RESIDENCE AMENITIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1.5 rounded-sm bg-[#071936] border border-[#D4AF37]/30 text-xs text-white/80"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-white/50 tracking-widest uppercase block">Offered At</span>
                    <strong className="display text-3xl text-[#fff1b8] font-normal">{selectedProperty.price}</strong>
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
                      href="tel:+13055558482"
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
