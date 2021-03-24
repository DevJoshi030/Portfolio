import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Icon, Text } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import { getStockPrice, getUserStocks } from "../utils/stockFunctions";
import styles from "../styles/MainStyles";

const Main = (props) => {
  const [userStocks, setUserStocks] = useState(null);
  const stockIndex = useRef(0);
  const listStocks = useRef(null);
  const [fetchReq, setFetchReq] = useState(false);
  const [doNotUpdate, setDoNotUpdate] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  // Reset Component
  if (route.params && route.params.refresh) {
    route.params.refresh = false;
    setUserStocks(null);
    setFetchReq((prevFetchReq) => !prevFetchReq);
    setDoNotUpdate((prevDoNotUpdate) => !prevDoNotUpdate);
    stockIndex.current = 0;
    listStocks.current = null;
  }

  useEffect(() => {
    const result = getUserStocks();
    setUserStocks(result);
    return;
  }, [doNotUpdate]);

  useEffect(() => {
    const update = async () => {
      if (userStocks !== null && userStocks.length !== 0) {
        if (stockIndex.current >= userStocks.length) {
          stockIndex.current = 0;
        }

        const stock = userStocks.slice()[stockIndex.current];
        listStocks.current.splice(stockIndex.current, 1, {
          name: stock.name,
          count: stock.count,
          storedPrice: stock.price,
          price: await getStockPrice(stock.name),
        });
        setFetchReq((prevFetchReq) => !prevFetchReq);
        return 0;
      }
    };
    setTimeout(async () => {
      if (
        listStocks.current === null &&
        userStocks !== null &&
        userStocks.length !== 0
      ) {
        listStocks.current = userStocks.slice();
        setFetchReq((prevFetchReq) => !prevFetchReq);
        return;
      }
      const returnVal = await update();
      if (returnVal === 0) {
        stockIndex.current += 1;
        return;
      }
      setFetchReq((prevFetchReq) => !prevFetchReq);
    }, 10);
  }, [fetchReq]);

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
        {listStocks.current !== null ? (
          <FlatList
            style={styles.list}
            data={listStocks.current}
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
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        )}
      </View>
    </>
  );
};

export default Main;
