import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, LOCALES } from './constants';
import ptBR from './messages/pt-BR.json';

export const resources = {
  [LOCALES.BRAZIL]: ptBR,
} as const;

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: DEFAULT_LOCALE,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
});
