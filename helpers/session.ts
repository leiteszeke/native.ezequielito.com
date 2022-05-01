import { Platform } from "react-native";
import { MMKV } from "react-native-mmkv";

const SESSION_KEY = "ezequielito";

const storage =
  Platform.OS !== "web"
    ? new MMKV({
        id: SESSION_KEY,
        encryptionKey: "super-dificult-secret-key",
      })
    : new MMKV();

const get = () => {
  const session = storage.getString(SESSION_KEY);

  if (!session) {
    return null;
  }

  return JSON.parse(session);
};

const set = (data: any) => {
  storage.set(SESSION_KEY, JSON.stringify(data));
};

const clear = () => {
  storage.delete(SESSION_KEY);
};

const Session = {
  get,
  set,
  clear,
};

export default Session;
