import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

import firebase from "firebase";
import styles from "../styles/SetupStyles";

const Setup = (props) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) props.navigation.navigate("main");
    else props.navigation.navigate("welcome");
  });

  return (
    <View style={styles.loading}>
      <Text style={styles.headerText}>Portfolio Management App</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Setup;
