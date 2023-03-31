import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation.json';

const resources = {
  en: {
    translation: translationEn,
  },
};

i18next.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  debug: true,
  resources,
});
