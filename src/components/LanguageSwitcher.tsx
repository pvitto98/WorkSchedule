// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css'; // Importa il modulo CSS

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.button}
        onClick={() => handleLanguageChange('en')}
      >
        <span role="img" aria-label="English">🇬🇧</span> English
      </button>
      <button
        className={styles.button}
        onClick={() => handleLanguageChange('it')}
      >
        <span role="img" aria-label="Italian">🇮🇹</span> Italiano
      </button>
    </div>
  );
};

export default LanguageSwitcher;
