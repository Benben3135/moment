// src/i18n/config.ts
export const defaultLocale = 'en';
export const locales = ['en', 'es', 'fr'] as const;

export const pathnames = {
  '/': '/',
  '/settings': '/settings',
  // Add other routes as needed
} as const;

export const localePrefix = 'always'; // Default: 'always'