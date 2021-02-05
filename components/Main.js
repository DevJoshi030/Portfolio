import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Icon, Text, Button } from "react-native-elements";

import firebase from "firebase";

import AddOverlay from "./AddOverlay";
import styles from "../styles/MainStyles";

const Main = (props) => {
  const [visible, setVisible] = useState(false);
  const [userStocks, setUserStocks] = useState([]);
  const [stocks, setStocks] = useState([]);

  const getUserStocks = () => {
    const id = firebase.auth().currentUser.uid;
    let result = [];
    firebase
      .database()
      .ref("/" + id)
      .on("value", (snapshot) => {
        let value = snapshot.val();
        for (let i in value) {
          result.push({
            name: i,
            count: value[i].count,
            price: value[i].price,
          });
        }
        setUserStocks(result);
      });
  };

  useEffect(() => {
    getUserStocks();
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref("/stocks/stocks")
      .on("value", (snapshot) => {
        setStocks(snapshot.val());
      });
    return;
  }, []);

  const handleLogOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate("setup");
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleRefresh = () => {
    getUserStocks();
    toggleOverlay();
  };

  const Item = (props) => (
    <View style={styles.item}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.title}>{props.price}</Text>
      <Text style={styles.title}>{props.count}</Text>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
          padding: 5,
        }}
      />
    </View>
  );

  const renderItem = (props) => (
    <Item
      title={props.item.name}
      price={props.item.price}
      count={props.item.count}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={userStocks}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: "center",
                fontSize: 24,
              }}
            >
              No Stocks Found! Add stock using{" "}
              <Icon name="add-circle" color="#2a3eb1" size={32} />
            </Text>
          )}
        />
        <Button title="Logout" onPress={handleLogOut} />
      </View>
      <View style={styles.buttonContainer}>
        <Icon
          name="add-circle"
          color="#2a3eb1"
          size={64}
          onPress={toggleOverlay}
        />
      </View>
      <AddOverlay
        visible={visible}
        toggleOverlay={toggleOverlay}
        stocks={stocks}
        refresh={handleRefresh}
      />
    </>
  );
};

export default Main;
