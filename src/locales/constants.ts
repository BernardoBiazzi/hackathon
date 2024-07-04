export const LOCALES = {
  BRAZIL: 'pt-BR',
} as const;

export const LOCALE_COUNTRIES = {
  [LOCALES.BRAZIL]: 'BR',
} as const;

export const DEFAULT_LOCALE = LOCALES.BRAZIL;

export type Locale = typeof LOCALES[keyof typeof LOCALES];
export type Country = typeof LOCALE_COUNTRIES[keyof typeof LOCALE_COUNTRIES];
