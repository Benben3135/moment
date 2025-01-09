import { createNavigation  } from 'next-intl/navigation';

export const locales = ['en', 'es', 'fr'] as const;

export const navigation = createNavigation ({
  locales,
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      es: '/sobre',
      fr: '/a-propos'
    }
    // Add more routes as needed
  }
});