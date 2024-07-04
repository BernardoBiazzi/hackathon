const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const ENVS = {
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID || '',
  FASTER_API_KEY: process.env.NEXT_PUBLIC_FASTER_API_KEY || '',
  TRACKJS_TOKEN: process.env.NEXT_PUBLIC_TRACKJS_TOKEN || '',
  TRACKJS_APPLICATION: process.env.NEXT_PUBLIC_TRACKJS_APPLICATION || '',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
};

const customConfig = {
  i18n: {
    localeDetection: false,
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  reactStrictMode: true,
  publicRuntimeConfig: ENVS,
  experimental: {
    styledComponents: true,
  },
};

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  ...customConfig,
});
