import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: {
            screens: {
              LoginScreen: "login",
            },
          },
        },
      },
      App: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Tasks: {
            screens: {
              TasksScreen: "tasks",
            },
          },
          Account: {
            screens: {
              AccountScreen: "account",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
