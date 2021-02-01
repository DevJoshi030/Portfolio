import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import * as firebase from "firebase";

const Welcome = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Portfolio Management App</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            color="#2a3eb1"
            onPress={() =>
              props.navigation.navigate("signup", { owner: "Michaś" })
            }
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Login"
            color="#f50057"
            onPress={() =>
              props.navigation.navigate("login", { owner: "Michaś" })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignContent: "center",
    maxWidth: "90%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "25%",
    marginLeft: 10,
  },
  purple: {
    backgroundColor: "purple",
    color: "purple",
  },
});

export default Welcome;
