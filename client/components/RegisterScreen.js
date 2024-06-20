import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function AboutScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const handleRegister = async () => {
    try {
      // Define the registration data
      const registrationData = {
        fullname: fullName,
        email: email,
        password: password,
        city: country,
        state: state,
      };

      // Send a POST request to the registration endpoint
      const response = await fetch("http://localhost:1337/api/registerusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: registrationData }),
      });
      console.log(response);
      if (response.ok) {
        // Registration successful, navigate to the login screen
        navigation.navigate("Login");
      } else {
        // Handle the case where registration is unsuccessful
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        onChangeText={(text) => setCountry(text)}
        value={country}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        onChangeText={(text) => setState(text)}
        value={state}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "#fff",
  },
});
