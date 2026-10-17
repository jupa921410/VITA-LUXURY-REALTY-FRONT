# React + TypeScript + Vite

## Backend API

The frontend consumes the public Laravel API from `VITA-LUXURY-REALTY-BACK`.
For local development, copy `.env.example` to `.env` and set `VITE_API_URL`. Production reads the editable `dist/config.json` at runtime.

```bash
copy .env.example .env
npm install
npm run dev
```

Connected public flows include properties and property details, featured homepage listings, the real estate agent directory, contact leads, agent applications, published Journal posts, and Journal subscriptions through the contact lead endpoint.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


## SEO y publicaci?n

`npm run build` genera HTML por ruta, `404.html`, `app.html`, `sitemap.xml` y `robots.txt`. Consulta [la auditor?a y los requisitos del hosting](docs/SEO-AUDIT.md) antes de publicar. Para verificar el resultado, inicia `npm run preview -- --host 127.0.0.1` y ejecuta `node scripts/verify-seo.mjs`.

## Configuracion del backend

En produccion, edita `dist/config.json` (o `config.json` en la raiz del sitio publicado):

```json
{
  "apiUrl": "https://admin.vitaluxuryrealty.com/api"
}
```

Incluye el sufijo /api. Guarda el archivo y recarga la pagina: no necesitas recompilar ni modificar los HTML. La configuracion se carga una vez por visita, sin cache del navegador. Apache tambien recibe la regla no-store; si utilizas CDN, excluye /config.json de su cache.

public/config.json es la plantilla que Vite copia a dist al compilar. Los futuros builds reemplazan dist/config.json con esa plantilla: conserva la URL del hosting al volver a desplegar o actualiza tambien public/config.json.

En desarrollo, .env con VITE_API_URL tiene prioridad; reinicia npm run dev despues de editarlo. En produccion .env no interviene ni debe publicarse. config.json es publico y solo debe contener la URL, sin credenciales.

Todas las solicitudes pasan por src/lib/api.ts: propiedades y detalle (/properties), agentes (/real-estate-agents), testimonios de imagen/video (/testimonios-media), contacto, compra y suscripciones (/contact), postulaciones (/agent-applications) y publicaciones (/posts). Los testimonios se ocultan si no hay resultados o la API falla. La lista de propiedades conserva sus datos de demostracion como respaldo ante errores. Los agentes se muestran exclusivamente desde el backend, con estados de carga, lista vacia y error. El backend debe permitir el origen del frontend en su configuracion CORS.

## Correccion de redirecciones Apache

Si /insights/ redirige a /insights y este vuelve a /insights/, publica el archivo dist/.htaccess actualizado en la raiz del hosting, junto a index.html. DirectorySlash Off desactiva la barra automatica de Apache; las reglas sirven internamente el HTML de cada ruta y mantienen las URLs canonicas sin barra. No hace falta recompilar para publicar esta correccion. public/.htaccess conserva el cambio para futuros builds.

Comprueba con curl -IL --max-redirs 5 https://vitaluxuryrealty.com/insights/: debe terminar en 200 despues de una redireccion a /insights. Repite con properties, buy, sell, agents, about, contact y join-team. Si persiste tras sustituir el archivo, revisa reglas heredadas o redirecciones del panel del hosting. Prueba en una ventana privada para evitar redirecciones 301 antiguas guardadas por el navegador.
