import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Overlay, Input, Text, Button, Icon } from "react-native-elements";

import stocks from "../data/stocks";
import styles from "../styles/AddOverlayStyles";

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
    setupMatchList();
  }, []);

  const onItemPress = async (title) => {
    let priceData = "";
    await fetch("https://finance.yahoo.com/quote/" + title)
      .then((res) => res.text())
      .then((data) => {
        const index = data.indexOf(
          '<span class="Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)" data-reactid="20">'
        );

        const start =
          index +
          '<span class="Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)" data-reactid="20">'
            .length;

        const len = data.slice(start).indexOf("</span>");
        priceData = data.slice(start, start + len);
      });

    setStock(title);
    setPrice(priceData);
    handleStockChange(title);
  };

  const Item = (item) => (
    <View style={styles.item} onTouchEnd={() => onItemPress(item.title, 1)}>
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

  const handleBack = () => {
    setStock("");
    setPrice("");
    setCount("");
    setupMatchList();
    props.toggleOverlay();
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
            onPress={handleBack}
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

export default AddOverlay;
