import React from "react";

import {
  Box,
  Text,
  FlatList,
  Pressable,
  Badge,
  Flex,
  HStack,
  Spacer,
} from "native-base";
import AppLoading from "expo-app-loading";
import { useQuery } from "@apollo/client";
import api from "../../api";

export default function TasksScreen() {
  const { data, loading } = useQuery(api.Task.all, {
    variables: { filters: { status: ["in_progress", "to_do"] } },
  });

  if (loading) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: any) => {
    return (
      <Pressable marginBottom={4}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              maxW="96"
              borderWidth="1"
              borderColor="coolGray.300"
              shadow="3"
              bg={
                isPressed
                  ? "coolGray.200"
                  : isHovered
                  ? "coolGray.200"
                  : "coolGray.100"
              }
              p="3"
              rounded="8"
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
            >
              <HStack alignItems="center">
                <Badge
                  colorScheme="darkBlue"
                  _text={{
                    color: "white",
                  }}
                  variant="solid"
                  rounded="4"
                >
                  {item.status}
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  {item.project.name}
                </Text>
              </HStack>
              <Text
                color="coolGray.800"
                mt="3"
                fontWeight="medium"
                fontSize="xl"
              >
                {item.name}
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700">
                {item.desc}
              </Text>
            </Box>
          );
        }}
      </Pressable>
    );
  };

  return (
    <Box flex={1} p={4} safeArea>
      <FlatList data={data.tasks} renderItem={renderItem} />
    </Box>
  );
}
