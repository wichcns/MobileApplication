import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import th from './th';
import en from './en';
import zh from './zh';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',

  lng: 'en',

  fallbackLng: 'en',

  resources: {
    th,
    en,
    zh,
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
