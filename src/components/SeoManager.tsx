import { applySeo } from '../lib/apply-seo';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { normalizePath, pages, notFoundSeo } from '../lib/seo';

export default function SeoManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = normalizePath(pathname);
    // PropertyDetail owns metadata after resolving the requested listing.
    if (!path.startsWith('/properties/') && !path.startsWith('/insights/')) applySeo(path, pages[path] || notFoundSeo);
  }, [pathname]);
  return null;
}
