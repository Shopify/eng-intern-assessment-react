import React from "react";

interface DisplayComponentProps {
  getFormattedTime: () => string;
  isRunning: boolean;
}

const DisplayComponent: React.FC<DisplayComponentProps> = (props) => {
  // const formatTimeUnit = (unit: number): string =>
  //   unit >= 10 ? unit.toString() : "0" + unit;

  // const formattedTime = `${formatTimeUnit(props.time.m)}:${formatTimeUnit(
  //   props.time.s
  // )}:${formatTimeUnit(props.time.ms)}`;

  return (
    <div data-testid="time-display">
      {props.isRunning && props.getFormattedTime()}
    </div>
  );
};

export default DisplayComponent;
