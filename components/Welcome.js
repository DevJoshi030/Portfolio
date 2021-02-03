import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

const Welcome = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3>Portfolio Management App</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            buttonStyle={styles.purple}
            onPress={() => props.navigation.navigate("signup")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Login"
            buttonStyle={styles.pink}
            onPress={() => props.navigation.navigate("login")}
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
    backgroundColor: "#2a3eb1",
  },
  pink: {
    backgroundColor: "#f50057",
  },
});

export default Welcome;
