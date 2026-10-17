import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'es';

export type TranslationKey =
  // Nav
  | 'home' | 'collection' | 'buy' | 'sell' | 'advisors' | 'heritage' | 'insights' | 'contact'
  | 'menu' | 'close' | 'navigate' | 'privateOffice' | 'appointment' | 'consultation' | 'tampaAdvisory'
  // Home hero
  | 'heroLabel' | 'heroDescription' | 'exploreListings' | 'confidentialConsultation'
  | 'rotatingTitle1' | 'rotatingTitle2' | 'rotatingTitle3' | 'rotatingTitle4'
  | 'trustMetric1Label' | 'trustMetric2Label' | 'trustMetric3Label' | 'joinTeamButton'
  // Home search
  | 'searchProperty' | 'searchHeading' | 'searchLocationLabel' | 'searchTypeLabel'
  | 'searchPriceLabel' | 'searchButton'
  // Home featured
  | 'featuredListings' | 'featuredHeading' | 'featuredDescription'
  // Home services
  | 'services' | 'servicesHeading'
  // Home team
  | 'team'
  // Home service areas
  | 'serviceAreas'
  // Home CTA
  | 'ctaReady' | 'ctaHeading' | 'ctaDescription' | 'speakBroker' | 'browseListings'
  // Sell page
  | 'interiorLivingSpace' | 'propertyValuationDetails' | 'avgSalesPremium'
  | 'calculateAssetValuation' | 'viewOurTrackRecord' | 'makeYourPropertyMatterMore'
  | 'estimateYourAsset' | 'sqftLabel' | 'locationTier' | 'architecturalClass'
  | 'confidentialAlgorithmEstimate' | 'projectedDispositionBracket' | 'estimatedValuationRange'
  | 'orderFormalCmaReport' | 'complimentaryConfidential' | 'readyToList'
  | 'representYourEstateWithDistinction' | 'speakWithSeniorPartners'
  | 'schedulePrivateListingConsultation'
  // About page
  | 'aboutEyebrow' | 'aboutHeroDesc' | 'aboutHeroCta' | 'aboutHeroCtaSecondary'
  | 'aboutPointOfView' | 'aboutH2' | 'aboutP1' | 'aboutP2'
  | 'aboutStat1Label' | 'aboutStat2Label'
  | 'aboutPillarsEyebrow' | 'aboutPillarsH2'
  | 'pillar1Title' | 'pillar1Desc' | 'pillar2Title' | 'pillar2Desc'
  | 'pillar3Title' | 'pillar3Desc' | 'pillar4Title' | 'pillar4Desc'
  | 'aboutTimelineEyebrow' | 'aboutTimelineH2'
  | 'milestone1Title' | 'milestone1Desc' | 'milestone2Title' | 'milestone2Desc'
  | 'milestone3Title' | 'milestone3Desc' | 'milestone4Title' | 'milestone4Desc'
  | 'aboutCtaH2' | 'aboutCtaP' | 'aboutCtaBtn'
  // Buy page
  | 'buyEyebrow' | 'buyHeroDesc' | 'buyHeroCta'
  | 'buyMethodEyebrow' | 'buyMethodH2' | 'buyMethodDesc'
  | 'buyStep1Title' | 'buyStep1Desc' | 'buyStep2Title' | 'buyStep2Desc'
  | 'buyStep3Title' | 'buyStep3Desc' | 'buyStep4Title' | 'buyStep4Desc'
  | 'buyWhyEyebrow' | 'buyWhyH2'
  | 'buyMandateEyebrow' | 'buyMandateH2' | 'buyMandateDesc'
  | 'buyNameLabel' | 'buyEmailLabel' | 'buyDestLabel' | 'buyBudgetLabel'
  | 'buyTimeframeLabel' | 'buyReqLabel' | 'buyReqPlaceholder' | 'buySubmitBtn'
  | 'buySuccessTitle' | 'buySuccessDesc'
  // Agents page
  | 'agentsEyebrow' | 'agentsHeroDesc'
  | 'agentsListEyebrow' | 'agentsListH2' | 'agentsListDesc'
  | 'agentViewProfile' | 'agentContact' | 'agentSpecialty' | 'agentVolume' | 'agentLanguages'
  | 'agentsCtaEyebrow' | 'agentsCtaH2' | 'agentsCtaDesc' | 'agentsCtaBtn'
  // Contact page
  | 'contactEyebrow' | 'contactHeroDesc'
  | 'contactFormEyebrow' | 'contactFormH2' | 'contactFormDesc'
  | 'contactInquiryLabel' | 'contactCapitalLabel' | 'contactMeetingLabel'
  | 'contactNameLabel' | 'contactEmailLabel' | 'contactPhoneLabel' | 'contactMessageLabel'
  | 'contactSubmitBtn' | 'contactSuccessTitle' | 'contactSuccessDesc'
  | 'contactOfficeH3' | 'contactOfficeAddress' | 'contactOfficeHours'
  // Insights page
  | 'insightsEyebrow' | 'insightsHeroDesc'
  | 'insightsAllCategory' | 'insightsReadMore' | 'insightsLoadingPosts'
  | 'insightsErrorTitle' | 'insightsErrorDesc' | 'insightsRetry' | 'insightsNoArticles'
  | 'insightsSubscribeEyebrow' | 'insightsSubscribeH2' | 'insightsSubscribeDesc'
  | 'insightsSubscribeBtn' | 'insightsSubscribeSuccess'
  // JoinTeam page
  | 'joinEyebrow' | 'joinHeroDesc'
  | 'joinFormEyebrow' | 'joinFormH2' | 'joinFormDesc'
  | 'joinNameLabel' | 'joinEmailLabel' | 'joinPhoneLabel' | 'joinWhatsappLabel'
  | 'joinLicenseLabel' | 'joinBrokerageLabel' | 'joinYearsLabel' | 'joinMessageLabel'
  | 'joinPhotoLabel' | 'joinResumeLabel' | 'joinSubmitBtn'
  | 'joinSuccessTitle' | 'joinSuccessDesc'
  | 'joinBenefitsEyebrow' | 'joinBenefitsH2' | 'joinBenefitsDesc'
  // Properties page
  | 'propertiesEyebrow' | 'propertiesHeroDesc'
  | 'propertiesFilterAll' | 'propertiesFilterWaterfront' | 'propertiesFilterPenthouse'
  | 'propertiesFilterEstate' | 'propertiesFilterVilla'
  | 'propertiesNoResults' | 'propertiesLoadingError'
  | 'propertiesViewDetail' | 'propertiesRequestShowing'
  | 'propertiesBeds' | 'propertiesBaths' | 'propertiesSqft';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // Nav
    home: 'Home', collection: 'Our Listings', buy: 'Buy', sell: 'Sell',
    advisors: 'Find a VITA Agent', heritage: 'Heritage', insights: 'Insights', contact: 'Contact',
    menu: 'Menu', close: 'Close', navigate: 'Navigate the Collection',
    privateOffice: 'Private Office', appointment: 'Private appointments by request',
    consultation: 'Request Private Consultation',
    tampaAdvisory: 'Tampa Bay Private Client Advisory · Est. 2011',
    // Home hero
    heroLabel: 'TAMPA BAY PRIVATE ADVISORY',
    heroDescription: 'Representing Tampa Bay waterfront residences, architectural estates, and discreet off-market opportunities.',
    exploreListings: 'EXPLORE LISTINGS', confidentialConsultation: 'BROKER CONSULTATION',
    rotatingTitle1: 'Live the Vita', rotatingTitle2: 'Waterfront Estates',
    rotatingTitle3: 'Tampa Bay Luxury', rotatingTitle4: 'Private Residences',
    trustMetric1Label: 'Transacted Volume', trustMetric2Label: 'Client Retention',
    trustMetric3Label: 'Tampa Bay Advisory', joinTeamButton: 'JOIN THE TEAM',
    // Home search
    searchProperty: 'FIND YOUR TAMPA BAY PROPERTY', searchHeading: 'Search Tampa Bay Listings',
    searchLocationLabel: 'Location', searchTypeLabel: 'Property Architecture',
    searchPriceLabel: 'Acquisition Bracket', searchButton: 'SEARCH COLLECTION',
    // Home featured
    featuredListings: 'FEATURED TAMPA BAY LISTINGS',
    featuredHeading: 'Properties Worth Representing.',
    featuredDescription: 'Browse selected luxury listings and waterfront homes represented by VITA Luxury Realty.',
    // Home services
    services: 'LUXURY REAL ESTATE SERVICES', servicesHeading: 'Representation Built for Results.',
    // Home team
    team: 'OUR TAMPA BAY REAL ESTATE TEAM',
    // Home service areas
    serviceAreas: 'TAMPA BAY SERVICE AREAS',
    // Home CTA
    ctaReady: 'READY TO MAKE YOUR NEXT MOVE?',
    ctaHeading: 'Your Tampa Bay Property Strategy.',
    ctaDescription: 'Talk with a Tampa Bay real estate advisor about buying, selling, valuing, or privately marketing your property.',
    speakBroker: 'SPEAK WITH A BROKER', browseListings: 'BROWSE LISTINGS',
    // Sell
    interiorLivingSpace: 'INTERIOR LIVING SPACE', propertyValuationDetails: 'PROPERTY VALUATION DETAILS',
    avgSalesPremium: 'AVG. SALES PREMIUM', calculateAssetValuation: 'CALCULATE ASSET VALUATION',
    viewOurTrackRecord: 'VIEW OUR TRACK RECORD', makeYourPropertyMatterMore: 'MAKE YOUR PROPERTY MATTER MORE',
    estimateYourAsset: 'ESTIMATE YOUR ASSET', sqftLabel: 'SQ FT',
    locationTier: 'Prime Geographic Enclave', architecturalClass: 'Architectural & Waterfront Caliber',
    confidentialAlgorithmEstimate: 'Confidential algorithmic estimate. Actual valuation requires private on-site inspection.',
    projectedDispositionBracket: 'PROJECTED DISPOSITION BRACKET',
    estimatedValuationRange: 'Estimated Valuation Range', orderFormalCmaReport: 'ORDER FORMAL CMA REPORT',
    complimentaryConfidential: 'Complimentary & strictly confidential.',
    readyToList: 'READY TO LIST', representYourEstateWithDistinction: 'Represent Your Estate with Distinction.',
    speakWithSeniorPartners: 'Speak directly with our senior managing partners for a private market assessment of your Florida residence.',
    schedulePrivateListingConsultation: 'SCHEDULE PRIVATE LISTING CONSULTATION',
    // About
    aboutEyebrow: 'HERITAGE & PHILOSOPHY',
    aboutHeroDesc: "More than transactions. We curate and represent the way exceptional living should feel across Florida's most historic and visionary destinations.",
    aboutHeroCta: 'SPEAK WITH MANAGING PARTNERS', aboutHeroCtaSecondary: 'EXPLORE OUR RESIDENCES',
    aboutPointOfView: 'OUR POINT OF VIEW', aboutH2: 'Real Estate Advice With Perspective.',
    aboutP1: 'VITA was founded to give buyers and sellers a more informed, disciplined, and personal way to navigate exceptional real estate.',
    aboutP2: "Based in Tampa Bay, we serve a global clientele of founders, industrialists, and collectors seeking exceptional Florida property. We reject transactional velocity in favor of obsessive curation and generational discretion.",
    aboutStat1Label: 'Years of Florida Advisory', aboutStat2Label: 'Client Retention Rate',
    aboutPillarsEyebrow: 'OUR CORE PRINCIPLES', aboutPillarsH2: 'Pillars of Distinction.',
    pillar1Title: 'Absolute Discretion', pillar1Desc: 'Client identity and transactional terms are safeguarded behind multi-layered legal and operational protocols.',
    pillar2Title: 'Architectural Provenance', pillar2Desc: 'We represent only properties that reflect genuine architectural importance, rare views, and superior craftsmanship.',
    pillar3Title: 'Market Intelligence', pillar3Desc: 'Proprietary valuation models, off-market transaction data, and sovereign wealth capital flow analysis.',
    pillar4Title: 'Generational Fiduciary', pillar4Desc: 'Advising families across generations on estate consolidation, 1031 exchanges, and generational acquisitions.',
    aboutTimelineEyebrow: 'A DECADE OF LANDMARKS', aboutTimelineH2: 'Key Milestones.',
    milestone1Title: 'Founding of VITA Luxury Realty', milestone1Desc: 'Established as a private Florida advisory with an initial portfolio of $120M in waterfront holdings.',
    milestone2Title: 'Tampa Bay Advisory Expansion', milestone2Desc: 'Expanded private representation across Tampa, Clearwater, and St. Petersburg waterfront communities.',
    milestone3Title: '$1 Billion Transaction Threshold', milestone3Desc: 'Surpassing $1B in closed transactions with record-setting sales across Star Island and Gables Estates.',
    milestone4Title: 'Global Family Office Advisory', milestone4Desc: 'Managing an active Florida collection surpassing $2.4B in private representation and off-market syndication.',
    aboutCtaH2: 'Work With a Tampa Bay Brokerage.',
    aboutCtaP: 'Get clear advice, responsive communication, and experienced representation for your next Tampa Bay real estate decision.',
    aboutCtaBtn: 'SCHEDULE AN INTRODUCTORY MEETING',
    // Buy
    buyEyebrow: 'BESPOKE BUYER REPRESENTATION',
    buyHeroDesc: 'We act exclusively as trusted fiduciaries for high-net-worth buyers seeking rare, off-market, and trophy assets with paramount discretion.',
    buyHeroCta: 'INITIATE ACQUISITION MANDATE',
    buyMethodEyebrow: 'THE VITA METHOD', buyMethodH2: 'A Smarter Way to Buy.',
    buyMethodDesc: 'Our buyer representation service combines local Tampa Bay market knowledge, property research, due diligence, negotiation, and closing coordination.',
    buyStep1Title: 'Confidential Mandate', buyStep1Desc: 'We establish your acquisition parameters in strict confidence before any market exposure.',
    buyStep2Title: 'Off-Market Access', buyStep2Desc: 'Our network surfaces pre-market listings, pocket listings, and off-market estate opportunities unavailable to the public.',
    buyStep3Title: 'Due Diligence', buyStep3Desc: 'Comprehensive inspection, title, legal, and valuation review managed by our senior advisory team.',
    buyStep4Title: 'Closing Coordination', buyStep4Desc: 'We oversee all closing activities to ensure a seamless, discreet transfer of the asset.',
    buyWhyEyebrow: 'WHY VITA', buyWhyH2: 'The VITA Advantage.',
    buyMandateEyebrow: 'ACQUISITION MANDATE', buyMandateH2: 'Begin Your Private Search.',
    buyMandateDesc: 'Submit your acquisition mandate confidentially. Our advisory team will contact you within 24 hours.',
    buyNameLabel: 'Full Name', buyEmailLabel: 'Email Address',
    buyDestLabel: 'Target Destination', buyBudgetLabel: 'Acquisition Budget',
    buyTimeframeLabel: 'Acquisition Timeframe', buyReqLabel: 'Property Requirements',
    buyReqPlaceholder: 'Describe your ideal property, lifestyle requirements, and any specific preferences...',
    buySubmitBtn: 'SUBMIT ACQUISITION MANDATE',
    buySuccessTitle: 'Mandate Received.', buySuccessDesc: 'Your acquisition mandate has been received. A senior advisor will contact you within 24 hours.',
    // Agents
    agentsEyebrow: 'PRIVATE ADVISORY TEAM',
    agentsHeroDesc: 'A curated team of senior advisors committed to delivering the highest standard of private real estate representation in Tampa Bay.',
    agentsListEyebrow: 'OUR ADVISORS', agentsListH2: 'Meet the Team.',
    agentsListDesc: 'Each VITA advisor brings specialized expertise, market fluency, and unwavering discretion to every client relationship.',
    agentViewProfile: 'VIEW PROFILE', agentContact: 'CONTACT ADVISOR',
    agentSpecialty: 'Specialty', agentVolume: 'Career Volume', agentLanguages: 'Languages',
    agentsCtaEyebrow: 'WORK WITH VITA', agentsCtaH2: 'Start a Private Conversation.',
    agentsCtaDesc: 'Schedule a private, no-obligation consultation with one of our senior advisors.',
    agentsCtaBtn: 'REQUEST PRIVATE CONSULTATION',
    // Contact
    contactEyebrow: 'PRIVATE CLIENT SERVICES',
    contactHeroDesc: 'Reach our private advisory team for confidential consultations on buying, selling, or valuing exceptional Florida real estate.',
    contactFormEyebrow: 'PRIVATE CONSULTATION REQUEST', contactFormH2: 'Begin a Confidential Conversation.',
    contactFormDesc: 'All inquiries are handled with the utmost discretion by our senior advisory team.',
    contactInquiryLabel: 'Inquiry Type', contactCapitalLabel: 'Capital Range',
    contactMeetingLabel: 'Meeting Preference',
    contactNameLabel: 'Full Name', contactEmailLabel: 'Email Address',
    contactPhoneLabel: 'Phone Number', contactMessageLabel: 'Your Message',
    contactSubmitBtn: 'SEND PRIVATE INQUIRY',
    contactSuccessTitle: 'Inquiry Received.', contactSuccessDesc: 'Thank you. A senior advisor will contact you within 24 hours to begin your private consultation.',
    contactOfficeH3: 'Private Client Office', contactOfficeAddress: 'Tampa Bay, Florida',
    contactOfficeHours: 'By appointment only',
    // Insights
    insightsEyebrow: 'VITA MARKET INTELLIGENCE',
    insightsHeroDesc: 'Private market analysis, lifestyle intelligence, and architectural provenance from the VITA advisory team.',
    insightsAllCategory: 'All', insightsReadMore: 'READ INSIGHT',
    insightsLoadingPosts: 'Loading market insights...', insightsErrorTitle: 'Unable to load insights.',
    insightsErrorDesc: 'There was an error loading our market intelligence reports.', insightsRetry: 'RETRY',
    insightsNoArticles: 'No articles available in this category.',
    insightsSubscribeEyebrow: 'THE VITA MONOGRAPH', insightsSubscribeH2: 'Private Market Dispatch.',
    insightsSubscribeDesc: 'Join our private subscriber list for exclusive market intelligence, off-market opportunities, and architectural provenance reports.',
    insightsSubscribeBtn: 'SUBSCRIBE TO THE DISPATCH', insightsSubscribeSuccess: 'You have been added to the VITA Monograph private dispatch.',
    // JoinTeam
    joinEyebrow: 'VITA ADVISORY COUNCIL',
    joinHeroDesc: 'Bring your market knowledge, integrity, and ambition to a brokerage built for exceptional real estate representation.',
    joinFormEyebrow: 'CONFIDENTIAL APPLICATION', joinFormH2: 'Apply to Join VITA.',
    joinFormDesc: 'All applications are reviewed personally by our managing partners. We are selective by design.',
    joinNameLabel: 'Full Name', joinEmailLabel: 'Email Address',
    joinPhoneLabel: 'Phone Number', joinWhatsappLabel: 'WhatsApp Number',
    joinLicenseLabel: 'License Number', joinBrokerageLabel: 'Current Brokerage',
    joinYearsLabel: 'Years of Experience', joinMessageLabel: 'Why do you want to join VITA?',
    joinPhotoLabel: 'Professional Photo', joinResumeLabel: 'Resume / CV',
    joinSubmitBtn: 'SUBMIT APPLICATION',
    joinSuccessTitle: 'Application Received.', joinSuccessDesc: 'Thank you for your interest in joining VITA. Our managing partners will review your application and contact you within 5 business days.',
    joinBenefitsEyebrow: 'WHAT YOU GAIN', joinBenefitsH2: 'The VITA Platform.',
    joinBenefitsDesc: 'Access our proprietary tools, private market network, and premium brand to elevate your real estate practice.',
    // Properties
    propertiesEyebrow: 'PRIVATE COLLECTION',
    propertiesHeroDesc: 'Browse our curated selection of luxury properties, waterfront estates, and private residences in Tampa Bay.',
    propertiesFilterAll: 'All', propertiesFilterWaterfront: 'Waterfront',
    propertiesFilterPenthouse: 'Penthouse', propertiesFilterEstate: 'Estate', propertiesFilterVilla: 'Villa',
    propertiesNoResults: 'No properties match your current filters.',
    propertiesLoadingError: 'Unable to load properties at this time.',
    propertiesViewDetail: 'VIEW PROPERTY', propertiesRequestShowing: 'REQUEST SHOWING',
    propertiesBeds: 'Beds', propertiesBaths: 'Baths', propertiesSqft: 'SQ FT',
  },

  es: {
    // Nav
    home: 'Inicio', collection: 'Nuestras propiedades', buy: 'Comprar', sell: 'Vender',
    advisors: 'Encuentra un agente VITA', heritage: 'Nosotros', insights: 'Mercado', contact: 'Contacto',
    menu: 'Menú', close: 'Cerrar', navigate: 'Explorar propiedades',
    privateOffice: 'Oficina privada', appointment: 'Citas privadas con solicitud previa',
    consultation: 'Solicitar consulta privada',
    tampaAdvisory: 'Asesoría inmobiliaria privada en Tampa Bay · Desde 2011',
    // Home hero
    heroLabel: 'ASESORÍA INMOBILIARIA PRIVADA EN TAMPA BAY',
    heroDescription: 'Representamos residencias waterfront, propiedades arquitectónicas y oportunidades inmobiliarias confidenciales en Tampa Bay.',
    exploreListings: 'VER PROPIEDADES', confidentialConsultation: 'CONSULTA CON UN BROKER',
    rotatingTitle1: 'Vive el Vita', rotatingTitle2: 'Propiedades Waterfront',
    rotatingTitle3: 'Lujo en Tampa Bay', rotatingTitle4: 'Residencias Privadas',
    trustMetric1Label: 'Volumen Transado', trustMetric2Label: 'Retención de Clientes',
    trustMetric3Label: 'Asesoría Tampa Bay', joinTeamButton: 'UNIRSE AL EQUIPO',
    // Home search
    searchProperty: 'ENCUENTRA TU PROPIEDAD EN TAMPA BAY', searchHeading: 'Buscar propiedades en Tampa Bay',
    searchLocationLabel: 'Ubicación', searchTypeLabel: 'Tipo de Propiedad',
    searchPriceLabel: 'Rango de Precio', searchButton: 'BUSCAR PROPIEDADES',
    // Home featured
    featuredListings: 'PROPIEDADES DESTACADAS EN TAMPA BAY',
    featuredHeading: 'Propiedades que Merecen Representación.',
    featuredDescription: 'Explora propiedades de lujo y residencias waterfront representadas por VITA Luxury Realty.',
    // Home services
    services: 'SERVICIOS INMOBILIARIOS DE LUJO', servicesHeading: 'Representación Enfocada en Resultados.',
    // Home team
    team: 'NUESTRO EQUIPO INMOBILIARIO EN TAMPA BAY',
    // Home service areas
    serviceAreas: 'ZONAS DE SERVICIO EN TAMPA BAY',
    // Home CTA
    ctaReady: '¿LISTO PARA TU PRÓXIMA DECISIÓN?',
    ctaHeading: 'Tu Estrategia Inmobiliaria en Tampa Bay.',
    ctaDescription: 'Habla con un asesor sobre comprar, vender, valorar o promocionar tu propiedad de forma privada.',
    speakBroker: 'HABLAR CON UN BROKER', browseListings: 'VER PROPIEDADES',
    // Sell
    interiorLivingSpace: 'ESPACIO INTERIOR', propertyValuationDetails: 'DETALLES DE VALORACIÓN',
    avgSalesPremium: 'PRIMA DE VENTAS PROMEDIO', calculateAssetValuation: 'CALCULAR VALUACIÓN',
    viewOurTrackRecord: 'VER NUESTRO HISTORIAL', makeYourPropertyMatterMore: 'HAZ QUE TU PROPIEDAD IMPORTE MÁS',
    estimateYourAsset: 'ESTIMAR TU ACTIVO', sqftLabel: 'FT²',
    locationTier: 'Enclave Geográfico Prime', architecturalClass: 'Clase Arquitectónica y Costera',
    confidentialAlgorithmEstimate: 'Estimación algorítmica confidencial. La valoración real requiere inspección privada in situ.',
    projectedDispositionBracket: 'MARGEN DE DISPOSICIÓN PROYECTADO',
    estimatedValuationRange: 'Rango de Valoración Estimada', orderFormalCmaReport: 'ORDENAR INFORME CMA',
    complimentaryConfidential: 'Complementario y estrictamente confidencial.',
    readyToList: 'LISTO PARA LISTAR', representYourEstateWithDistinction: 'Representa tu propiedad con distinción.',
    speakWithSeniorPartners: 'Habla con nuestros socios directores para una evaluación privada de tu residencia en Florida.',
    schedulePrivateListingConsultation: 'PROGRAMAR CONSULTA PRIVADA',
    // About
    aboutEyebrow: 'LEGADO Y FILOSOFÍA',
    aboutHeroDesc: 'Más que transacciones. Cubrimos y representamos la forma en que la vida excepcional debe sentirse en los destinos más históricos y visionarios de Florida.',
    aboutHeroCta: 'HABLAR CON LOS DIRECTORES', aboutHeroCtaSecondary: 'EXPLORAR RESIDENCIAS',
    aboutPointOfView: 'NUESTRO PUNTO DE VISTA', aboutH2: 'Asesoría Inmobiliaria Con Perspectiva.',
    aboutP1: 'VITA fue fundada para dar a compradores y vendedores una manera más informada, disciplinada y personal de navegar el mercado inmobiliario excepcional.',
    aboutP2: 'Con base en Tampa Bay, servimos a una clientela global de fundadores, industriales y coleccionistas que buscan propiedades excepcionales en Florida.',
    aboutStat1Label: 'Años de Asesoría en Florida', aboutStat2Label: 'Tasa de Retención de Clientes',
    aboutPillarsEyebrow: 'NUESTROS PRINCIPIOS', aboutPillarsH2: 'Pilares de Distinción.',
    pillar1Title: 'Discreción Absoluta', pillar1Desc: 'La identidad del cliente y los términos transaccionales están protegidos por protocolos legales y operativos multicapa.',
    pillar2Title: 'Procedencia Arquitectónica', pillar2Desc: 'Solo representamos propiedades que reflejan importancia arquitectónica genuina, vistas excepcionales y artesanía superior.',
    pillar3Title: 'Inteligencia de Mercado', pillar3Desc: 'Modelos de valoración propietarios, datos de transacciones fuera de mercado y análisis de flujo de capital soberano.',
    pillar4Title: 'Fiduciario Generacional', pillar4Desc: 'Asesoramos a familias a través de generaciones en consolidación de patrimonio, intercambios 1031 y adquisiciones generacionales.',
    aboutTimelineEyebrow: 'UNA DÉCADA DE HITOS', aboutTimelineH2: 'Momentos Clave.',
    milestone1Title: 'Fundación de VITA Luxury Realty', milestone1Desc: 'Establecidos como asesoría privada en Florida con un portafolio inicial de $120M en propiedades waterfront.',
    milestone2Title: 'Expansión en Tampa Bay', milestone2Desc: 'Ampliamos la representación privada en las comunidades waterfront de Tampa, Clearwater y St. Petersburg.',
    milestone3Title: 'Umbral de $1 Mil Millones', milestone3Desc: 'Superamos $1B en transacciones cerradas con ventas récord en Star Island y Gables Estates.',
    milestone4Title: 'Asesoría a Family Offices Globales', milestone4Desc: 'Gestionamos una cartera activa en Florida que supera los $2.4B en representación privada y sindicación fuera de mercado.',
    aboutCtaH2: 'Trabaja con una Corredora de Tampa Bay.',
    aboutCtaP: 'Obtén asesoría clara, comunicación receptiva y representación experta para tu próxima decisión inmobiliaria en Tampa Bay.',
    aboutCtaBtn: 'AGENDAR REUNIÓN INTRODUCTORIA',
    // Buy
    buyEyebrow: 'REPRESENTACIÓN DE COMPRADORES A MEDIDA',
    buyHeroDesc: 'Actuamos exclusivamente como fiduciarios de confianza para compradores de alto patrimonio que buscan activos raros, fuera de mercado y trofeo, con discreción absoluta.',
    buyHeroCta: 'INICIAR MANDATO DE ADQUISICIÓN',
    buyMethodEyebrow: 'EL MÉTODO VITA', buyMethodH2: 'Una Forma Más Inteligente de Comprar.',
    buyMethodDesc: 'Nuestro servicio combina conocimiento del mercado local de Tampa Bay, investigación de propiedades, due diligence, negociación y coordinación de cierre.',
    buyStep1Title: 'Mandato Confidencial', buyStep1Desc: 'Establecemos tus parámetros de adquisición en estricta confidencialidad antes de cualquier exposición al mercado.',
    buyStep2Title: 'Acceso Fuera de Mercado', buyStep2Desc: 'Nuestra red identifica listados previos al mercado y oportunidades no disponibles al público.',
    buyStep3Title: 'Due Diligence', buyStep3Desc: 'Revisión integral de inspección, título, legal y valoración gestionada por nuestro equipo senior.',
    buyStep4Title: 'Coordinación de Cierre', buyStep4Desc: 'Supervisamos todas las actividades de cierre para garantizar una transferencia fluida y discreta del activo.',
    buyWhyEyebrow: 'POR QUÉ VITA', buyWhyH2: 'La Ventaja VITA.',
    buyMandateEyebrow: 'MANDATO DE ADQUISICIÓN', buyMandateH2: 'Inicia tu Búsqueda Privada.',
    buyMandateDesc: 'Envía tu mandato de adquisición de forma confidencial. Nuestro equipo te contactará en 24 horas.',
    buyNameLabel: 'Nombre Completo', buyEmailLabel: 'Correo Electrónico',
    buyDestLabel: 'Destino Objetivo', buyBudgetLabel: 'Presupuesto de Adquisición',
    buyTimeframeLabel: 'Plazo de Adquisición', buyReqLabel: 'Requisitos de Propiedad',
    buyReqPlaceholder: 'Describe tu propiedad ideal, requerimientos de estilo de vida y preferencias específicas...',
    buySubmitBtn: 'ENVIAR MANDATO DE ADQUISICIÓN',
    buySuccessTitle: 'Mandato Recibido.', buySuccessDesc: 'Tu mandato de adquisición fue recibido. Un asesor senior te contactará en 24 horas.',
    // Agents
    agentsEyebrow: 'EQUIPO DE ASESORÍA PRIVADA',
    agentsHeroDesc: 'Un equipo selecto de asesores senior comprometidos con el más alto estándar de representación inmobiliaria privada en Tampa Bay.',
    agentsListEyebrow: 'NUESTROS ASESORES', agentsListH2: 'Conoce al Equipo.',
    agentsListDesc: 'Cada asesor de VITA aporta experiencia especializada, fluidez en el mercado y discreción en cada relación con el cliente.',
    agentViewProfile: 'VER PERFIL', agentContact: 'CONTACTAR ASESOR',
    agentSpecialty: 'Especialidad', agentVolume: 'Volumen de Carrera', agentLanguages: 'Idiomas',
    agentsCtaEyebrow: 'TRABAJA CON VITA', agentsCtaH2: 'Inicia una Conversación Privada.',
    agentsCtaDesc: 'Agenda una consulta privada y sin compromiso con uno de nuestros asesores senior.',
    agentsCtaBtn: 'SOLICITAR CONSULTA PRIVADA',
    // Contact
    contactEyebrow: 'SERVICIOS AL CLIENTE PRIVADO',
    contactHeroDesc: 'Comunícate con nuestro equipo de asesoría privada para consultas confidenciales sobre compra, venta o valoración de bienes raíces en Florida.',
    contactFormEyebrow: 'SOLICITUD DE CONSULTA PRIVADA', contactFormH2: 'Inicia una Conversación Confidencial.',
    contactFormDesc: 'Todas las consultas son atendidas con la máxima discreción por nuestro equipo de asesoría senior.',
    contactInquiryLabel: 'Tipo de Consulta', contactCapitalLabel: 'Rango de Capital',
    contactMeetingLabel: 'Preferencia de Reunión',
    contactNameLabel: 'Nombre Completo', contactEmailLabel: 'Correo Electrónico',
    contactPhoneLabel: 'Número de Teléfono', contactMessageLabel: 'Tu Mensaje',
    contactSubmitBtn: 'ENVIAR CONSULTA PRIVADA',
    contactSuccessTitle: 'Consulta Recibida.', contactSuccessDesc: 'Gracias. Un asesor senior te contactará en 24 horas para iniciar tu consulta privada.',
    contactOfficeH3: 'Oficina de Clientes Privados', contactOfficeAddress: 'Tampa Bay, Florida',
    contactOfficeHours: 'Solo con cita previa',
    // Insights
    insightsEyebrow: 'INTELIGENCIA DE MERCADO VITA',
    insightsHeroDesc: 'Análisis de mercado privado, inteligencia de estilo de vida y procedencia arquitectónica del equipo asesor de VITA.',
    insightsAllCategory: 'Todos', insightsReadMore: 'LEER ANÁLISIS',
    insightsLoadingPosts: 'Cargando análisis de mercado...', insightsErrorTitle: 'No se pudieron cargar los análisis.',
    insightsErrorDesc: 'Ocurrió un error al cargar nuestros informes de inteligencia de mercado.', insightsRetry: 'REINTENTAR',
    insightsNoArticles: 'No hay artículos disponibles en esta categoría.',
    insightsSubscribeEyebrow: 'EL MONOGRAMA VITA', insightsSubscribeH2: 'Despacho Privado de Mercado.',
    insightsSubscribeDesc: 'Únete a nuestra lista de suscriptores privados para recibir inteligencia exclusiva de mercado y oportunidades fuera de mercado.',
    insightsSubscribeBtn: 'SUSCRIBIRSE AL DESPACHO', insightsSubscribeSuccess: 'Has sido añadido al despacho privado del Monograma VITA.',
    // JoinTeam
    joinEyebrow: 'CONSEJO ASESOR VITA',
    joinHeroDesc: 'Aporta tu conocimiento del mercado, integridad y ambición a una corredora construida para la representación inmobiliaria excepcional.',
    joinFormEyebrow: 'SOLICITUD CONFIDENCIAL', joinFormH2: 'Solicita unirte a VITA.',
    joinFormDesc: 'Todas las solicitudes son revisadas personalmente por nuestros socios directores. Somos selectivos por diseño.',
    joinNameLabel: 'Nombre Completo', joinEmailLabel: 'Correo Electrónico',
    joinPhoneLabel: 'Teléfono', joinWhatsappLabel: 'WhatsApp',
    joinLicenseLabel: 'Número de Licencia', joinBrokerageLabel: 'Corredora Actual',
    joinYearsLabel: 'Años de Experiencia', joinMessageLabel: '¿Por qué deseas unirte a VITA?',
    joinPhotoLabel: 'Foto Profesional', joinResumeLabel: 'Currículum / CV',
    joinSubmitBtn: 'ENVIAR SOLICITUD',
    joinSuccessTitle: 'Solicitud Recibida.', joinSuccessDesc: 'Gracias por tu interés en unirte a VITA. Nuestros socios directores revisarán tu solicitud y te contactarán en 5 días hábiles.',
    joinBenefitsEyebrow: 'LO QUE GANAS', joinBenefitsH2: 'La Plataforma VITA.',
    joinBenefitsDesc: 'Accede a nuestras herramientas propietarias, red de mercado privada y marca premium para elevar tu práctica inmobiliaria.',
    // Properties
    propertiesEyebrow: 'COLECCIÓN PRIVADA',
    propertiesHeroDesc: 'Explora nuestra selección curada de propiedades de lujo, estates waterfront y residencias privadas en Tampa Bay.',
    propertiesFilterAll: 'Todos', propertiesFilterWaterfront: 'Waterfront',
    propertiesFilterPenthouse: 'Penthouse', propertiesFilterEstate: 'Estate', propertiesFilterVilla: 'Villa',
    propertiesNoResults: 'Ninguna propiedad coincide con tus filtros actuales.',
    propertiesLoadingError: 'No se pueden cargar las propiedades en este momento.',
    propertiesViewDetail: 'VER PROPIEDAD', propertiesRequestShowing: 'SOLICITAR VISITA',
    propertiesBeds: 'Hab.', propertiesBaths: 'Baños', propertiesSqft: 'FT²',
  },
};

/** Utility to format numbers based on current language */
export const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string => {
  const locale = typeof window !== 'undefined' && window.localStorage.getItem('vita-language') === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale, options).format(value);
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = typeof window === 'undefined' ? null : window.localStorage.getItem('vita-language');
    return saved === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es' : 'en-US';
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem('vita-language', nextLanguage);
    document.documentElement.lang = nextLanguage === 'es' ? 'es' : 'en-US';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: (key) => translations[language][key] ?? key }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
