import getConfig from 'next/config';

export type RuntimeEnvs = {
  publicRuntimeConfig: {
    GA_TRACKING_ID: string;
    FASTER_API_KEY: string;
    TRACKJS_TOKEN: string;
    TRACKJS_APPLICATION: string;
    BASE_URL: string;
  };
};

export const { publicRuntimeConfig: ENVS }: RuntimeEnvs = getConfig();
