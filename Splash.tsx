import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Animated, View, StyleSheet } from "react-native";

const image = require("./assets/images/splash.png");

const AnimatedSplash = ({ children }: PropsWithChildren<{}>) => {
  const [isSplashReady, setSplashReady] = useState(false);

  const startAsync = useCallback(
    // If you use a local image with require(...), use `Asset.fromModule`
    async () => {
      await SplashScreen.preventAutoHideAsync();

      Asset.fromModule(image).downloadAsync();
    },
    []
  );

  const onFinish = useCallback(() => setSplashReady(true), []);

  const startLoading = async () => {
    try {
      SplashScreen.preventAutoHideAsync();

      await startAsync();

      onFinish();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    startLoading();
  }, []);

  return <Splash image={image}>{children}</Splash>;
};

function Splash({ children, image }: PropsWithChildren<{ image?: any }>) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest?.splash?.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest?.splash?.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default AnimatedSplash;
