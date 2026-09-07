import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.foodsay.ruwantha',
  appName: 'food say',
  webDir: 'dist',
  server:{
    androidScheme: "https"
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_app_icon",
      sound: "beep.wav",
      presentationOptions: [ "badge", "sound", "banner", "list" ]
    }
  }
};

export default config;
