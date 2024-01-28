import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

// renders the stopwatch and has all the functionality
export default function App() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]); // using array here to keep track of multiple timings
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const handleStart = () => {
    if (!running) {
      // when starting (from paused state or fresh), take into account the old "time" value
      const startTime = Date.now() - time;

      const id = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);

      // make timer state to be on again
      setRunning(true);

      // set new interval to keep track of when stopwatch is running again
      setIntervalId(id);
    }
  };

  const handleStop = () => {
    // set the state to False to ensure that we stop the timer
    if (running) {
      setRunning(false);

      // clear interval to make sure that time stop updating
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    }
  };

  const handleReset = () => {
    setRunning(false);

    // set to 0 since we are reseting
    setTime(0);

    // set to empty array since we are not tracking laps anymore
    setLaps([]);

    // clear interval to make sure that time stop updating
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  };

  const handleLap = () => {
    // update state-managed array for laps to also take the most recent time
    setLaps([...laps, time]);
  };

  return (
    <div>
      <StopWatch time={time} laps={laps} />
      <StopWatchButton
        isRunning={running}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
      />
    </div>
  );
}
