// The main component that renders the stopwatch and handles its functionality.
import React, { useState, useEffect } from "react";

import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  // states for timer
  const [isStopped, setIsStopped] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // use setInterval to update timer
  useEffect(() => {
    if (!isStopped) {
      const intervalId = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 10);
      }, 10); // increment timeElapsed by 10 every 10 milliseconds

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStopped]);

  // function to update isStopped state of timer
  const updateStop = (stop: boolean): void => {
    setIsStopped(stop);
  };

  return (
    <div>
      <StopWatch timeElapsed={timeElapsed} />
      <StopWatchButton updateStop={updateStop} />
    </div>
  );
}
