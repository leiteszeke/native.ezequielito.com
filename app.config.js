import "dotenv/config";

const {
  API_URL: apiURL,
  GCLIENT_EXPO: expoClientId,
  GCLIENT_IOS: iosClientId,
  GCLIENT_ANDROID: androidClientId,
  GCLIENT_WEB: webClientId,
} = process.env;

export default {
  expo: {
    name: "Ezequielito",
    slug: "ezequielito",
    version: "0.0.1",
    owner: "leites25",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ezequielito",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    extra: {
      apiURL,
      expoClientId,
      iosClientId,
      androidClientId,
      webClientId,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.leiteszeke.ezequielito",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.leites25.ezequielito",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
  },
};
