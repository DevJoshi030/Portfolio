import React, { useEffect, useState } from "react";
import { Dimensions, View, ActivityIndicator } from "react-native";

import { Button, Text } from "react-native-elements";
import { Line, Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import { useRoute } from "@react-navigation/native";

import Candle from "./Candle";
import styles from "../styles/ChartStyles";

const screenWidth = Dimensions.get("window").width;

const Chart = (props) => {
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({});

  const resize = 0.2;

  const route = useRoute();
  const stock = route.params.name;

  let domain, width, scaleBody, scaleY;

  useEffect(() => {
    const fetchData = async () => {
      const resData = await fetch(
        "http://17BCE020.pythonanywhere.com/api/get-stock-stats/" +
          stock +
          ".NS"
      ).then((res) => res.json());

      setStats(resData);
    };

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resData = await fetch(
        "http://17BCE020.pythonanywhere.com/api/get-stock-data/" + stock + ".NS"
      ).then((res) => res.json());

      setAllData(resData);
      setChartData(resData.slice(resData.length - 30, resData.length));
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

  const generateYAxis = () => {
    const min = domain[0];
    const max = domain[1];
    const diffIterator = (max - min) / 10;
    let final = [];
    for (let i = 0; i < 11; ++i) {
      final.push(
        <Text
          style={styles.columnText}
          ellipsizeMode="middle"
          numberOfLines={1}
          key={i}
        >
          {(max - diffIterator * i).toFixed(2)}
        </Text>
      );
    }
    return final;
  };

  const generateGrid = () => {
    let final = [];
    for (let i = 0; i < 12; ++i) {
      final.push(
        <Svg key={i} width={screenWidth} height={screenWidth}>
          <Line
            x1={width / 2}
            y1={(i * screenWidth) / 10}
            x2={29.5 * width}
            y2={(i * screenWidth) / 10}
            stroke="#fff"
            strokeWidth={i === 10 ? 1.2 : 0.25}
          />
        </Svg>
      );
    }
    for (let i = 12; i < 18; ++i) {
      final.push(
        <Svg key={i} width={screenWidth} height={screenWidth}>
          <Line
            x1={
              i === 17
                ? 29.5 * width
                : (i - 12) * (width + 2) * 5 + width / 2 + (i - 12)
            }
            y1={0}
            x2={
              i === 17
                ? 29.5 * width
                : (i - 12) * (width + 2) * 5 + width / 2 + (i - 12)
            }
            y2={screenWidth}
            stroke="#fff"
            strokeWidth={i === 10 ? 1.2 : 0.25}
          />
        </Svg>
      );
    }
    return final;
  };

  const generateXAxis = () => {
    let final = [];
    for (let i = 0; i < 6; i++) {
      final.push(
        <Text
          key={i}
          style={{
            marginRight: i === 4 ? width * 5 - 20 : (width + 2) * 5 - 20,
            color: "white",
            width: 20,
            fontSize: 10,
            paddingBottom: 10,
          }}
        >
          {
            chartData[i * 6 < 30 ? i * 6 : i * 6 - 1][0]
              .split("-")[2]
              .split("T")[0]
          }
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
          <View>
            <Text h2 style={styles.heading}>
              {stock}
            </Text>
          </View>
          <View style={styles.item}>
            <View style={styles.section}>
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
              <View style={styles.row}>
                <Text style={styles.left}>Prev Close</Text>
                <Text style={styles.right}>
                  {parseFloat(chartData[len - 1][2]).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.space} />
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.left}>52 W High</Text>
                <Text style={styles.right}>{stats.high}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>52 W Low</Text>
                <Text style={styles.right}> {stats.low}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>Volume</Text>
                <Text style={styles.right}>{stats.volume}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>Market Cap</Text>
                <Text style={styles.right}>{stats.cap}</Text>
              </View>
            </View>
            <View style={styles.rule} />
          </View>
          <View style={styles.row}>
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
                {generateGrid()}
              </Svg>
            </View>
            <View style={styles.column}>{generateYAxis()}</View>
          </View>
          <View style={styles.row}>
            <View style={styles.xAxis}>{generateXAxis()}</View>
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
