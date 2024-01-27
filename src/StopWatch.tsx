import React from "react";
import { formatTime } from "./utils/timeFormatter";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  return (
    <div data-testid="stopwatch-time" className="time">
      {formatTime(time)}
    </div>
  );
}
