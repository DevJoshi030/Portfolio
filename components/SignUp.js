import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import firebase from "firebase";

const SignUp = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async () => {
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
      props.navigation.navigate("main");
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
    <Grid style={styles.container}>
      <View style={styles.headerContainer}>
        <Text h2>Sign Up</Text>
      </View>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <Input
            value={name}
            placeholder="Name"
            style={styles.input}
            leftIcon={<Icon name="account-circle" size={24} color="grey" />}
            onChangeText={(str) => setName(str)}
          />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <Input
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
      <Row style={styles.row}>
        <Col style={styles.col} size={2}>
          <Input
            value={confirmPassword}
            style={styles.input}
            leftIcon={<Icon name="vpn-key" size={24} color="grey" />}
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(str) => setConfirmPassword(str)}
          />
        </Col>
      </Row>
      <View style={styles.submit}>
        <Button
          title="Sign Up"
          buttonStyle={styles.purple}
          onPress={handleSubmit}
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
  loginContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  login: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
  purple: {
    backgroundColor: "#2a3eb1",
  },
});

export default SignUp;