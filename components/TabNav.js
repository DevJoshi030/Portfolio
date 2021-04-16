import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "react-native";
import Main from "./Main";
import SideMenu from "./SideMenu";
import AddOverlay from "./AddOverlay";
import Analysis from "./Analysis";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

const TabNav = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "main") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (route.name === "add") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else {
            iconName = focused ? "analytics" : "analytics-outline";
          }

          // You can return any component that you like here!
          return <Icon type="ionicon" name={iconName} color="#26a69a" />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          return (
            <Text>
              {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
      NavigationContainer
    >
      <Tab.Screen
        name="main"
        options={{
          title: "Main",
          headerLeft: null,
        }}
        component={Main}
      />

      <Tab.Screen
        name="add"
        component={AddOverlay}
        options={{
          title: "Add Stock",
        }}
      />

      <Tab.Screen
        name="analysis"
        component={Analysis}
        options={{
          title: "Analysis View",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
