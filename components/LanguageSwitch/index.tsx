// src/components/LanguageSwitch/index.tsx
import React, { useState } from 'react';
import LanguageSwitcher from './Switcher';

const LanguageSwitch: React.FC = () => {
  const [isLanguageSwitcherOpen, setIsLanguageSwitcherOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Default to English

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageSwitcherOpen(false);
  };

  const handleClose = () => {
    setIsLanguageSwitcherOpen(false);
  };

  // Function to get the flag emoji based on the selected language
  const getFlagEmoji = (language: string) => {
    switch (language) {
      case 'en':
        return '🇺🇸'; // US flag
      case 'ru':
        return '🇷🇺'; // Russian flag
      case 'uz':
        return '🇺🇿'; // Uzbek flag
      default:
        return '🇺🇸'; // Default to US flag
    }
  };

  return (
    <div className="flex center">
      <div
        className="cursor-pointer"
        onClick={() => setIsLanguageSwitcherOpen(true)} // Open the switcher when clicked
      >
        {getFlagEmoji(selectedLanguage)} {/* Display selected language flag */}
      </div>
      {isLanguageSwitcherOpen && (
        <LanguageSwitcher
          onClose={handleClose} // Pass handleClose to the LanguageSwitcher
          onSelectLanguage={handleLanguageSelect}
        />
      )}
    </div>
  );
};

export default LanguageSwitch;
