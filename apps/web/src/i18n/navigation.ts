// src/i18n/navigation.ts
import { createNavigation  } from 'next-intl/navigation';
import { locales, pathnames } from './config';

export const { Link, redirect, usePathname, useRouter } = createNavigation ({
  locales,
  pathnames
});