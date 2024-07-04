import { Aboyeur } from '@ifood/aboyeur';
import { FasterMetadata, FasterPlugin } from '@ifood/aboyeur-plugin-faster';
import { GoogleAnalyticsMetadata, GoogleAnalyticsPlugin } from '@ifood/aboyeur-plugin-ga';
import { TrackJsMetadata, TrackJsPlugin } from '@ifood/aboyeur-plugin-trackjs';

import pkg from '../../package.json';
import { ENVS } from './envs';

const PLUGINS = {
  [GoogleAnalyticsPlugin.displayName]: GoogleAnalyticsPlugin,
  [TrackJsPlugin.displayName]: TrackJsPlugin,
  [FasterPlugin.displayName]: FasterPlugin,
};

type AboyeurMetadata = TrackJsMetadata & GoogleAnalyticsMetadata & FasterMetadata;

export const ABOYEUR_METADATA: AboyeurMetadata = {
  googleAnalytics: {
    trackingId: `${ENVS.GA_TRACKING_ID}`,
  },
  faster: {
    version: pkg.version,
    secret: ``,
    apiKey: `${ENVS.FASTER_API_KEY}`,
  },
  trackjs: {
    version: pkg.version,
    token: `${ENVS.TRACKJS_TOKEN}`,
    application: `${ENVS.TRACKJS_APPLICATION}`,
  },
};

function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function initializeAboyeur({ isTest } = { isTest: false }) {
  const dryRun = isDevelopment();

  Aboyeur.initialize(ABOYEUR_METADATA, PLUGINS, { isTest, dryRun });
}
