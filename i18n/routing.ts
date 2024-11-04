import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru', 'uz'], // Specify available locales
  defaultLocale: 'en',          // Set default locale to English
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      ru: '/о-нас',    // Russian path
      uz: '/haqida'    // Uzbek path
    },  
    '/contact': {
      en: '/contact',
      ru: '/контакт',  // Russian path
      uz: '/aloqa'     // Uzbek path
    }
    // Add more paths as needed with translations
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
