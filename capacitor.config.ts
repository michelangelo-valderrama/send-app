import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.send.app',
  appName: 'Send',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
