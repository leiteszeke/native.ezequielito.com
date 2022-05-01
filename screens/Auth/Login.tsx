import { Button, Box, Center } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { useAuth } from "../../hooks/useAuth";
import * as WebBrowser from "expo-web-browser";

const { expoClientId, iosClientId, androidClientId, webClientId } =
  Constants.manifest?.extra ?? {};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { setUser } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setUser({
        name: "Ezequiel",
        lastname: "Leites",
        email: "ezequiel@leites.dev",
        id: 1,
      });
    }
  }, [response]);

  const login = () => {
    promptAsync();
  };

  return (
    <Box flex={1} p={4} safeArea>
      <Center flex={1}>
        <Button
          disabled={!request}
          size="md"
          onPress={login}
          leftIcon={<FontAwesome5 name="google" size={20} color="white" />}
        >
          Login with Google
        </Button>
      </Center>
    </Box>
  );
}
