import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.foodsay.ruwantha',
  appName: 'food say',
  webDir: 'dist',
  loggingBehavior: 'production',
  server:{
    androidScheme: "https"
  },
  android:{
    buildOptions:{
      keystorePath: "release_key.jks",
      keystorePassword: "lasithruwantha2008@",
      keystoreAlias: 'key0',
      keystoreAliasPassword:"lasithruwantha2008@",
      releaseType: "APK",
      signingType: "apksigner"
    }
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "notification_image",
      iconColor: "#EFD30B",
      sound: "beep.wav",
      presentationOptions: [ "badge", "sound", "banner", "list" ]
    }
  }
};

export default config;
