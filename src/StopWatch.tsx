import React, { useEffect, useState, createContext, useContext } from "react";
import StopWatchButton from "./StopWatchButton";
import { useStopWatchContext } from "./StopWatchContext";

// Component that returns the entire stop watch
export default function StopWatch() {
  const { isRunning, time, setTime, laps } = useStopWatchContext();

  // useEffect that handles the incrementation of the time state variable
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isRunning) {
      // increment the time by 1 every 10 milliseconds
      interval = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // function that formats the time to be displayed in hours:minutes:... format
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <>
      <div>{formatTime(time)}</div>
      <StopWatchButton />
      {laps.map((lap, i) => (
        <div key={i}>{formatTime(lap)}</div>
      ))}
    </>
  );
}
