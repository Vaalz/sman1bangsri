const FALLBACK_API_URL = 'http://localhost:8000/api';

const hasHttpProtocol = (value) => /^https?:\/\//i.test(value);

export const normalizeApiBaseUrl = (rawUrl) => {
  const input = (rawUrl || '').trim();
  if (!input) return FALLBACK_API_URL;

  const withProtocol = hasHttpProtocol(input) ? input : `https://${input}`;
  const noTrailingSlash = withProtocol.replace(/\/+$/, '');

  // Ensure all API calls hit Laravel API prefix even if env omits /api.
  if (/\/api$/i.test(noTrailingSlash)) {
    return noTrailingSlash;
  }

  return `${noTrailingSlash}/api`;
};

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
