import React from "react";

import firebase from "firebase";

import { View } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/SideMenuStyles";

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
            name="more-vert"
            color="#000"
            size={32}
            onPress={() => _menu.show()}
          />
        }
      >
        <MenuItem
          onPress={() => {
            _menu.hide();
            // props.setVisible(true);
            navigation.navigate("add");
          }}
        >
          Add Stock
        </MenuItem>

        <MenuDivider />

        <MenuItem
          onPress={() => {
            _menu.hide();
            handleLogOut();
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </View>
  );
};

export default SideMenu;
