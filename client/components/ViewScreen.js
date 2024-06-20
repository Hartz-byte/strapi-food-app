import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewScreen({ route, navigation }) {
  const { recipe1 } = route.params; 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`http://localhost:1337/api/products/${recipe1}?populate=*`);
        const data = await response.json();
        if (data && data.data) {
          setRecipe(data.data.attributes);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }

    fetchRecipe();
  }, [recipe1]);

  // Function to handle adding the recipe to the cart
  const handleAddToCart = async () => {
    console.log(recipe1)
    if (recipe) {
      const userId = await AsyncStorage.getItem("userId");
      const payload = {
        userid: userId,
        productid: recipe1, // Adjust this as needed based on your data structure
      };

      try {
        const response = await fetch("http://localhost:1337/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: payload }),
        });

        if (response.ok) {
          alert(`Added "${recipe.productname}" to the cart`);
          navigation.navigate("Main");
        } else {
          console.error("Error adding to cart. Please try again.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {recipe ? (
        <React.Fragment>
          <Image source={{ uri: "http://localhost:1337" + recipe.image.data.attributes.formats.small.url }} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{recipe.productname}</Text>
          <Text style={styles.recipePrice}>Price: ${recipe.price}</Text>
        </React.Fragment>
      ) : (
        <Text>Loading...</Text>
      )}

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  recipeImage: {
    width: 200,
    height: 150,
    marginBottom: 10,
    borderRadius: 20,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipePrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});
