import firebase from "firebase";

export const getStockPrice = async (stock) => {
  return await fetch(
    "https://17BCE020.pythonanywhere.com/api/get-stock-price/" + stock + ".NS"
  )
    .then((res) => res.json())
    .then((data) => data.price.toFixed(2).toString());
};

export const getStockData = async (stock) => {
  return await fetch(
    "http://localhost/api/get-stock-data/" + stock + ".NS"
  ).then((res) => res.json());
};

export const getUserStocks = () => {
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
