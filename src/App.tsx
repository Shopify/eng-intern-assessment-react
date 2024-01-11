import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const toggleStopWatch = () => {
    return;
  };

  const resetStopWatch = () => {
    return;
  };

  const lapStopWatch = () => {
    return;
  };

  return (
    <div>
      <StopWatch />
      <StopWatchButton handleClick={toggleStopWatch} label="toggle" />
      <StopWatchButton handleClick={resetStopWatch} label="reset" />
      <StopWatchButton handleClick={lapStopWatch} label="lap" />
    </div>
  );
}
