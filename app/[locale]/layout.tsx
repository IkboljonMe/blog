import '@/css/prism.css'
import '@/css/tailwind.css'
import '@fontsource/mukta'

import Analytics from '@/components/Analytics'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LogRocket from '@/components/LogRocket'
import LenisProvider from '@/components/Providers/LenisProvider'
import ThemeProvider from '@/components/Providers/ThemeProvider'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

export const metadata = {
  title: 'Ikboljon Abdurasulov',
  description: 'I build things for the web.',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = useLocale()
  if (params.locale !== locale) {
    notFound()
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Header />
            <LenisProvider>
              <main>{children}</main>
            </LenisProvider>
            <Footer />
            <LogRocket />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
