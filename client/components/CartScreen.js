import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const [cartList, setCartList] = useState([]);

  const fetchCartData = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/carts");
      const data = await response.json();
      if (data && data.data) {
        const userId = await AsyncStorage.getItem("userId");
        setUser(userId);
        setCart(data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/products?populate=*");
      const data = await response.json();
      if (data && data.data) {
        setCartItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartData();
      await fetchCartItems();

      const updatedCartList = [];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].attributes.userid == user) {
          for (let a = 0; a < cartItems.length; a++) {
            if (cart[i].attributes.productid == cartItems[a].id) {
              updatedCartList.push(cartItems[a]);
            }
          }
        }
      }
      setCartList(updatedCartList);
    };

    fetchData();

  }, [cart]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartList) {
      totalPrice += parseFloat(item.attributes.price);
    }
    return totalPrice.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartList.map((item) => (
        <View style={styles.cartItem} key={item.id}>
          <View style={styles.horizontalContainer}>
            <Image source={{ uri: "http://localhost:1337" + item.attributes.image.data.attributes.formats.small.url }} style={styles.itemImage} />
            <View style={styles.productDetails}>
              <Text style={styles.itemName}>{item.attributes.productname}</Text>
              <Text style={styles.itemPrice}>Price: ${item.attributes.price}</Text>
            </View>
          </View>
        </View>
      ))}
      <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 7,
    marginBottom: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  productDetails: {
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
