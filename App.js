import "react-native-gesture-handler";
import React, { useState } from "react";
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
import SideMenu from "./components/SideMenu";
import AddOverlay from "./components/AddOverlay";
import Chart from "./components/Chart";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Cannot update a component"]);

try {
  firebase.initializeApp(config);
} catch (error) {}

const App = (props) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

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
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="main"
          options={{
            title: "Main",
            headerLeft: null,
            headerRight: () => (
              <SideMenu
                visible={overlayVisible}
                setVisible={setOverlayVisible}
              />
            ),
          }}
        >
          {(props) => (
            <Main
              {...props}
              visible={overlayVisible}
              setVisible={setOverlayVisible}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="add"
          component={AddOverlay}
          options={{
            title: "Add Stock",
          }}
        />
        <Stack.Screen
          name="chart"
          component={Chart}
          options={{
            title: "Detail View",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
