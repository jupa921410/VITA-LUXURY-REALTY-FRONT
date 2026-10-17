// Load once per page visit; refreshing picks up changes without rebuilding.
let configPromise: Promise<string> | undefined;

async function getApiBaseUrl(): Promise<string> {
  const developmentUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : undefined;
  if (developmentUrl?.trim()) return developmentUrl.trim().replace(/\/+$/, '');

  configPromise ??= fetch('/config.json', { cache: 'no-store' })
    .then(async (response) => {
      if (!response.ok) throw new Error('No se pudo cargar config.json.');
      const config = await response.json();
      const value = typeof config.apiUrl === 'string' ? config.apiUrl.trim() : '';
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
        throw new Error('La URL del backend en config.json no es valida.');
      }
      return value.replace(/\/+$/, '');
    })
    .catch((error) => {
      configPromise = undefined;
      throw error;
    });
  return configPromise;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const API_BASE_URL = await getApiBaseUrl();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validationErrors = payload.errors ? Object.values(payload.errors).flat().join(' ') : '';
    throw new Error(validationErrors || payload.message || 'No se pudo completar la solicitud.');
  }

  return payload as T;
}

