import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  // The stopwatch app will only be in any of these 3 states at one time.
  const [watchState, setWatchState] = useState<"reset" | "running" | "paused">(
    "reset"
  );
  const [elapsedTime, setElapsedTime] = useState(0); // in centiseconds

  const handleStart = () => {
    setWatchState("running");
    setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 10);
  };

  return (
    <div>
      <StopWatch elapsedTime={elapsedTime} />
      <StopWatchButton text={"Start"} onClick={handleStart} />
    </div>
  );
}
