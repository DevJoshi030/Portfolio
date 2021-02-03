import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Text, Button, Input, Icon } from "react-native-elements";

import firebase from "firebase";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password.trim());
      props.navigation.navigate("main");
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
          onPress={() => props.navigation.navigate("signup")}
          style={styles.signup}
        >
          Sign Up
        </Text>
      </View>
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    margin: 20,
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
  },
  row: {
    height: 60,
  },
  col: {
    padding: 10,
  },
  input: {
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    textAlignVertical: "center",
  },
  submit: {
    marginTop: 25,
    borderRadius: 15,
    width: "30%",
  },
  signupContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  signup: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
  pink: {
    backgroundColor: "#f50057",
  },
});

export default Login;
