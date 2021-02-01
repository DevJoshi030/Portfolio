import React, { useState } from "react";
import { Text, StyleSheet, TextInput, Button, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import * as firebase from "firebase";

const SignUp = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    if (password.trim() !== confirmPassword.trim()) {
      return;
    }

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((res) =>
          firebase
            .database()
            .ref("/users/" + res.user.uid)
            .set({
              name: name,
              email: email,
            })
        );
      props.navigation.navigate("welcome");
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
    <Grid style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign Up</Text>
      </View>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(str) => setName(str)}
          />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(str) => setEmail(str)}
          />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(str) => setPassword(str)}
          />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(str) => setConfirmPassword(str)}
          />
        </Col>
      </Row>
      <View style={styles.submit}>
        <Button
          title="Sign Up"
          color="#2a3eb1"
          onPress={(event) => handleSubmit(event)}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text>Already have an account?</Text>
        <Text
          onPress={() => props.navigation.navigate("login")}
          style={styles.login}
        >
          Log In
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
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    height: 45,
    textAlign: "left",
    paddingLeft: 10,
    margin: 15,
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
  loginContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  login: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default SignUp;
