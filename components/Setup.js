import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

import firebase from "firebase";

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

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    margin: 15,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Setup;
