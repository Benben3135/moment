import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n/config';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  // Add this to help with routing
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Enable language detection for all pages
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Enable language detection for all image routes
    '/(.*?trpc.*?|.*?api.*?|.*?auth.*?)',
  ]
};