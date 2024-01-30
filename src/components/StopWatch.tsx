import React from "react";
import { displayTime } from "./utils";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  return (
    <div>
      <p className="time-display">{displayTime(time)}</p>
    </div>
  );
}
