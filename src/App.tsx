import React, { useEffect, useMemo, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

/**
 * Format milliseconds elapsed into a human-readable string
 * @param ms Milliseconds elapsed
 * @returns Formatted timer string in HH:MM:SS.sss
 */
export const formatMs = (ms: number): string => {
  // round ms to integer
  ms = Math.round(ms);

  // break ms into components and compute the value for each
  const hours = Math.floor(ms / 1000 / 60 / 60);
  ms = ms - hours * 1000 * 60 * 60;

  const minutes = Math.floor(ms / 1000 / 60);
  ms = ms - minutes * 1000 * 60;

  const seconds = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;

  // format components with 2 or 3 leading zeroes as needed
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  const msStr = ms.toString().padStart(3, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}.${msStr}`;
};

/**
 * This component handles the coordination between the display and buttons,
 * and holds the state for the timer itself.
 */
export default function App() {
  // timer state
  const [running, setRunning] = useState(false);

  // timerMs at the time the pause button was clicked
  const [pausedMs, setPausedMs] = useState(0);
  // Date.now() from when timer start button was clicked
  const [startMs, setStartMs] = useState<number>(undefined);

  // ms elapsed, displayed on timer
  const [timerMs, setTimerMs] = useState(0);
  // memoize formatted timer string to reduce rerenders
  const runningTimeString = useMemo(() => formatMs(timerMs), [timerMs]);

  // list of lap times
  const [lapTimes, setLapTimes] = useState<Array<string>>([]);

  const [lapsParent] = useAutoAnimate();

  // timer loop
  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (running) {
      intervalId = setInterval(() => {
        // running ms = paused ms + diff since last paused
        // since we are using performance.now(),
        // accuracy is not compromised by high frequency refreshing
        setTimerMs(pausedMs + performance.now() - startMs);
      }, 1);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  const startTimer = () => {
    console.debug("Start");
    setStartMs(performance.now());
    setRunning(true);
  };

  const stopTimer = () => {
    console.debug("Stop");
    setRunning(false);
    // update pausedMs for timer restart
    setPausedMs(timerMs);
  };

  const resetTimer = () => {
    console.debug("Reset");
    setRunning(false);
    // reset runningMs and pausedMs
    setTimerMs(0);
    setPausedMs(0);
    // reset laps
    setLapTimes([]);
  };

  const addLap = () => {
    console.debug("Lap");
    // add lap to top of array, so most recent laps are displayed first
    setLapTimes([runningTimeString, ...lapTimes]);
  };

  return (
    <main className="mx-auto max-w-4xl p-5">
      <h1 className="text-4xl">Stopwatch</h1>
      <StopWatch>{runningTimeString}</StopWatch>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StopWatchButton onClick={startTimer}>Start</StopWatchButton>
        <StopWatchButton onClick={stopTimer}>Stop</StopWatchButton>
        <StopWatchButton onClick={addLap}>Lap</StopWatchButton>
        <StopWatchButton onClick={resetTimer}>Reset</StopWatchButton>
      </div>
      <ul className="text-2xl" ref={lapsParent}>
        {lapTimes.map((lapTime, idx) => {
          return (
            // reverse index keys so they stay stable when adding laps from the top
            <li key={lapTimes.length - idx}>
              {/* use string index to generate lap number */}
              Lap {(lapTimes.length - idx).toString().padStart(2, "0")}:{" "}
              {lapTime}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
