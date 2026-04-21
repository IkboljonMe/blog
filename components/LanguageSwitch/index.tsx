'use client'
import { useLocale } from 'next-intl'
import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { Link, usePathname } from '../../i18n/routing'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
]

const LanguageSwitch: React.FC = () => {
  const initialLocale = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 font-semibold tracking-wide text-gray-900 dark:text-gray-100 hover:text-primary-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {languages.find((l) => l.code === initialLocale)?.label || 'EN'}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={pathname}
                locale={language.code}
                onClick={() => setIsOpen(false)}
                className={classNames(
                  initialLocale === language.code
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300',
                  'block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
                role="menuitem"
                tabIndex={-1}
              >
                {language.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitch
