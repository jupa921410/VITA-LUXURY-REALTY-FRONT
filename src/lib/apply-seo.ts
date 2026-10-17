import { SITE_URL, canonicalUrl, schemaFor, type PageSeo } from './seo';

export function applySeo(path: string, seo: PageSeo) {
  document.title = seo.title;
  const setMeta = (key: string, content: string, property = false) => {
    const attribute = property ? 'property' : 'name';
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); }
    element.content = content;
  };
  setMeta('description', seo.description);
  setMeta('robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  for (const [key, value] of Object.entries({ type: 'website', site_name: 'VITA Luxury Realty', title: seo.title, description: seo.description, url: canonicalUrl(path), image: seo.image || SITE_URL + '/logo.png', 'image:alt': seo.image ? seo.title : 'VITA Luxury Realty' })) setMeta('og:' + key, value, true);
  for (const [key, value] of Object.entries({ card: 'summary_large_image', title: seo.title, description: seo.description, image: seo.image || SITE_URL + '/logo.png' })) setMeta('twitter:' + key, value);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = canonicalUrl(path);
  let schema = document.getElementById('seo-schema');
  if (!schema) { schema = document.createElement('script'); schema.id = 'seo-schema'; schema.setAttribute('type', 'application/ld+json'); document.head.appendChild(schema); }
  schema.textContent = JSON.stringify(schemaFor(path, seo)).replace(/</g, '\\u003c');
}
