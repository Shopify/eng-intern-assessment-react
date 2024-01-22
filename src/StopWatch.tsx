import React from "react";
import { StopWatchButton } from "./StopWatchButton";

export default function StopWatch() {
  return (
    <div>
      <StopWatchButton>Start</StopWatchButton>
      <StopWatchButton>Stop</StopWatchButton>
      <StopWatchButton>Lap</StopWatchButton>
      <StopWatchButton>Reset</StopWatchButton>
    </div>
  );
}
