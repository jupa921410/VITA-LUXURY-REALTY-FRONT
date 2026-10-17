import { build } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

await build({ build: { ssr: 'src/entry-server.tsx', outDir: 'node_modules/.tmp/seo', emptyOutDir: true } });
const { render, pages, schemaFor, SITE_URL, canonicalUrl, notFoundSeo } = await import(pathToFileURL(resolve('node_modules/.tmp/seo/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
const escape = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function head(path, seo) {
  const url = canonicalUrl(path);
  const meta = (key, value, property = false) => '<meta ' + (property ? 'property' : 'name') + '="' + key + '" content="' + escape(value) + '" />';
  return [
    '<title>' + escape(seo.title) + '</title>', meta('description', seo.description),
    meta('robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    '<link rel="canonical" href="' + url + '" />',
    ...Object.entries({ type: 'website', site_name: 'VITA Luxury Realty', title: seo.title, description: seo.description, url, image: SITE_URL + '/logo.png', 'image:alt': 'VITA Luxury Realty' }).map(([k,v]) => meta('og:' + k,v,true)),
    ...Object.entries({ card: 'summary_large_image', title: seo.title, description: seo.description, image: SITE_URL + '/logo.png' }).map(([k,v]) => meta('twitter:' + k,v)),
    '<script id="seo-schema" type="application/ld+json">' + JSON.stringify(schemaFor(path,seo)).replace(/</g,'\u003c') + '</script>',
  ].join('\n    ');
}
for (const [path, seo] of [...Object.entries(pages), ['/404', notFoundSeo]]) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, '')
    .replace(/<link rel="canonical"[^>]*>/g, '')
    .replace('</head>', head(path, seo) + '\n  </head>')
    .replace('<div id="root"></div>', () => '<div id="root">' + render(path) + '</div>');
  const destination = path === '/404' ? 'dist/404.html' : join('dist', path === '/' ? '' : path.slice(1), 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
// Dynamic listings receive a neutral shell, never the home page canonical or content.
await writeFile('dist/app.html', template
  .replace(/<link rel="canonical"[^>]*>/g, '')
  .replace(/<meta property="og:url"[^>]*>/g, '')
  .replace(/<title>[\s\S]*?<\/title>/g, '<title>Property Details | VITA Luxury Realty</title>'));
// Live properties must be supplied by a production API-backed sitemap, not demo data.
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.keys(pages).map(path => '  <url><loc>' + canonicalUrl(path) + '</loc></url>').join('\n') + '\n</urlset>\n');
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE_URL + '/sitemap.xml\n');
console.log('SEO: generated ' + Object.keys(pages).length + ' pages, 404.html, sitemap.xml and robots.txt.');
