import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

const formatMs = (ms: number) => {
  const minutes = Math.floor(ms / 1000 / 60);
  ms = ms - minutes * 1000 * 60;

  const seconds = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;

  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  const msStr = (ms / 10).toString().padStart(2, "0");
  return `${minutesStr}:${secondsStr}:${msStr}`;
};

/**
 * Stopwatch App
 * This component handles the coordination between the display and buttons,
 * and holds the state for the timer itself.
 */
export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<Array<number>>([]);

  // hook to update the time when the timer is running
  useEffect(() => {
    let id: NodeJS.Timer;
    if (running) {
      // we set a delay when updating the time if the timer is running
      id = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else if (!running) {
      clearInterval(id);
    }

    // and wait for the interval to elapse before returning in the callback
    return () => clearInterval(id);
  }, [running]);

  return (
    <main className="m-5 mx-auto max-w-3xl">
      <h1 className="text-4xl">Stopwatch</h1>
      <StopWatch>{formatMs(time ?? 0)}</StopWatch>
      <div className="grid grid-cols-4 gap-2">
        <StopWatchButton
          onClick={() => {
            console.log("Start");
            setRunning(true);
          }}
        >
          Start
        </StopWatchButton>
        <StopWatchButton
          onClick={() => {
            console.log("Stop");
            setRunning(false);
          }}
        >
          Stop
        </StopWatchButton>
        <StopWatchButton
          onClick={() => {
            console.log("Lap");
            setLapTimes((lapTimes) => [...lapTimes, time]);
          }}
        >
          Lap
        </StopWatchButton>
        <StopWatchButton
          onClick={() => {
            console.log("Reset");
            setRunning(false);
            setTime(0);
          }}
        >
          Reset
        </StopWatchButton>
      </div>
      <div>
        {lapTimes.map((lapTime) => {
          return <>{lapTime}</>;
        })}
      </div>
    </main>
  );
}
