import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LogBox } from "react-native";

import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Setup from "./components/Setup";

import config from "./config";

const Stack = createStackNavigator();

import firebase from "firebase";
import SideMenu from "./components/SideMenu";
import Chart from "./components/Chart";
import TabNav from "./components/TabNav";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Cannot update a component"]);
LogBox.ignoreLogs(["Can't perform"]);

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
          name="tabnav"
          component={TabNav}
          options={{
            title: "Portfolio App",
            headerRight: () => (
              <SideMenu
                visible={overlayVisible}
                setVisible={setOverlayVisible}
              />
            ),
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
