import React, { useState } from "react";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Text, Button, Input, Icon } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import firebase from "firebase";
import styles from "../styles/LoginStyles";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password.trim());
      navigation.navigate("tabnav");
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
    <Grid style={styles.container}>
      <View style={styles.headerContainer}>
        <Text h2>Log In</Text>
      </View>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <Input
            autoFocus
            value={email}
            style={styles.input}
            placeholder="Email"
            leftIcon={<Icon name="email" size={24} color="grey" />}
            onChangeText={(str) => setEmail(str)}
          />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <Input
            value={password}
            style={styles.input}
            leftIcon={<Icon name="lock" size={24} color="grey" />}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(str) => setPassword(str)}
          />
        </Col>
      </Row>
      <View style={styles.submit}>
        <Button
          title="Log In"
          buttonStyle={styles.pink}
          onPress={handleSubmit}
        />
      </View>
      <View style={styles.signupContainer}>
        <Text>Don't have an account yet?</Text>
        <Text
          onPress={() => navigation.navigate("signup")}
          style={styles.signup}
        >
          Sign Up
        </Text>
      </View>
    </Grid>
  );
};

export default Login;
