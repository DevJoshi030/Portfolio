import React, { useEffect, useState } from "react";

import { PieChart } from "react-native-chart-kit";

import { View, Dimensions, ActivityIndicator } from "react-native";

import { Text, Icon } from "react-native-elements";
import { getSectorData, getUserStocks } from "../utils/stockFunctions";

import styles from "../styles/AnalysisStyles";

const Analysis = (props) => {
  const [data, setData] = useState(null);
  const [warning, setWarning] = useState(false);

  const colors = [
    "#d11011",
    "#01bfa6",
    "#941694",
    "#ff6ab4",
    "#ffa500",
    "#c96118",
    "#191971",
    "#c49962",
    "#8e9aa8",
    "#1e90ff",
    "#388ac4",
    "#79c3c6",
    "#32cd33",
    "#6db001",
    "#a3b20d",
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    const generateData = async () => {
      const sectorData = await getSectorData();
      const userStocks = getUserStocks();
      let result = [];
      let tempData = {};

      let count = 0;
      for (const stock of userStocks) {
        const sector = sectorData[stock.name];
        if (tempData[sector]) {
          tempData[sector] += 1;
        } else {
          tempData[sector] = 1;
        }
      }
      Object.entries(tempData).forEach(([key, value]) => {
        result.push({
          name: key,
          count: value,
          color: colors[count],
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
        count += 1;
      });

      if (result.length < 4) setWarning(true);
      setData(result);
    };
    generateData();
  }, []);

  return (
    <>
      {data ? (
        <View style={styles.main}>
          <Text h3 style={styles.title}>
            Portfolio Analysis
          </Text>
          <PieChart
            data={data}
            width={Dimensions.get("window").width}
            height={300}
            chartConfig={chartConfig}
            accessor={"count"}
            backgroundColor={"transparent"}
            paddingLeft={"20"}
            styles={styles.chart}
          />
          {warning ? (
            <>
              <Icon name="error-outline" color="#f9a529" size={32} />
              <Text h4 h4Style={styles.text}>
                Your portfolio is not diversified. It is recommended to invest
                in atleast 4 different sectors
              </Text>
            </>
          ) : (
            <>
              <Icon
                name="done-all"
                color="#26a69a"
                style={styles.icon}
                size={32}
              />
              <Text h4 h4Style={styles.text}>
                Your portfolio is diversified.
              </Text>
            </>
          )}
        </View>
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

export default Analysis;
