import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export const useAuth = () => useContext(UserContext);

export const useUser = () => useContext(UserContext).user;

export const useUserStatus = () => useContext(UserContext).userStatus;
