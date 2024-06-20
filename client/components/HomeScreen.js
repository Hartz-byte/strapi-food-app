import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Image, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function HomeScreen({  navigation }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:1337/api/products?populate=*");
        const data = await response.json();

        if (data && data.data) {
            const userId = await AsyncStorage.getItem("userId");
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const renderProducts = ({ item }) => {
    const bb = "http://localhost:1337" + item.attributes.image.data.attributes.formats.small.url;
    return (
      <View style={styles.recipeItem} key={item.id}>
        <Image source={{ uri: bb }} style={styles.recipeImage} />
        <Text style={styles.recipePrice}>Price: ${item.attributes.price}</Text>
        <Button
          title={item.attributes.productname}
          onPress={() => navigation.navigate("View", { recipe1: item.id})}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  recipeItem: {
    width: 150,
    height: 200,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
    alignItems: "center",
    justifyContent: "center",
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipePrice: {
    fontSize: 16,
  },
});
