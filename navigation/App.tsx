import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AccountScreen from "../screens/App/Account";
import HomeScreen from "../screens/App/Home";
import TasksScreen from "../screens/App/Tasks";
import { AppParamList } from "../types";

const AppStack = createBottomTabNavigator<AppParamList>();

export default function AppNavigator() {
  const colorScheme = useColorScheme();

  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <AppStack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: "Tareas",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <AppStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Cuenta",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </AppStack.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} {...props} />;
}
