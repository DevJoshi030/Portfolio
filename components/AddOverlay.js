import React, { useState, useEffect } from "react";
import { View, FlatList, ToastAndroid } from "react-native";
import { Overlay, Input, Text, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase";

import styles from "../styles/AddOverlayStyles";
import { getStockPrice } from "../utils/stockFunctions";

const AddOverlay = (props) => {
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");

  const navigation = useNavigation();
  const [stocks, setStocks] = useState([]);
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("/stocks")
      .on("value", (snapshot) => {
        setStocks(snapshot.val());
      });
    return;
  }, []);

  useEffect(() => {
    setupMatchList();
  }, []);

  const setupMatchList = () => {
    let tempList = [];
    stocks.map((stock, id) => {
      tempList.push({ id: id.toString(), stock });
    });
    setMatchList(tempList);
  };

  const onItemPress = async (title) => {
    let priceData = await getStockPrice(title);

    setPrice(priceData);
    setStock(title);
    handleStockChange(title);
  };

  const Item = (props) => (
    <View style={styles.item} onTouchEnd={() => onItemPress(props.title)}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.itemList} />
    </View>
  );

  const handleStockChange = (str) => {
    let tempList = [];

    stocks.map((stock, id) => {
      let result = stock.match(new RegExp(str, "i"));
      if (result) {
        tempList.push({ id: id.toString(), stock });
      }
    });
    setMatchList(tempList);
    setStock(str);
  };

  const handleAdd = async () => {
    setStock("");
    setPrice("");
    setCount("");
    setupMatchList();
    const id = firebase.auth().currentUser.uid;

    await firebase
      .database()
      .ref("/" + id + "/" + stock)
      .set({
        price: price,
        count: count,
      });
    ToastAndroid.show("Stock Added Successfully!", ToastAndroid.LONG);
    navigation.navigate("main", {
      refresh: true,
    });
  };

  const renderItem = (object) => <Item title={object.item.stock} />;
  return (
    <>
      <Input
        value={stock}
        autoFocus
        style={styles.input}
        placeholder="Stock Name"
        leftIcon={<Icon name="add-business" size={24} color="grey" />}
        onChangeText={handleStockChange}
      />
      <FlatList
        style={styles.list}
        data={matchList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Enter a valid stock name
          </Text>
        )}
      />
      <Input
        value={price}
        style={styles.inputExtra}
        placeholder="Price"
        leftIcon={
          <Icon
            name="rupee"
            size={24}
            color="grey"
            type="font-awesome"
            style={styles.price}
          />
        }
        onChangeText={(str) => setPrice(str)}
      />
      <Input
        value={count}
        style={styles.inputExtra}
        placeholder="Quantity"
        leftIcon={
          <Icon
            name="rupee"
            size={24}
            color="grey"
            type="font-awesome"
            style={styles.price}
          />
        }
        onChangeText={(str) => setCount(str)}
      />
      <Button title="Add Stock" buttonStyle={styles.pink} onPress={handleAdd} />
    </>
  );
};

export default AddOverlay;
