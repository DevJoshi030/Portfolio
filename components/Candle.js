import React from "react";

import { Line, Rect } from "react-native-svg";

const MARGIN = 2;

const Candle = (props) => {
  const open = props.candle[1];
  const close = props.candle[2];
  const high = props.candle[3];
  const low = props.candle[4];
  const fill = close > open ? "#26a69a" : "#b33e3c";
  const x = props.index * props.width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  return (
    <>
      <Line
        x1={x + props.width / 2}
        y1={props.scaleY(low)}
        x2={x + props.width / 2}
        y2={props.scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + MARGIN}
        y={props.scaleY(max)}
        width={props.width - MARGIN * 2}
        height={props.scaleBody(max - min)}
        {...{ fill }}
      />
    </>
  );
};

export default Candle;
