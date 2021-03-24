import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase";
import styles from "../styles/SetupStyles";

const Setup = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "main" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "welcome" }],
        });
      }
    });
  }, []);

  return (
    <View style={styles.loading}>
      <Text style={styles.headerText}>Portfolio Management App</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Setup;
