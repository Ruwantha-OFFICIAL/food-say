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
      iconColor: "#F9BE08",
      sound: "beep.wav",
      presentationOptions: [ "badge", "sound", "banner", "list" ]
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "FIT_XY",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  }
};

export default config;
