import Constants from 'expo-constants';

export const HOST_IP =
  Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';

export const BACKEND_PORT = 3000;
export const BACKEND_STAGE = 'dev';
export const BACKEND_URL = `http://${HOST_IP}:${BACKEND_PORT}/${BACKEND_STAGE}`;
export const AUTO_REFRESH_INTERVAL_MS = 12000;
