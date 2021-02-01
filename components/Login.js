import React, { useState } from "react";
import { Text, StyleSheet, TextInput, Button, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as firebase from "firebase";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => console.log(res.user.uid));
      props.navigation.navigate("welcome");
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
    <Grid style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Log In</Text>
      </View>
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
      <View style={styles.submit}>
        <Button
          title="Log In"
          color="#2a3eb1"
          onPress={(event) => handleSubmit(event)}
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
  signupContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  signup: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Login;
