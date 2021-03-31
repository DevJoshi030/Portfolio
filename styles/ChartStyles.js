import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const MARGIN = screenWidth / 15;

export default {
  chartBody: {
    backgroundColor: "black",
    paddingTop: screenWidth / 20,
    paddingLeft: screenWidth / 50,
  },
  column: {
    backgroundColor: "black",
    width: "20%",
  },
  columnText: {
    marginTop: MARGIN / 2 - 0.65,
    marginBottom: MARGIN / 2 - 0.65,
    color: "white",
    paddingLeft: 10,
    fontSize: 10,
  },
  item: {
    height: "auto",
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  section: {
    width: "49%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  left: {
    fontSize: 16,
    justifyContent: "flex-start",
  },
  right: {
    fontSize: 16,
    position: "absolute",
    right: 0,
    fontWeight: "bold",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
    height: "100%",
    flexGrow: 0,
  },
  space: {
    width: "2%",
  },
  rule: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    padding: 5,
    width: "100%",
  },
  loading: {
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  margin: {
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    backgroundColor: "#002f6c",
    paddingTop: 5,
    paddingBottom: 5,
  },
  white: {
    color: "white",
  },
  leftMagrin: {
    marginLeft: 10,
    width: screenWidth,
  },
  xAxis: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: screenWidth / 50,
    backgroundColor: "black",
  },
  heading: {
    textAlign: "center",
  },
};
