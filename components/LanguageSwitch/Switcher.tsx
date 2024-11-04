'use client'
import React from 'react'
import classNames from 'classnames'
import { Link, usePathname } from '../../i18n/routing'
import { IoClose } from 'react-icons/io5'

interface SwitcherProps {
  onClose: () => void

  selectedLanguage: string
}

// Define an array of languages with their respective flags and labels
const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'uz', label: 'Uzbek', flag: '🇺🇿' },
]

const Switcher: React.FC<SwitcherProps> = ({ onClose, selectedLanguage }) => {
  const pathname = usePathname() // Get the current pathname

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <button
        className="absolute right-5 top-5 text-3xl font-bold text-white hover:text-gray-400"
        onClick={onClose}
      >
        <IoClose />
      </button>
      <div className="flex flex-col items-start gap-6">
        {languages.map((language) => (
          <Link
            key={language.code}
            href={pathname} // Use the current pathname
            locale={language.code} // Set the locale to the selected language
            className={classNames(
              'flex cursor-pointer items-start gap-3 text-4xl text-white transition-transform hover:scale-105',
              {
                'bg-gray-800': language.code === selectedLanguage,
              }
            )}
          >
            <span>{language.flag}</span>
            <span>{language.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Switcher
