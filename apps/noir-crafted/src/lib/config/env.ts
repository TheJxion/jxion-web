const rawEnv =
  typeof import.meta !== 'undefined' ? (import.meta as any).env || {} : {};

const normalize = (value?: string) => {
  if (!value) return '';
  return value.endsWith('/') ? value.slice(0, -1) : value;
};

const coalesce = (value?: string, fallback?: string) => {
  if (value === undefined || value === null || value === '') {
    return fallback ?? '';
  }
  return value;
};

const ensureContentPath = (value: string) => {
  if (!value) return value;
  if (value.endsWith('/api/content') || value.endsWith('/content')) {
    return value;
  }
  return `${value}/api/content`;
};

export const API_BASE_URL = normalize(
  coalesce(rawEnv.VITE_API_URL, 'http://localhost:8080'),
);

const resolvedContentBase = ensureContentPath(
  normalize(
    coalesce(rawEnv.VITE_CONTENT_API_URL, `${API_BASE_URL}/api/content`),
  ),
);

export const CONTENT_API_BASE = resolvedContentBase;

export const EVENTS_API_URL = normalize(
  coalesce(rawEnv.VITE_EVENTS_URL, `${API_BASE_URL}/api/events`),
);

export const DEFAULT_CONTENT_PATH = 'noir-crafted/content.json';
