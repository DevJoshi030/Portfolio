import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import config from "./config";

const Stack = createStackNavigator();

import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

firebase.initializeApp(config);

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            title: "Portfolio App",
          }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "Login",
          }}
          firebase={firebase}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
