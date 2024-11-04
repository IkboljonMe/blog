import { useLocale } from 'next-intl'
import React, { useEffect, useState } from 'react'
import LanguageSwitcher from './Switcher'

const LanguageSwitch: React.FC = () => {
  const initialLocale = useLocale() // Get the current locale
  const [isLanguageSwitcherOpen, setIsLanguageSwitcherOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(initialLocale) // Initialize with the full locale

  useEffect(() => {
    setSelectedLanguage(initialLocale) // Update if initialLocale changes
  }, [initialLocale])

  const handleClose = () => {
    setIsLanguageSwitcherOpen(false)
  }

  const getFlagEmoji = (language: string) => {
    switch (language) {
      case 'en':
        return '🇺🇸'
      case 'ru':
        return '🇷🇺'
      case 'uz':
        return '🇺🇿'
      default:
        return '🇺🇸' // Default to US flag
    }
  }

  return (
    <div className="center flex">
      <div
        className="cursor-pointer"
        onClick={() => setIsLanguageSwitcherOpen(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsLanguageSwitcherOpen(true)}
        role="button"
        tabIndex={0} // Makes the div focusable
      >
        {getFlagEmoji(selectedLanguage)} {/* Display selected language flag */}
      </div>
      {isLanguageSwitcherOpen && (
        <LanguageSwitcher onClose={handleClose} selectedLanguage={selectedLanguage} />
      )}
    </div>
  )
}

export default LanguageSwitch
