import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru', 'uz'], // Specify available locales
  defaultLocale: 'en',          // Set default locale to English
  pathnames: {
    '/': '/',
    // '/about': {
    //   en: '/about',
    //   ru: '/о-нас',    // Russian path
    //   uz: '/haqida'    // Uzbek path
    // },  
    // '/blog': {
    //   en: '/blog',
    //   ru: '/rublog',  // Russian path
    //   uz: '/uzblog'     // Uzbek path
    // }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
