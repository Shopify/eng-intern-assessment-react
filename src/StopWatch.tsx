import React from "react";
import formatTime from "./helpers/formatTime";

interface StopWatchInterface {
  time: number;
}

export default function StopWatch({ time }: StopWatchInterface) {
  return (
    <div>
      <h1>{formatTime(time)}</h1>
    </div>
  );
}
