import React, { useEffect, useMemo, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const formatMs = (ms: number) => {
  // round ms to integer
  ms = Math.round(ms);

  const hours = Math.floor(ms / 1000 / 60 / 60);
  ms = ms - hours * 1000 * 60 * 60;

  const minutes = Math.floor(ms / 1000 / 60);
  ms = ms - minutes * 1000 * 60;

  const seconds = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  const msStr = ms.toString().padStart(3, "0");
  return `${hoursStr}:${minutesStr}:${secondsStr}.${msStr}`;
};

/**
 * Stopwatch App
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
        setTimerMs(pausedMs + performance.now() - startMs);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  const startTimer = () => {
    console.log("Start");
    setStartMs(performance.now());
    setRunning(true);
  };

  const stopTimer = () => {
    console.log("Stop");
    setRunning(false);
    // update pausedMs
    setPausedMs(timerMs);
  };

  const resetTimer = () => {
    console.log("Reset");
    setRunning(false);
    // reset runningMs and pausedMs
    setTimerMs(0);
    setPausedMs(0);
  };

  const addLap = () => {
    console.log("Lap");
    setLapTimes([runningTimeString, ...lapTimes]);
  };

  return (
    <main className="mx-auto max-w-3xl p-5">
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
            <li key={lapTimes.length - idx}>
              Lap {(lapTimes.length - idx).toString().padStart(2, "0")}:{" "}
              {lapTime}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
