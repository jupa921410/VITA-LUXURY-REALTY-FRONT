# Revisi?n SEO ? VITA Luxury Realty

## Alcance y resultado
Revisi?n del proyecto local. Se mantiene el dominio que ya figuraba en el c?digo: https://vitaluxuryrealty.com. No se ha desplegado ni verificado Search Console, posiciones, tr?fico o Core Web Vitals de producci?n. El acceso al dominio p?blico y al navegador integrado no estuvo disponible; no se afirma una validaci?n visual ni una puntuaci?n Lighthouse.

## Cambios implementados
- HTML prerenderizado para las nueve p?ginas principales y una p?gina 404. Incluye contenido real de los componentes, H1, enlaces y metadatos antes de ejecutar JavaScript.
- Configuraci?n central de t?tulos, descripciones, canonical, Open Graph y Twitter; eliminadas las escrituras de t?tulos que compet?an entre componentes.
- JSON-LD Organization, WebSite, WebPage y BreadcrumbList basado en datos del sitio, sin rese?as, precios o calificaciones inventados.
- Sitemap de las nueve rutas principales y robots.txt generados autom?ticamente con cada build.
- Fichas con t?tulo, descripci?n e imagen propios; noindex cuando la b?squeda termina sin encontrar una propiedad; limpieza de solicitudes obsoletas al navegar entre fichas.
- Enlaces de propiedades que respetan el slug de la API; corregida la actualizaci?n del cat?logo cuando llega la respuesta de la API.
- Prioridad de descarga para el p?ster de portada; v?deo 4K desactivado por defecto, en m?viles y con preferencia de movimiento reducido. Carga diferida en im?genes adicionales y preconexi?n a fuentes e im?genes.
- Idioma HTML sincronizado con la preferencia guardada; favicon de la marca.

## Publicaci?n: requisitos del servidor
Publicar todo el directorio dist generado por npm run build. No usar una regla global que entregue siempre index.html.

1. Servir / desde dist/index.html y cada ruta principal desde su propio directorio: por ejemplo /buy desde dist/buy/index.html. Mantener la URL can?nica sin barra final o redirigir sus variantes con 301.
2. Servir /properties/:slug con dist/app.html como shell de las fichas din?micas. Este archivo no contiene el canonical de la portada. Para indexaci?n completa y previews sociales de cada ficha, hace falta SSR o prerender con datos de la API de producci?n.
3. Servir las rutas desconocidas con dist/404.html y c?digo HTTP 404 real. Una etiqueta noindex no sustituye el estado HTTP. Las fichas inexistentes tambi?n deben resolverse a 404 desde el servidor/API en una futura integraci?n SSR.
4. Servir sitemap.xml, robots.txt y assets directamente. Redirigir HTTP y el dominio alternativo hacia el dominio can?nico mediante 301. Activar compresi?n Brotli/gzip y cach? larga para assets con hash; revalidar HTML.
5. Confirmar el dominio en src/lib/seo.ts y el origen de VITE_API_URL antes de compilar. No desplegar la API local 127.0.0.1 como origen de producci?n.
6. Enviar /sitemap.xml a Google Search Console y comprobar una URL de cada plantilla con Inspecci?n de URLs.

npm run preview replica las rutas est?ticas y la respuesta 404 para revisi?n local; su middleware no configura el hosting de producci?n.

## Pendientes ordenados por impacto
| Prioridad | Hallazgo | Acci?n |
| --- | --- | --- |
| Alta | Los componentes conservan propiedades, asesores, cifras y art?culos de respaldo con fotos de stock. El prerender usa esos datos iniciales; las llamadas API suceden despu?s en el navegador. | Validar y sustituir los datos de ejemplo antes de publicar. Integrar los datos reales en el renderizado de servidor/build; no presentar informaci?n ficticia como inventario disponible. |
| Alta | Las fichas de la API no se prerenderizan ni se incluyen en el sitemap est?tico. | A?adir SSR o generaci?n a partir del inventario p?blico real y un sitemap din?mico; actualizarlo al publicar, vender o retirar inmuebles. |
| Alta | La optimizaci?n est? hecha en el c?digo, sin acceso a la configuraci?n de producci?n. | Aplicar las reglas de servidor indicadas y verificar estados HTTP, canonical, redirecciones e indexaci?n. |
| Media | Bundle de entrada de aproximadamente 554 kB antes de gzip; im?genes locales de aproximadamente 709?743 kB. | Medir LCP, INP y CLS en producci?n; convertir fotograf?as a AVIF/WebP con variantes responsive y separar carga de rutas si los datos lo justifican. |
| Media | El selector ES cambia textos en la misma URL; varias p?ginas siguen en ingl?s. | Si se busca captar b?squedas en espa?ol, crear /es/ con traducci?n completa, canonical propio y hreflang rec?proco. No a?adir hreflang hacia URLs inexistentes. |
| Media | Insights presenta contenido resumido sin un sistema completo de URLs de art?culos. | Publicar art?culos con URL propia, autor verificable y contenido completo antes de a?adir Article schema. |
| Media | No se verificaron los datos comerciales. | Confirmar nombre, direcci?n y tel?fono; mantenerlos consistentes con Google Business Profile y a?adir RealEstateAgent/LocalBusiness con datos confirmados. |

## Oportunidades de contenido
Punto de partida basado en el enfoque del sitio, no en estimaciones de volumen ni rankings: Tampa Bay luxury homes, Tampa Bay waterfront homes, South Tampa luxury homes, Clearwater waterfront homes, St. Petersburg luxury real estate, Davis Islands homes, Hyde Park Tampa homes, Tampa Bay luxury real estate agents, sell a luxury home in Tampa, Tampa Bay property valuation, buying waterfront property in Tampa Bay, Tampa Bay relocation guide, Clearwater Beach condos, luxury homes with private docks in Tampa Bay y casas de lujo en Tampa Bay.
Priorizar p?ginas locales ?tiles con inventario real, informaci?n original del equipo y enlaces desde p?ginas relacionadas. Evitar p?ginas masivas que s?lo cambien el nombre de la ciudad. No se comparan competidores ni se inventan dificultad, autoridad, backlinks o tr?fico sin datos verificables.

## Comprobaciones reproducibles
- npm run build: TypeScript, build cliente y prerender de nueve rutas m?s 404.
- npm run lint: sin errores; puede permanecer el aviso preexistente Fast Refresh de LanguageContext.
- Con npm run preview -- --host 127.0.0.1 activo: node scripts/verify-seo.mjs.
- El verificador comprueba metadatos ?nicos, H1 ?nico, canonical, Open Graph, JSON-LD, existencia de assets, contenido prerenderizado, respuestas locales, sitemap, shell din?mico y ausencia del v?deo 4K en el HTML inicial.

## Referencias
- [Google: SEO para JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: canonical y URLs duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: generar y enviar sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
