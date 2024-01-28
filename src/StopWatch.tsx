import React from "react";
import StopwatchButton from "./StopWatchButton";

interface StopwatchProps {
  elapsedTime: number;
  isRunning: boolean;
  laps: Array<{ id: number; time: number }>;
  startStop: () => void;
  reset: () => void;
  recordLap: () => void;
}

export default function StopWatch() {
  return <div></div>;
}
