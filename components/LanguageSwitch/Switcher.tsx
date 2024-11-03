// src/components/LanguageSwitch/Switcher.tsx
import React from 'react';

interface LanguageSwitcherProps {
  onClose: () => void; // Function type for closing the switcher
  onSelectLanguage: (language: string) => void; // Function type for selecting a language
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onClose, onSelectLanguage }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button
        className="absolute top-5 right-5 text-white text-2xl font-bold hover:text-gray-400"
        onClick={onClose} // Calls the onClose function when clicked
      >
        X
      </button>
      <div className="flex flex-col items-center gap-6">
        <div
          className="flex items-center gap-3 text-white text-4xl cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelectLanguage('en')}
        >
          <span>🇺🇸</span>
          <span>English</span>
        </div>
        <div
          className="flex items-center gap-3 text-white text-4xl cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelectLanguage('ru')}
        >
          <span>🇷🇺</span>
          <span>Russian</span>
        </div>
        <div
          className="flex items-center gap-3 text-white text-4xl cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelectLanguage('uz')}
        >
          <span>🇺🇿</span>
          <span>Uzbek</span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
