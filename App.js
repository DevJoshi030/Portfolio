import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";

import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import Setup from "./components/Setup";

import config from "./config";

const Stack = createStackNavigator();

import firebase from "firebase";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Cannot update a component"]);

try {
  firebase.initializeApp(config);
} catch (error) {}

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="setup"
          component={Setup}
          options={{
            title: "Portfolio App",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            title: "Portfolio App",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{
            title: "Sign Up",
            // headerLeft: null,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "Login",
            // headerLeft: null,
          }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            title: "Main",
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
