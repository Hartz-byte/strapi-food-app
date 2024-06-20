import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ProfileScreen({ navigation }) {
  const [username, setusername] = useState();
  const [email, setemail] = useState();

  useEffect(() => {
    async function info() {
      try {
        setusername(await AsyncStorage.getItem("fullname"));
        setemail(await AsyncStorage.getItem("email"));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
    info()
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/splash2.png")} style={styles.profileImage} />
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      {/* Add more user details as needed */}
      <Button title="Edit Profile" onPress={() => navigation.navigate("EditProfile")} />
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of the width and height to make it circular
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
});
