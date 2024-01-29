import React from "react";

interface DisplayComponentProps {
  time: {
    h: number;
    m: number;
    s: number;
    ms: number;
  };
}

const DisplayComponent: React.FC<DisplayComponentProps> = (props) => {
  const formatTimeUnit = (unit: number): string =>
    unit >= 10 ? unit.toString() : "0" + unit;

  const formattedTime = `${formatTimeUnit(props.time.m)}:${formatTimeUnit(
    props.time.s
  )}:${formatTimeUnit(props.time.ms)}`;

  return <div>{formattedTime}</div>;
};

export default DisplayComponent;
