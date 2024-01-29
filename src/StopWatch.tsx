import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // state to keep track of time
  const [time, setTime] = useState<number>(0);

  // state to track if the time has started or stopped
  const [isRunning, setIsRunning] = useState<boolean>(false);

  //useEffect to manage the interval (start/stop) as the condition for isRunning state changes
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      // start interval if isRunning state true
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // stop & clear interval if isRunning state false
      clearInterval(interval);
    }
    // run function when component unmounts or dependency changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // start stopwatch
  const startTime = () => {
    setIsRunning(true);
  };

  // stop stopwatch
  const stopTime = () => setIsRunning(false);

  // reset stopwatch
  const resetTime = () => {
    setTime(0);
    stopTime();
  };

  return (
    <div>
      <div>{`${time} seconds`}</div>
      <StopWatchButton
        onClick={isRunning ? stopTime : startTime}
        title={isRunning ? "Stop" : "Start"}
      />
      <StopWatchButton onClick={resetTime} title="Reset" />
      {/* <StopWatchButton title="Lap" /> */}
    </div>
  );
}
