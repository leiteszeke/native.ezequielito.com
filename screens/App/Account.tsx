import { FontAwesome5 } from "@expo/vector-icons";
import { Box, Button, Center } from "native-base";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default function AccountScreen() {
  const { logout } = useAuth();

  return (
    <Box flex={1} p={4} safeArea>
      <Center flex={1}>
        <Button
          size="md"
          onPress={logout}
          leftIcon={
            <FontAwesome5 name="sign-out-alt" size={20} color="white" />
          }
        >
          Logout
        </Button>
      </Center>
    </Box>
  );
}
