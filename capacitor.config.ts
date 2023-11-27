import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.themisbar.com',
  appName: 'themisbar',
  webDir: 'dist/themisbar',
  server: {
    androidScheme: 'https'
  }
};

export default config;
