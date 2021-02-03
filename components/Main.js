import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Overlay, Input, Text, Button } from "react-native-elements";

import firebase from "firebase";

const Main = (props) => {
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [visible, setVisible] = useState(false);

  const handleLogOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate("setup");
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleAdd = () => {
    console.log(stock, price);
  };

  return (
    <>
      <View style={styles.container}>
        <Text h1>Hello</Text>
        <Button title="Logout" onPress={handleLogOut} />
      </View>
      <View style={styles.buttonContainer}>
        <Icon
          name="add-circle"
          color="#2a3eb1"
          size={64}
          onPress={toggleOverlay}
        />
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <>
          <Text h3 h3Style={styles.overlayHeading}>
            Add a stock
          </Text>
          <Input
            style={styles.input}
            placeholder="Stock Name"
            leftIcon={<Icon name="add-business" size={24} color="grey" />}
            onChangeText={(str) => setStock(str)}
          />
          <Input
            style={styles.inputExtra}
            placeholder="Price"
            leftIcon={
              <Icon
                name="rupee"
                size={24}
                color="grey"
                type="font-awesome"
                style={styles.price}
              />
            }
            onChangeText={(str) => setPrice(str)}
          />
          <Button
            title="Add Stock"
            buttonStyle={styles.pink}
            onPress={handleAdd}
          />
        </>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 40,
    right: 40,
  },
  overlay: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayHeading: {
    margin: 15,
  },
  input: {
    padding: 10,
  },
  inputExtra: {
    paddingLeft: 12,
  },
  pink: {
    backgroundColor: "#f50057",
  },
  price: {
    marginLeft: 8,
  },
});

export default Main;
