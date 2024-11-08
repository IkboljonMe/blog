'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import CommandPalette from './CommandPalette/CommandPalette'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitch from './LanguageSwitch'

export default function Header() {
  const pathName = usePathname()
  const t = useTranslations('NavLinks') // Access NavLinks translations

  // Define links directly with translation keys
  const navLinks = [
    { href: t('blog.href'), title: t('blog.title') },
    { href: t('repos.href'), title: t('repos.title') },
    { href: t('about.href'), title: t('about.title') },
  ]

  return (
    <SectionContainer>
      <header className="z-40 bg-transparent py-5 md:py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <Link
              href="/"
              className={classNames(' hidden text-3xl font-extrabold sm:block', {
                'horizontal-underline-active': pathName === '/',
              })}
              aria-label="d."
            >
              Ikboljon<span className="underline-magical">Me</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 text-base leading-5">
            <div className="hidden space-x-5 sm:flex">
              {navLinks.map(({ title, href }) => {
                const active = pathName?.includes(href)
                return (
                  <Link
                    prefetch
                    key={title}
                    href={href}
                    className={classNames('horizontal-underline text-base', {
                      'horizontal-underline-active': active,
                    })}
                    aria-label={title}
                  >
                    <span className="font-semibold tracking-wide text-gray-900 dark:text-gray-100">
                      {title}
                    </span>
                  </Link>
                )
              })}
            </div>
            <LanguageSwitch />
            <div className="flex items-center">
              <CommandPalette />
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </SectionContainer>
  )
}
