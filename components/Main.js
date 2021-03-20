import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, ToastAndroid } from "react-native";
import { Icon, Text, Button } from "react-native-elements";

import firebase from "firebase";

import AddOverlay from "./AddOverlay";
import styles from "../styles/MainStyles";

const Main = (props) => {
  const [visible, setVisible] = useState(false);
  const [userStocks, setUserStocks] = useState(null);
  const [listStocks, setListStocks] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [fetchReq, setFetchReq] = useState(false);

  const getStockPrice = async (stock) => {
    return await fetch(
      "https://17BCE020.pythonanywhere.com/api/get-stock-price/" + stock + ".NS"
    )
      .then((res) => res.json())
      .then((data) => data.price.toFixed(2).toString());
  };

  const getStocksData = async () => {
    let result = [];

    for (const stock of userStocks) {
      result.push({
        name: stock.name,
        count: stock.count,
        storedPrice: stock.price,
        price: await getStockPrice(stock.name),
      });
    }
    return result;
  };

  useEffect(() => {
    const updateStocks = async () => {
      let data = userStocks ? await getStocksData() : null;
      return data;
    };
    setTimeout(async () => {
      const data = await updateStocks();
      data ? setListStocks(data) : null;
      setFetchReq((prevFetchReq) => !prevFetchReq);
    }, 1000);
  }, [fetchReq]);

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
            storedPrice: value[i].price,
          });
        }
      });
    return result;
  };

  useEffect(() => {
    const result = getUserStocks();
    setUserStocks(result);
    setListStocks(result);
    return;
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
    setVisible((prevVisible) => !prevVisible);
  };

  const handleRefresh = () => {
    const result = getUserStocks();
    setUserStocks(result);
    toggleOverlay();
  };

  const convertK = (value) => {
    if (value >= 1000 || value <= -1000) {
      value = value / 1000;
      value = value.toFixed(2);
      value = value + " K";
    }
    return value;
  };

  const Item = (props) => {
    let value = (props.price * props.count).toFixed(2);
    let PL = ((props.price - props.storedPrice) * props.count).toFixed(2);
    let CMP = (props.price - props.storedPrice).toFixed(2);
    const isPos = CMP > 0;
    const CMPPer = (
      ((props.price - props.storedPrice) / props.storedPrice) *
      100
    ).toFixed(2);

    value = convertK(value);
    PL = convertK(PL);
    CMP = convertK(CMP) + " (" + CMPPer + "%)";

    return (
      <View style={styles.item}>
        <View style={styles.section}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.row}>
            <Text style={styles.left}>Value</Text>
            <Text style={styles.right}>{value}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.left}>P/L</Text>
            <Text style={[styles.right, isPos ? styles.green : styles.red]}>
              {PL}
            </Text>
          </View>
        </View>
        <View style={styles.space} />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.left}>CMP</Text>
            <Text style={[styles.right, isPos ? styles.green : styles.red]}>
              {CMP}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.left}>Avg Price</Text>
            <Text style={styles.right}>{props.storedPrice}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.left}>Qty</Text>
            <Text style={styles.right}>{props.count}</Text>
          </View>
        </View>
        <View style={styles.rule} />
      </View>
    );
  };

  const renderItem = (props) => (
    <Item
      title={props.item.name}
      price={props.item.price}
      count={props.item.count}
      storedPrice={props.item.storedPrice}
    />
  );

  return (
    <>
      <View style={styles.container}>
        {listStocks ? (
          <FlatList
            style={styles.list}
            data={listStocks}
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
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
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
