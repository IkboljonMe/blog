"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

interface LanguageSwitcherProps {
  onClose: () => void; // Function type for closing the switcher
  onSelectLanguage: (language: string) => void; // Function type for selecting a language
  selectedLanguage: string; // Currently selected language
}

// Define an array of languages with their respective flags and labels
const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'uz', label: 'Uzbek', flag: '🇺🇿' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onClose, onSelectLanguage, selectedLanguage }) => {
  const router = useRouter(); // Use the router for navigation

  const handleLanguageChange = (language: string) => {
    onSelectLanguage(language); // Select the language
    router.push(`/${language}`); // Change the route to the selected language
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button
        className="absolute top-5 right-5 text-white text-2xl font-bold hover:text-gray-400"
        onClick={onClose} // Calls the onClose function when clicked
      >
        X
      </button>
      <div className="flex flex-col items-start gap-6">
        {languages.map((language) => (
          <div
            key={language.code} // Use the language code as the unique key
            className={classNames("flex items-start gap-3 text-white text-4xl cursor-pointer hover:scale-105 transition-transform", { "bg-gray-800": language.code === selectedLanguage })}
            onClick={() => handleLanguageChange(language.code)} // Call onSelectLanguage with the language code
          >
            <span>{language.flag}</span> {/* Display the flag */}
            <span>{language.label}</span> {/* Display the language label */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
