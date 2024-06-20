import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const baseUrl = "http://192.168.29.24:1337/api/register-users";
      const queryParams = `?email=${email}&password=${password}`;
      const url = baseUrl + queryParams;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        for (let i = 0; i < data.data.length; i++) {
          const user = data.data[i];
          const userid = user.id;
          const email2 = user.attributes.email;
          const fullname = user.attributes.fullname;
          const password2 = user.attributes.password;
          const info = user.attributes;

          if (email == email2 && password == password2) {
            const keyValues = [
              ["userid", userid.toString()],
              ["email", email2.toString()],
              ["fullname", fullname.toString()],
            ];

            await AsyncStorage.multiSet(keyValues);
            navigation.navigate("Main");
          }
        }
      } else {
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
