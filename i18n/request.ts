// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from 'i18n/routing'; // Adjust the import based on your routing setup

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale; // Set your default locale here
  }

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default, // Adjust the path to your translations folder
  };
});
