import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import { useNavigation } from "@react-navigation/native";

import firebase from "firebase";
import styles from "../styles/SignUpStyles";

const SignUp = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigation = useNavigation();

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
      navigation.navigate("main");
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
            autoFocus
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
        <Text onPress={() => navigation.navigate("login")} style={styles.login}>
          Log In
        </Text>
      </View>
    </Grid>
  );
};

export default SignUp;
