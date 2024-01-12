import React from "react";
import { useState } from "react";
import StopWatch from "./StopWatch";
import { StopWatchContext } from "./StopWatchContext";

export default function App() {
  // stores the current time
  const [time, setTime] = useState<number>(0);

  // stores whether the timer is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // stores the laps in an array
  const [laps, setLaps] = useState<Array<number>>([]);

  return (
    <StopWatchContext.Provider
      value={{ time, setTime, isRunning, setIsRunning, laps, setLaps }}
    >
      <StopWatch />
    </StopWatchContext.Provider>
  );
}
