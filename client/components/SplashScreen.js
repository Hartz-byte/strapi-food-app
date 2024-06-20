import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  const handleLoginPress = () => {
    // Navigate to the login screen
    navigation.navigate("Login");
  };

  const handleRegisterPress = () => {
    // Navigate to the register screen
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/splash2.png")} />
      <Text style={styles.text}>Splash Screen</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#485bc4",
  },
  text: {
    fontSize: 20,
    color: "white",
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 10, // Add some margin between the buttons and other elements
  },
  button: {
    backgroundColor: "rgba(233,30,99,0.7)", // Slightly transparent background color
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
