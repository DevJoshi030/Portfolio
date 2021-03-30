//Importing the react components from main react
import React, { Component } from "react";
//Importing the components of react-native for uses
import { Text, View, StyleSheet, Animated } from "react-native";
//Importing the gesture handler components for uses
import { PanGestureHandler } from "react-native-gesture-handler";
export default class GestureHandlerClass extends Component {
  //Creating x axis movement for the shape
  x = new Animated.Value(1);
  ////Creating y axis movement for the shape
  y = new Animated.Value(1);
  manageGesture = Animated.event(
    [{ nativeEvent: { translationX: this.x, translationY: this.y } }],
    { useNativeDriver: true }
  );
  render() {
    let transformStyle;
    //Designing the transform style so that the movement of the shape is very smooth
    transformStyle = {
      transform: [
        {
          translateY: this.y,
        },
        {
          translateX: this.x,
        },
      ],
    };
    return (
      <View style={[GestureStyle.gestureContainer]}>
        <PanGestureHandler onGestureEvent={this.manageGesture}>
          <Animated.View style={[GestureStyle.shape, transformStyle]} />
        </PanGestureHandler>
      </View>
    );
  }
}
//Style sheet for the above components and the for a better presentation of the components
const GestureStyle = StyleSheet.create({
  gestureContainer: {
    flex: 2,
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  shape: {
    width: 155,
    height: 155,
    backgroundColor: "green",
    fontWeight: "bold",
    borderRadius: 99,
  },
});
