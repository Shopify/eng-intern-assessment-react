import React, { useEffect, useState, useRef } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

/**
 * Stopwatch component that provides functionality to start, stop, reset, and record laps.
 */

export default function App() {
  // state to track recorded laps
  const [laps, setLaps] = useState<number[]>([0]);

  // State to track the elapsed time in milliseconds
  const [time, setTime] = useState<number>(0);

  // State to track whether the stopwatch is running
  const [running, setRunning] = useState<boolean>(false);

  // A reference to the current interval
  const intervalRef = useRef<NodeJS.Timeout>();

  // Effect hook to update the time when the stopwatch starts or pauses
  useEffect(() => {
    // For each 10 ms, update the elapsed time
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startAndStop = (): void => {
    setRunning(!running);
  };

  const reset = (): void => {
    setRunning(false);
    setTime(0);
    setLaps([0]);
  };

  const handleLap = (): void => {
    if (running) {
      setLaps((prev) => [...prev, time]);
    }
  };

  // format the number of ms to strings with template: hr:min:sec:ms
  const format = (time: number): string => {
    const hour = Math.floor(time / 1000 / 60 / 60)
      .toString()
      .padStart(2, "0");
    const min = Math.floor((time / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hour}:${min}:${sec}:${ms}`;
  };

  return (
    <div>
      <StopWatch time={time} format={format} />
      <StopWatchButton
        running={running}
        handleStartAndStop={startAndStop}
        handleReset={reset}
        handleLap={handleLap}
      />
      <div>
        {laps.map((lap, idx) => {
          if (idx > 0) {
            return (
              <div key={idx}>
                {/* Display the time used for current lap by subtracting the total time by the total time of previous laps */}
                {idx}: {format(lap - laps[idx - 1])}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
