export const DEFAULT_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';

export const BACKEND_FALLBACK_ORIGIN = 'https://admin.vitaluxuryrealty.com';

function getBackendOrigin(): string {
  const envApi = import.meta.env.VITE_API_URL;
  if (envApi && typeof envApi === 'string' && envApi.trim()) {
    try {
      return new URL(envApi.trim()).origin;
    } catch {
      // fallback below
    }
  }
  return BACKEND_FALLBACK_ORIGIN;
}

/**
 * Resolves any property image URL coming from the API, seeders, or storage.
 * Handles localhost remapping, mixed content (http -> https),
 * and relative storage paths.
 */
export function resolvePropertyImageUrl(rawUrl?: string | null): string {
  if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return DEFAULT_PROPERTY_IMAGE;
  }

  let url = rawUrl.trim();

  // If URL has localhost or 127.0.0.1, extract path and point to correct host
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(url)) {
    try {
      const parsed = new URL(url);
      const pathname = parsed.pathname;

      // If it points to local static images, keep relative to front public
      if (pathname.startsWith('/images/')) {
        return pathname;
      }

      // If it points to storage, route to the backend domain
      if (pathname.startsWith('/storage/')) {
        return `${getBackendOrigin()}${pathname}`;
      }

      return `${getBackendOrigin()}${pathname}${parsed.search}`;
    } catch {
      return DEFAULT_PROPERTY_IMAGE;
    }
  }

  // Enforce HTTPS if pointing to the admin backend or loaded on HTTPS page
  if (url.startsWith('http://admin.vitaluxuryrealty.com')) {
    url = 'https://' + url.slice('http://'.length);
  }

  // Relative storage path: points to Laravel backend storage
  if (url.startsWith('/storage/')) {
    return `${getBackendOrigin()}${url}`;
  }
  if (url.startsWith('storage/')) {
    return `${getBackendOrigin()}/${url}`;
  }

  // Relative /images/ path: available directly in frontend public
  if (url.startsWith('/images/')) {
    return url;
  }
  if (url.startsWith('images/')) {
    return `/${url}`;
  }

  return url;
}

export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallback: string = DEFAULT_PROPERTY_IMAGE
) {
  const target = event.currentTarget;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
