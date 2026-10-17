export const SITE_URL = 'https://vitaluxuryrealty.com';
export interface PageSeo { title: string; description: string; image?: string; noindex?: boolean }
export const pages: Record<string, PageSeo> = {
  '/': { title: 'Tampa Bay Luxury Real Estate | VITA Luxury Realty', description: 'Discover luxury homes and waterfront residences in Tampa Bay. Connect with VITA Luxury Realty for personalized guidance on buying or selling your home.' },
  '/properties': { title: 'Luxury Homes & Waterfront Estates | VITA Luxury Realty', description: 'Explore the VITA Luxury Realty property collection. Discover waterfront estates and private residences in Florida and request a private showing.' },
  '/buy': { title: 'Buy a Luxury Home in Tampa Bay | VITA Luxury Realty', description: 'Find your next luxury home in Tampa Bay with personalized buyer representation. Discuss waterfront homes, preferred neighborhoods and private showings.' },
  '/sell': { title: 'Sell Your Tampa Bay Luxury Home | VITA Luxury Realty', description: 'Plan the sale of your Tampa Bay luxury home with VITA Luxury Realty. Explore property valuation, tailored marketing and private seller representation.' },
  '/agents': { title: 'Tampa Bay Real Estate Advisors | VITA Luxury Realty', description: 'Meet the VITA Luxury Realty advisory team. Connect with a real estate advisor for personalized assistance buying or selling a home in Tampa Bay.' },
  '/about': { title: 'About Our Tampa Bay Brokerage | VITA Luxury Realty', description: 'Learn about VITA Luxury Realty, our approach to private client service and our commitment to helping buyers and sellers navigate Tampa Bay real estate.' },
  '/insights': { title: 'Florida Luxury Real Estate Insights | VITA Luxury Realty', description: 'Explore property market insights and perspectives from VITA Luxury Realty to inform your next luxury real estate purchase or sale in Florida.' },
  '/contact': { title: 'Contact a Tampa Bay Real Estate Advisor | VITA', description: 'Contact VITA Luxury Realty to discuss buying or selling a property in Tampa Bay. Request a private consultation, property showing or valuation.' },
  '/join-team': { title: 'Real Estate Careers in Tampa Bay | VITA Luxury Realty', description: 'Explore opportunities to join VITA Luxury Realty in Tampa Bay. Tell us about your real estate experience and apply to join our advisory team.' },
};
export const notFoundSeo: PageSeo = { title: 'Page Not Found | VITA Luxury Realty', description: 'This page could not be found. Explore the VITA Luxury Realty property collection or contact our team for assistance.', noindex: true };
export function normalizePath(path: string) { return path.replace(/\/+$/, '') || '/'; }
export function canonicalUrl(path: string) { return SITE_URL + normalizePath(path); }
export function schemaFor(path: string, seo: PageSeo) {
  const url = canonicalUrl(path);
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': SITE_URL + '/#organization', name: 'VITA Luxury Realty', url: SITE_URL + '/', logo: SITE_URL + '/logo.png' },
    { '@type': 'WebSite', '@id': SITE_URL + '/#website', name: 'VITA Luxury Realty', url: SITE_URL + '/', publisher: { '@id': SITE_URL + '/#organization' } },
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: seo.title, description: seo.description, isPartOf: { '@id': SITE_URL + '/#website' } },
    ...(path === '/' || seo.noindex ? [] : [{ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      ...(path.startsWith('/properties/') ? [{ '@type': 'ListItem', position: 2, name: 'Properties', item: SITE_URL + '/properties' }] : []),
      { '@type': 'ListItem', position: path.startsWith('/properties/') ? 3 : 2, name: seo.title.split(' | ')[0], item: url },
    ] }]),
  ] };
}
