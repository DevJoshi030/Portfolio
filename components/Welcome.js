import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/WelcomeStyles";

const Welcome = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4>Portfolio Management App</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            buttonStyle={styles.purple}
            onPress={() => navigation.navigate("signup")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Login"
            buttonStyle={styles.pink}
            onPress={() => navigation.navigate("login")}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
