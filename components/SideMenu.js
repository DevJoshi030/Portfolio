import React from "react";

import firebase from "firebase";

import { View } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/SideMenuStyles";
import { Text } from "react-native";

const SideMenu = (props) => {
  let _menu = null;

  const navigation = useNavigation();

  const handleLogOut = () => {
    firebase.auth().signOut();
    navigation.navigate("setup");
  };

  return (
    <View style={styles.menuStyle}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          <Icon
            type="ionicon"
            name="log-out-outline"
            size={32}
            onPress={() => handleLogOut()}
          />
        }
      >
        <MenuItem
          onPress={() => {
            _menu.hide();
            handleLogOut();
          }}
        >
          <View>
            <Icon
              type="ionicon"
              name="log-out-outline"
              onPress={() => _menu.show()}
            />
            <Text
              style={{
                position: "absolute",
                left: 30,
                top: 0,
              }}
            >
              Log Out
            </Text>
          </View>
        </MenuItem>
      </Menu>
    </View>
  );
};

export default SideMenu;
