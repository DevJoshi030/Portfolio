import React, { useEffect, useState } from "react";
import { Text, Dimensions, View, ActivityIndicator } from "react-native";

import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import { useRoute } from "@react-navigation/native";

import Candle from "./Candle";
import styles from "../styles/ChartStyles";

const screenWidth = Dimensions.get("window").width;

const Chart = (props) => {
  const [chartData, setChartData] = useState([]);

  const resize = 0.15;

  const route = useRoute();
  const stock = route.params.name;

  let domain, width, scaleBody, scaleY;

  useEffect(() => {
    const fetchData = async () => {
      const resData = await fetch(
        "http://17BCE020.pythonanywhere.com/api/get-stock-data/" + stock + ".NS"
      ).then((res) => res.json());

      setChartData(resData.slice(0, 30));
    };

    fetchData();

    return () => {};
  }, []);

  if (chartData.length !== 0) {
    const getDomain = (rows) => {
      let max = parseFloat(rows[0][3]);
      for (let i = 1; i < rows.length; ++i) {
        if (parseFloat(rows[i][3]) > max) {
          max = rows[i][3];
        }
      }

      let min = parseFloat(rows[0][4]);
      for (let i = 1; i < rows.length; ++i) {
        if (parseFloat(rows[i][4]) < min) {
          min = rows[i][4];
        }
      }

      return [min, max];
    };
    domain = getDomain(chartData);

    width = (screenWidth - screenWidth * resize) / chartData.length;
    scaleY = scaleLinear().domain(domain).range([screenWidth, 0]);
    scaleBody = scaleLinear()
      .domain([0, Math.max(...domain) - Math.min(...domain)])
      .range([0, screenWidth]);
  }

  const generateColumn = () => {
    const min = domain[0];
    const max = domain[1];
    const diffIterator = (max - min) / 10;
    let final = [];
    const MARGIN = screenWidth / 15;
    for (let i = 0; i < 11; ++i) {
      final.push(
        <Text
          style={styles.columnText}
          ellipsizeMode="middle"
          numberOfLines={1}
        >
          {(max - diffIterator * i).toFixed(2)}
        </Text>
      );
    }
    return final;
  };

  const len = chartData.length;

  return (
    <>
      {chartData.length !== 0 ? (
        <>
          <View style={styles.item}>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={[styles.left, styles.bold]}>{stock}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>Open</Text>
                <Text style={styles.right}>
                  {parseFloat(chartData[len - 1][1]).toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>High</Text>
                <Text style={styles.right}>
                  {parseFloat(chartData[len - 1][3]).toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>Low</Text>
                <Text style={styles.right}>
                  {parseFloat(chartData[len - 1][4]).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.space} />
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.left}>Prev Close</Text>
                <Text style={styles.right}>
                  {parseFloat(chartData[len - 1][2]).toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>52 W High</Text>
                <Text style={styles.right}>
                  {parseFloat(domain[1]).toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>52 W Low</Text>
                <Text style={styles.right}>
                  {" "}
                  {parseFloat(domain[0]).toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>Volume</Text>
                <Text style={styles.right}>{chartData[len - 1][5]}</Text>
              </View>
            </View>
            <View style={styles.rule} />
          </View>
          <View style={styles.row}>
            <View style={styles.column}>{generateColumn()}</View>
            <View style={styles.chartBody}>
              <Svg
                width={screenWidth - screenWidth * resize}
                height={screenWidth}
              >
                {chartData.map((candle, index) => (
                  <Candle
                    key={candle[0]}
                    candle={candle}
                    index={index}
                    width={width}
                    scaleY={scaleY}
                    scaleBody={scaleBody}
                  />
                ))}
              </Svg>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      )}
    </>
  );
};

export default Chart;
