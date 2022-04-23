import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  App: NavigatorScreenParams<AppParamList> | undefined;
  Auth: NavigatorScreenParams<AuthParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AppParamList = {
  Home: undefined;
  Tasks: undefined;
  Account: undefined;
};

export type AuthParamList = {
  Login: undefined;
};

export type RootTabScreenProps<Screen extends keyof AppParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export enum UserStatus {
  Logged,
  NotLogged,
  Idle,
}
