import React from "react";
import { getPrettyTime } from "./utils";

type StopWatchProps = {
  time: number;
};

export default function StopWatch(props: StopWatchProps) {
  const { time } = props;
  return (
    <p className="stopwatch-text" data-testid="stopwatch-text">
      {getPrettyTime(time)}
    </p>
  );
}
