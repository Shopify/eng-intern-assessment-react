import React from "react";
import { displayTime } from "./utils";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  return (
    <div>
      <p>{displayTime(time)}</p>
    </div>
  );
}
