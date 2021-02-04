import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Overlay, Input, Text, Button, Icon } from "react-native-elements";

import stocks from "../data/stocks";

const AddOverlay = (props) => {
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [matchList, setMatchList] = useState([]);

  const setupMatchList = () => {
    let tempList = [];
    stocks.map((stock, id) => {
      tempList.push({ id: id.toString(), stock });
    });
    setMatchList(tempList);
  };

  useEffect(() => {
    let tempList = [];
    stocks.map((stock, id) => {
      tempList.push({ id: id.toString(), stock });
    });
    setMatchList(tempList);
  }, []);

  const onItemPress = async (title) => {
    let priceData = "";
    await fetch("https://finance.yahoo.com/quote/" + title)
      .then((res) => res.text())
      .then((data) => (priceData = data));

    const index = priceData.indexOf(
      '<span class="Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)" data-reactid="20">'
    );

    const start =
      index +
      '<span class="Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)" data-reactid="20">'
        .length;

    const len = priceData.slice(start).indexOf("</span>");
    priceData = priceData.slice(start, start + len);
    setStock(title);
    setPrice(priceData);
    handleStockChange(title);
  };

  const Item = (item) => (
    <View style={styles.item} onTouchStart={() => onItemPress(item.title, 1)}>
      <Text style={styles.title}>{item.title}</Text>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
          padding: 5,
        }}
      />
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

  const handleAdd = () => {
    setStock("");
    setPrice("");
    setCount("");
    setupMatchList();
    alert("Stock: " + stock + "\nPrice: " + price + "\nQuantity: " + count);
    props.toggleOverlay();
  };

  const renderItem = (object) => <Item title={object.item.stock} />;
  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={props.toggleOverlay}
      overlayStyle={styles.overlay}
      fullScreen
    >
      <>
        <View style={styles.backContainer}>
          <Icon
            name="arrow-back"
            color="#2a3eb1"
            size={40}
            onPress={props.toggleOverlay}
          />
        </View>
        <Text h3 h3Style={styles.overlayHeading}>
          Add a stock
        </Text>
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
              Enter name to search
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
        <Button
          title="Add Stock"
          buttonStyle={styles.pink}
          onPress={handleAdd}
        />
      </>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayHeading: {
    margin: 15,
  },
  input: {
    padding: 10,
  },
  inputExtra: {
    paddingLeft: 12,
  },
  pink: {
    backgroundColor: "#f50057",
  },
  price: {
    marginLeft: 8,
  },
  item: {
    height: 24,
    margin: 10,
  },
  title: {
    fontSize: 16,
  },
  list: {
    width: "100%",
    height: "45%",
    flexGrow: 0,
  },
  backContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 40,
    left: 20,
  },
});
export default AddOverlay;
