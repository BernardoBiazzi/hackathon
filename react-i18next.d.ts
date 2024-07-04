import 'react-i18next';

import { DEFAULT_LOCALE } from './src/locales/constants';
import locale from './src/locales/messages/pt-BR.json';

declare module 'react-i18next' {
  type DefaultResources = typeof locale;
  type Resources = DefaultResources;
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: DEFAULT_LOCALE;
    resources: typeof locale;
  }
}
