import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Link } from "native-base";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WalletManager from "react-native-wallet-manager";

const blobToDataUrl = async (blob: any) =>
  new Promise((r) => {
    let a = new FileReader();
    a.onload = r;
    a.readAsDataURL(blob);
  }).then((e: any) => e.target.result);

const PreLogin = () => {
  const [name, setName] = useState<string>();
  const [isLoadingPass, setIsLoadingPass] = useState(false);

  const handleChangeText = (value: string) => {
    setName(value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoadingPass(true);

      const cossyId = "0400089656";

      const pass = await axios.post(
        "http://192.168.4.27:4000/passwallet",
        {
          name: "Ezequiel",
          lastName: "Leites",
          cossyId,
          platform: Platform.OS,
        },
        {
          responseType: "blob",
          headers: {
            "Content-Encoding": "gzip",
          },
        }
      );

      if (Platform.OS === "ios") {
        await WalletManager.addPassFromUrl(await blobToDataUrl(pass.data));
      } else {
        Linking.openURL(`http://192.168.4.27:4000/passwallet/${cossyId}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingPass(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Enter your name below please</Text>
        {isLoadingPass && <ActivityIndicator />}
      </View>
      <TextInput
        value={name}
        onChangeText={handleChangeText}
        style={styles.input}
      />
      <Button
        disabled={isLoadingPass}
        title="Get your pass now!"
        onPress={handleSubmit}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default PreLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "60%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
  labelContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    height: 18,
  },
});
