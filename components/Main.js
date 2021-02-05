import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text, Button } from "react-native-elements";

import firebase from "firebase";

import AddOverlay from "./AddOverlay";
import styles from "../styles/MainStyles";

const Main = (props) => {
  const [visible, setVisible] = useState(false);

  const handleLogOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate("setup");
  };

  const toggleOverlay = () => {
    setVisible(!visible);
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
      <AddOverlay visible={visible} toggleOverlay={toggleOverlay} />
    </>
  );
};

export default Main;
