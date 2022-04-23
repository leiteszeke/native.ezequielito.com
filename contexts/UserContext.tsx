import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Session from "../helpers/session";
import { UserStatus } from "../types";

type AppUser = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

type UserContextProps = {
  user?: AppUser | null;
  userStatus: UserStatus;
  setUser: (user?: AppUser | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextProps>({
  user: undefined,
  userStatus: UserStatus.Idle,
  setUser: () => ({}),
  logout: () => ({}),
});

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<AppUser | null>();
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.Idle);

  const init = () => {
    const loggedUser = Session.get();

    setUser(loggedUser);
  };

  const logout = () => {
    setUser(null);
    Session.clear();
  };

  useEffect(() => {
    if (typeof user === "undefined") {
      setUserStatus(UserStatus.Idle);
    } else {
      setUserStatus(user ? UserStatus.Logged : UserStatus.NotLogged);
      Session.set(user);
    }
  }, [user]);

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userStatus,
        setUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
