import { notFoundSeo } from '../lib/seo';
import { applySeo } from '../lib/apply-seo';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allProperties, slugify } from '../data/properties';
import {
  PhoneCall,
  Phone,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Check,
  Compass,
  Award,
  Sparkles,
  Video,
  Send,
  CheckCircle2,
  Clock,
  Scan,
} from 'lucide-react';
import { apiRequest } from '../lib/api';
import { resolvePropertyImageUrl, handleImageError } from '../lib/media';
import Photo360Viewer from '../components/Photo360Viewer';
import ImageLightbox from '../components/ImageLightbox';

interface PropertyMediaItem {
  id?: number;
  type: string;
  src?: string;
  thumbnail?: string;
  alt?: string | null;
  embedCode?: string;
}

function is360Media(media?: PropertyMediaItem | null): boolean {
  if (!media) return false;
  const type = (media.type || '').toLowerCase();
  if (type === 'image360' || type === 'photo360' || type === 'panorama' || type === '360') {
    return true;
  }
  if (media.src && (media.src.includes('/image360s/') || media.src.toLowerCase().includes('360'))) {
    return true;
  }
  return false;
}

function isIframe360(media?: PropertyMediaItem | null): boolean {
  if (!media) return false;
  return media.type === 'iframe360';
}

function isVideo(media?: PropertyMediaItem | null): boolean {
  if (!media) return false;
  return media.type === 'video';
}

function getEmbedSource(media: PropertyMediaItem) {
  if (media.src) return media.src;
  if (!media.embedCode) return null;
  if (/^https?:\/\//i.test(media.embedCode.trim())) return media.embedCode.trim();

  const document = new DOMParser().parseFromString(media.embedCode, 'text/html');
  return document.querySelector('iframe')?.getAttribute('src') || null;
}

export default function PropertyDetailRoute() {
  const { slug } = useParams();
  return <PropertyDetail key={slug} />;
}

function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [imageFit, setImageFit] = useState<'contain' | 'cover'>('contain');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [remoteProperty, setRemoteProperty] = useState<typeof allProperties[number] | null>(null);
  const [remoteMedia, setRemoteMedia] = useState<PropertyMediaItem[] | null>(null);

  // Sidebar contact form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState<string | null>(null);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  const property = React.useMemo(() => {
    return remoteProperty || allProperties.find((p) => slugify(p.name) === slug);
  }, [remoteProperty, slug]);

  const activeInquiryMessage =
    inquiryMessage ??
    (property?.name ? `I would like to schedule a private confidential showing for ${property.name}.` : '');

  useEffect(() => {
    if (!slug) return;
    let active = true;
    apiRequest<{
      id: number; title: string; slug: string; price: string; location: string; type: string; beds: number; baths: number;
      sqft: number; image: string | null; gallery: PropertyMediaItem[]; descriptionEn: string | null; featuresEn: string[];
    }>(`/properties/${encodeURIComponent(slug)}`).then((remote) => {
      if (!active) return;
      const normalizedGallery = (remote.gallery || []).map((media) => ({
        ...media,
        src: media.src ? resolvePropertyImageUrl(media.src) : undefined,
        thumbnail: media.thumbnail ? resolvePropertyImageUrl(media.thumbnail) : undefined,
      }));
      const availableMedia = normalizedGallery.filter((media) => media.src || media.embedCode);
      setRemoteMedia(availableMedia.length
        ? availableMedia
        : remote.image
          ? [{ type: 'image', src: resolvePropertyImageUrl(remote.image), alt: remote.title }]
          : null);
      setRemoteProperty({
        id: String(remote.id),
        name: remote.title,
        city: remote.location.split(',')[0]?.trim() || remote.location,
        neighborhood: remote.location.split(',').slice(1).join(',').trim() || 'Tampa Bay',
        priceNum: Number(remote.price),
        price: `$${Number(remote.price).toLocaleString('en-US')}`,
        type: remote.type,
        beds: remote.beds,
        baths: remote.baths,
        sqft: Number(remote.sqft).toLocaleString('en-US'),
        img: resolvePropertyImageUrl(remote.image || normalizedGallery.find((media) => media.src && media.type === 'image')?.src),
        gallery: normalizedGallery.filter((media) => media.src && !isIframe360(media)).map((media) => media.src as string),
        description: remote.descriptionEn || 'Private residence represented by VITA Luxury Realty.',
        amenities: remote.featuresEn || [],
        tag: remote.type.toUpperCase(),
      });
    }).catch(() => { if (active) setRemoteProperty(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);


  useEffect(() => {
    const path = '/properties/' + slug;
    applySeo(path, property ? {
      title: property.name + ' in ' + property.city + ' | VITA Luxury Realty',
      description: (property.description || ('Explore ' + property.name + ' in ' + property.city + '. Request a private showing with VITA Luxury Realty.')).slice(0, 160),
      image: property.img || undefined,
    } : loading ? { title: 'Property Details | VITA Luxury Realty', description: 'Explore this residence with VITA Luxury Realty.' } : notFoundSeo);
  }, [property, slug, loading]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSidebarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryError('');
    setInquirySubmitting(true);
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          phone: inquiryPhone,
          message: activeInquiryMessage || `Private showing request for ${property?.name || 'residence'}.`,
          interest: 'buy',
        }),
      });
      setInquirySubmitted(true);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMessage('');
    } catch (err) {
      setInquiryError(err instanceof Error ? err.message : 'Unable to submit inquiry at this time.');
    } finally {
      setInquirySubmitting(false);
    }
  };

  if (!property) {
    return (
      <main className="bg-[#0C1730] text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center pt-36">
        <span className="eyebrow mb-2">PORTFOLIO NOTICE</span>
        <h1 className="display text-3xl sm:text-4xl text-white mb-4">{loading ? 'Loading residence?' : 'Residence Not Located'}</h1>
        <p className="text-white/60 max-w-md mb-8 text-sm font-light">
          This property address may be confidential, recently acquired off-market, or the URL slug may have changed.
        </p>
        <Link to="/properties" className="luxury-btn-primary">
          <ArrowLeft size={16} />
          <span>RETURN TO THE COLLECTION</span>
        </Link>
      </main>
    );
  }

  const mediaItems: PropertyMediaItem[] = remoteMedia || [
    { type: 'image', src: property.img, alt: property.name },
    ...property.gallery
      .filter((image) => image !== property.img)
      .map((image) => ({ type: 'image', src: image, alt: property.name })),
  ];
  const activeMedia = mediaItems[selectedMediaIndex] || mediaItems[0];
  const activeEmbedSource = activeMedia ? getEmbedSource(activeMedia) : null;

  // Filter 2D images for full-screen Lightbox
  const lightboxImages = mediaItems
    .filter((m) => !is360Media(m) && !isVideo(m) && !isIframe360(m) && m.src)
    .map((m) => ({ src: m.src as string, alt: m.alt || property.name }));

  const currentLightboxIndex = Math.max(
    0,
    lightboxImages.findIndex((img) => img.src === activeMedia?.src)
  );

  return (
    <main className="bg-[#0C1730] text-white min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 space-y-8">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-white/10 pb-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-accent font-semibold tracking-[0.2em] text-[#B8892F] hover:text-white uppercase transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO COLLECTION</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="luxury-btn-outline !py-1.5 !px-3 !text-[10px] flex items-center gap-2"
              title="Share Residence Link"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
              <span>{copied ? 'LINK COPIED' : 'SHARE'}</span>
            </button>
            <span className="gold-badge text-[8px]">{property.tag}</span>
          </div>
        </div>

        {/* Title & Location Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">{property.type}</span>
            <h1 className="display text-3xl sm:text-5xl lg:text-6xl text-white font-normal mt-1">
              {property.name}
            </h1>
            <p className="text-sm text-white/60 tracking-wider flex items-center gap-2 mt-2">
              <MapPin size={15} className="text-[#B8892F]" />
              {property.neighborhood}, {property.city}, Florida
            </p>
          </div>

          <div className="lg:text-right">
            <span className="text-[10px] text-white/50 tracking-[0.24em] uppercase block">
              ACQUISITION VALUATION
            </span>
            <strong className="display text-3xl sm:text-5xl text-[#f0dda6] font-normal">
              {property.price}
            </strong>
          </div>
        </div>

        {/* Hero Media Display (Uncropped Full Images & 360 Panorama Viewer) */}
        <div className="space-y-4">
          <motion.div
            key={`${activeMedia?.type}-${activeMedia?.src}-${selectedMediaIndex}`}
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[440px] sm:h-[560px] lg:h-[660px] overflow-hidden rounded-sm border border-[#B8892F]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#070e1b]"
          >
            {/* 1. Interactive 360 Photo Panorama Viewer */}
            {is360Media(activeMedia) && activeMedia.src ? (
              <Photo360Viewer src={activeMedia.src} alt={activeMedia.alt || property.name} />
            ) : isVideo(activeMedia) && activeMedia.src ? (
              /* 2. Video Player */
              <video
                src={activeMedia.src}
                poster={activeMedia.thumbnail}
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : isIframe360(activeMedia) && activeEmbedSource ? (
              /* 3. 360 Virtual Tour Iframe */
              <iframe
                src={activeEmbedSource}
                title={`${property.name} 360 virtual tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : activeMedia?.src ? (
              /* 4. Complete Uncropped 2D Image Display */
              <div className="relative w-full h-full flex items-center justify-center bg-[#070e1b] overflow-hidden group">
                {/* Ambient blurred backdrop for luxury framing without empty voids */}
                <img
                  src={activeMedia.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110 opacity-20 pointer-events-none"
                />

                {/* 100% Complete uncropped image */}
                <img
                  src={activeMedia.src}
                  alt={activeMedia.alt || property.name}
                  onError={handleImageError}
                  onClick={() => setIsLightboxOpen(true)}
                  className={`relative z-10 max-w-full max-h-full ${
                    imageFit === 'contain' ? 'object-contain' : 'w-full h-full object-cover'
                  } cursor-zoom-in transition-all duration-300 select-none shadow-2xl`}
                />

                {/* Top Right: Toggle Fit/Fill and Lightbox Fullscreen */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={() => setImageFit(imageFit === 'contain' ? 'cover' : 'contain')}
                    className="px-3 py-1.5 rounded-sm bg-[#0C1730]/85 text-white/85 hover:text-white border border-white/20 hover:border-[#B8892F] text-[10px] font-accent tracking-wider uppercase transition-all backdrop-blur-md flex items-center gap-1.5 shadow-lg"
                    title={imageFit === 'contain' ? 'Cambiar a modo llenar pantalla' : 'Ver fotografía completa original'}
                  >
                    <Scan size={13} className="text-[#B8892F]" />
                    <span>{imageFit === 'contain' ? 'FOTO COMPLETA (ORIGINAL)' : 'LLENAR PANTALLA'}</span>
                  </button>

                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="p-2 rounded-sm bg-[#0C1730]/85 text-white/85 hover:text-white border border-white/20 hover:border-[#B8892F] transition-all backdrop-blur-md shadow-lg"
                    title="Ver en pantalla completa / Ampliar"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>

                {/* Bottom Left Badge */}
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none gold-badge flex items-center gap-1.5 shadow-md bg-[#0C1730]/85 backdrop-blur-sm border border-[#B8892F]/60">
                  <Sparkles size={13} className="text-[#B8892F]" />
                  <span>RESIDENCIA PRIVADA · ALTA RESOLUCIÓN</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
                MEDIA UNAVAILABLE
              </div>
            )}
          </motion.div>

          {/* Property media gallery thumbnails: images, videos, and 360 tours */}
          {mediaItems.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {mediaItems.map((media, i) => {
                const is360 = is360Media(media);
                const isVid = isVideo(media);
                const isIframe = isIframe360(media);
                return (
                  <button
                    key={media.id || `${media.type}-${i}`}
                    onClick={() => setSelectedMediaIndex(i)}
                    className={`relative w-28 h-20 rounded-sm overflow-hidden border shrink-0 transition-all ${
                      selectedMediaIndex === i
                        ? 'border-[#B8892F] ring-2 ring-[#B8892F]/60 scale-102 shadow-lg'
                        : 'border-white/20 opacity-65 hover:opacity-100'
                    }`}
                  >
                    {media.thumbnail || media.src ? (
                      <img
                        src={media.thumbnail || media.src}
                        alt={media.alt || `Media ${i + 1}`}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-[9px] text-white/70">
                        360 TOUR
                      </span>
                    )}

                    {is360 && (
                      <span className="absolute bottom-1 left-1 right-1 text-[8px] font-bold tracking-wider text-[#0C1730] bg-[#f0dda6] flex items-center justify-center gap-1 py-0.5 rounded-xs shadow">
                        <Sparkles size={10} className="text-[#0C1730]" />
                        360° FOTO
                      </span>
                    )}
                    {isIframe && (
                      <span className="absolute bottom-1 left-1 right-1 text-[8px] font-bold tracking-wider text-white bg-[#0C1730]/90 border border-[#B8892F]/60 flex items-center justify-center py-0.5 rounded-xs">
                        360° TOUR
                      </span>
                    )}
                    {isVid && (
                      <Video size={14} className="absolute bottom-2 right-2 text-white drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Lightbox for viewing photos uncropped in full screen */}
        <ImageLightbox
          isOpen={isLightboxOpen}
          images={lightboxImages}
          initialIndex={currentLightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
        />

        {/* Primary Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 gold-glass-card rounded-sm text-center">
          <div className="flex flex-col items-center gap-1.5">
            <Bed size={22} className="text-[#B8892F]" />
            <strong className="display text-2xl text-white font-normal">{property.beds}</strong>
            <span className="text-[10px] text-white/50 tracking-widest uppercase">Bedrooms</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-l border-white/10">
            <Bath size={22} className="text-[#B8892F]" />
            <strong className="display text-2xl text-white font-normal">{property.baths}</strong>
            <span className="text-[10px] text-white/50 tracking-widest uppercase">Bathrooms</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-l border-white/10">
            <Maximize2 size={22} className="text-[#B8892F]" />
            <strong className="display text-2xl text-white font-normal">{property.sqft}</strong>
            <span className="text-[10px] text-white/50 tracking-widest uppercase">Interior SQ FT</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-l border-white/10">
            <ShieldCheck size={22} className="text-[#B8892F]" />
            <strong className="display text-2xl text-white font-normal">Fee Simple</strong>
            <span className="text-[10px] text-white/50 tracking-widest uppercase">Deeded Ownership</span>
          </div>
        </div>

        {/* 2-Column Content: Details vs. Company Advisory Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Info Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Architectural Overview */}
            <div className="gold-glass-card p-8 rounded-sm space-y-4">
              <span className="text-[10px] font-accent font-semibold tracking-[0.24em] text-[#B8892F] uppercase flex items-center gap-2">
                <Compass size={14} />
                ARCHITECTURAL STATEMENT
              </span>
              <p className="text-base text-white/85 font-light leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Curated Amenities */}
            <div className="gold-glass-card p-8 rounded-sm space-y-6">
              <div className="border-b border-[#B8892F]/20 pb-4">
                <span className="eyebrow">ESTATE SPECIFICATIONS</span>
                <h3 className="display text-2xl text-white font-normal mt-1">Curated Amenities</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-sm bg-[#0F2244]/80 border border-[#B8892F]/20 flex items-center gap-3 text-sm text-white/90"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#B8892F]/20 flex items-center justify-center text-[#B8892F] shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographical Context & Confidentiality Notice */}
            <div className="p-6 border border-white/10 rounded-sm bg-[#0D2040]/50 text-xs text-white/60 space-y-2">
              <p className="font-semibold text-white/80 uppercase tracking-wider">
                CONFIDENTIALITY &amp; ACCESS PROTOCOL
              </p>
              <p className="leading-relaxed">
                Full architectural blueprints, elevation plans, property disclosures, and private security parameters
                for {property.name} are accessible exclusively to verified principals or their legal representatives.
              </p>
            </div>
          </div>

          {/* Sticky Sidebar: VITA Luxury Realty Company Contact & Inquiry Form (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="gold-glass-card p-6 rounded-sm space-y-6 border border-[#B8892F]/40 shadow-2xl">
              {/* Company Header */}
              <div className="flex items-center gap-4 pb-5 border-b border-[#B8892F]/20">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1b345f] to-[#0A1628] border border-[#B8892F] flex items-center justify-center shrink-0 shadow-inner">
                  <Sparkles size={22} className="text-[#B8892F]" />
                </div>
                <div>
                  <span className="eyebrow block text-[9px]">TAMPA BAY HEADQUARTERS</span>
                  <h4 className="display text-xl text-white font-normal">VITA Luxury Realty</h4>
                  <p className="text-[11px] text-[#B8892F] tracking-wider uppercase font-semibold">
                    Direct Client Advisory Desk
                  </p>
                </div>
              </div>

              {/* Company Details Strip */}
              <div className="space-y-2.5 text-xs text-white/80 p-3.5 bg-[#09152b]/80 border border-white/10 rounded-sm">
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <MapPin size={15} className="text-[#B8892F] shrink-0 mt-0.5" />
                  <span>8900 N ARMENIA AVE, STE 206<br />Tampa, FL 33604</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#B8892F] shrink-0" />
                  <a href="tel:+18134129468" className="hover:text-[#B8892F] transition-colors font-mono">
                    (813) 412-9468
                  </a>
                </p>
                <p className="flex items-center gap-2.5 text-[11px] text-white/60">
                  <Clock size={14} className="text-[#B8892F] shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM EST</span>
                </p>
              </div>

              {/* Integrated Contact Form for this Residence */}
              {inquirySubmitted ? (
                <div className="p-6 text-center bg-[#132C52]/90 border border-[#B8892F] rounded-sm space-y-3">
                  <CheckCircle2 size={32} className="text-[#B8892F] mx-auto" />
                  <h5 className="display text-xl text-white font-normal">Solicitud Recibida</h5>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Un asesor de VITA Luxury Realty se comunicará confidencialmente en menos de 2 horas para coordinar la visita a <strong>{property.name}</strong>.
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="luxury-btn-outline !py-1.5 !px-3 !text-[10px] mx-auto block mt-2"
                  >
                    ENVIAR OTRA CONSULTA
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSidebarSubmit} className="space-y-3">
                  <div className="pb-1">
                    <span className="text-[10px] font-accent font-semibold tracking-[0.2em] text-[#B8892F] uppercase block">
                      SOLICITAR VISITA PRIVADA
                    </span>
                    <p className="text-[11px] text-white/60 font-light">
                      Consulta confidencial directa para {property.name}
                    </p>
                  </div>

                  {inquiryError && (
                    <p className="text-xs text-red-300 bg-red-950/40 border border-red-400/30 p-2.5 rounded-sm">
                      {inquiryError}
                    </p>
                  )}

                  <div>
                    <input
                      required
                      type="text"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Nombre completo *"
                      className="luxury-input !py-2.5 !text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      required
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="Email confidencial *"
                      className="luxury-input !py-2.5 !text-xs"
                    />
                    <input
                      required
                      type="tel"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="Teléfono / WhatsApp *"
                      className="luxury-input !py-2.5 !text-xs"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={activeInquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Instrucciones o fechas preferidas para la visita..."
                      className="luxury-input !py-2 !text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={inquirySubmitting}
                    className="luxury-btn-primary w-full text-center flex items-center justify-center gap-2 !py-3 !text-xs disabled:opacity-60 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{inquirySubmitting ? 'TRANSMITIENDO...' : 'SOLICITAR VISITA PRIVADA'}</span>
                  </button>

                  <a
                    href="tel:+18134129468"
                    className="luxury-btn-outline w-full text-center flex items-center justify-center gap-2 !py-2.5 !text-xs"
                  >
                    <PhoneCall size={13} />
                    <span>LLAMADA DIRECTA: (813) 412-9468</span>
                  </a>
                </form>
              )}

              {/* Trust & Confidentiality Protocol */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-[11px] text-white/60">
                <Award size={18} className="text-[#B8892F] shrink-0" />
                <span>NDA &amp; POF Required Prior to On-Site Inspection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
