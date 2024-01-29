import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // state to keep track of time
  const [time, setTime] = useState<number>(0);

  // state to track if the time has started or stopped
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // function for starting the stopwatch
  const startTime = () => {
    setIsRunning(true);
    // time to increase by an interval of one second
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    // clear interval
    return () => {
      clearInterval(interval);
      setIsRunning(false);
    };
  };

  return (
    <div>
      <div>{`${time} seconds`}</div>
      <StopWatchButton title="Start" onClick={startTime} />
      {/* <StopWatchButton title="Stop" />
      <StopWatchButton title="Reset" />
      <StopWatchButton title="Lap" /> */}
    </div>
  );
}
