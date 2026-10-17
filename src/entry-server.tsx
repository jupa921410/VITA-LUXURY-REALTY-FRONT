/* oxlint-disable react/only-export-components -- Build-only server entry, not a Fast Refresh module. */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
export { pages, schemaFor, SITE_URL, canonicalUrl, notFoundSeo } from './lib/seo';
export function render(path: string) {
  return renderToString(<LanguageProvider><StaticRouter location={path}><App /></StaticRouter></LanguageProvider>);
}
