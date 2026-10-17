export interface Property {
  id: string;
  slug?: string;
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
  has360?: boolean;
}

export const allProperties: Property[] = [
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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'An architectural tour-de-force poised on the most exclusive private island in Biscayne Bay. Features 120 feet of prime deep-water frontage, private mega-yacht dock, infinity pool, and bespoke Italian craftsmanship throughout.',
    amenities: ['Private Yacht Dock', 'Wine Cellar (1,200 bottles)', 'Infinity Pool', 'Smart Home Automation', 'Staff Quarters'],
    tag: 'STAR ISLAND EXCLUSIVE',
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
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Mizner-inspired timeless Mediterranean compound featuring direct deeded ocean access, manicured coral stone loggias, tennis pavilion, and guest estate on lush tropical grounds.',
    amenities: ['Deeded Oceanfront', 'Championship Tennis Court', 'Separate Guest Villa', 'Coral Stone Loggias', 'Sub-Zero & La Cornue Kitchen'],
    tag: 'PALM BEACH COMPOUND',
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
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Occupying the entire 58th and 59th levels with 360-degree panoramic views of Biscayne Bay and the Miami skyline. Private rooftop glass-bottom plunge pool and private high-speed biometric elevator.',
    amenities: ['Private Rooftop Pool', 'Biometric Elevator', '360° Panoramic Vistas', 'Custom Poliform Millwork', '4 Valet Spaces'],
    tag: 'DUPLEX PENTHOUSE',
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
    gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'],
    description:
      'A contemporary sanctuary enveloped by mature banyan trees and serene waterways. Designed by renowned modernist architects with glass curtain walls and seamless indoor-outdoor living pavilions.',
    amenities: ['Gated 24h Security', 'Private Marina Basin', 'Designer Fire Pits', 'Zero-Edge Reflection Pool', 'Crestron Lighting'],
    tag: 'PRIVATE ENCLAVE',
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
    gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'],
    description:
      'One of the crown jewels of Port Royal with cut-through yacht passage to the Gulf of Mexico. Ultra-luxe master suite, private wellness spa, and deeded membership eligibility.',
    amenities: ['Gulf Yacht Access', 'Wellness Spa & Sauna', 'Outdoor Kitchen & Cabana', 'Elevated Helipad Access', 'Air-Conditioned 6-Car Garage'],
    tag: 'PORT ROYAL TROPHY',
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
    gallery: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'],
    description:
      'Showcasing spectacular Miami sunset views across Biscayne Bay. Features warm organic limestone, ipe wood decking, rooftop terrace, and private dock equipped for two tenders.',
    amenities: ['Sunset Facing Vistas', 'Rooftop Lounge', 'Limestone & Ipe Finishes', 'Double Tender Dock', 'Chef Prep Kitchen'],
    tag: 'VENETIAN ISLANDS',
  },
  {
    id: 'prop-7',
    name: 'Bayshore Modern Estate',
    city: 'Tampa',
    neighborhood: 'South Tampa',
    priceNum: 8950000,
    price: '$8,950,000',
    type: 'Modern Villa',
    beds: 5,
    baths: 6,
    sqft: '6,850',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    gallery: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'],
    description:
      'A refined South Tampa residence pairing sculptural architecture, generous entertaining spaces, and effortless indoor-outdoor living near Bayshore Boulevard.',
    amenities: ['Bayshore Proximity', 'Resort Pool', 'Chef Kitchen', 'Private Office', 'Gated Motor Court'],
    tag: 'SOUTH TAMPA SIGNATURE',
  },
  {
    id: 'prop-8',
    name: 'Gulf Horizon Residence',
    city: 'Clearwater',
    neighborhood: 'Clearwater Beach',
    priceNum: 12750000,
    price: '$12,750,000',
    type: 'Waterfront Estate',
    beds: 6,
    baths: 7,
    sqft: '7,420',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'],
    description:
      'A private Clearwater Beach retreat with wide Gulf views, elevated sunset terraces, and a discreet coastal setting designed for relaxed luxury.',
    amenities: ['Gulf Views', 'Private Dock', 'Infinity Pool', 'Sunset Terrace', 'Guest Suite'],
    tag: 'CLEARWATER BEACH WATERFRONT',
  },
];

export const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
