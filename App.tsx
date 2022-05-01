import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import React from "react";
import AnimatedSplash from "./Splash";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import localhost from "react-native-localhost";
import { Platform } from "react-native";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: `https://${
    Platform.OS === "web" ? "localhost" : localhost
  }:4000/graphql`,
  cache: new InMemoryCache(),
});

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <AnimatedSplash>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </AnimatedSplash>
  );
}
