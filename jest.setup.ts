import '@testing-library/jest-dom/extend-expect';

import './src/locales';

import { Aboyeur } from '@ifood/aboyeur';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    GA_TRACKING_ID: '',
    FASTER_API_KEY: '',
    TRACKJS_TOKEN: '',
    TRACKJS_APPLICATION: '',
  },
}));

beforeEach(() => {
  Aboyeur.cleanup();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./src/config/aboyeur').initializeAboyeur({ isTest: true });
});
