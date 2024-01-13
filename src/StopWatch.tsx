import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

type StopWatchProps = {
  /** add laptime to table */
  addLap: (lapTime: string) => void;
  /** remove all saved times */
  clearLaps: () => void;
};
export default function StopWatch({ addLap, clearLaps }: StopWatchProps) {
  const [elapsed, setElapsed] = useState(0); // elapsed time in milliseconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // returns string respresentations of elapsed time
  function getMillis(time: number) {
    const millis = Math.floor(time / 10) % 100;
    return millis < 10 ? `0${millis}` : `${millis}`;
  }
  function getMinutes(time: number) {
    const minutes = Math.floor(time / 1000 / 60) % 60;
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  }
  function getSeconds(time: number) {
    const seconds = Math.floor(time / 1000) % 60;
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  }
  function getTimeStamp(time: number) {
    return `${getMinutes(time)}:${getSeconds(time)}:${getMillis(time)}`;
  }

  // create an interval to set the elapsed time every 10ms
  // store interval id in a variable for stop function
  function start() {
    setIsRunning(true);
    let startTime = Date.now();
    const intervalId = setInterval(() => {
      // add the elapsed time at interval start to account for paused time
      setElapsed(elapsed + Date.now() - startTime);
    }, 10);
    console.log(intervalId);
    setIntervalId(intervalId);
  }

  // clear interval and add lap time
  function stop() {
    console.log(intervalId);
    clearInterval(intervalId);
    setElapsed(0);
    setIsRunning(false);
    setIsPaused(false);
  }

  // pause and resume the stopwatch
  function pause() {
    clearInterval(intervalId);
    setIsPaused(true);
    console.log(intervalId);
  }
  function resume() {
    setIsPaused(false);
    start();
  }

  // reset to default
  function reset() {
    clearInterval(intervalId);
    setIsRunning(false);
    setIsPaused(false);
    clearLaps();
    setElapsed(0);
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        padding: 15,
        fontSize: 72,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
        {getTimeStamp(elapsed)}
      </div>
      {/* buttons container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
          marginRight: 50,
        }}
      >
        <StopWatchButton
          type={isRunning ? "Stop" : "Start"}
          onClick={isRunning ? stop : start}
          style={{
            padding: 10,
            backgroundColor: isRunning ? "#DE9999" : "#99DE9C",
          }}
        />
        <StopWatchButton
          type={isPaused ? "Resume" : "Pause"}
          onClick={isPaused ? resume : pause}
          disabled={!isRunning}
          style={{
            padding: 10,
            border: "2px solid",
            borderColor: "lightgrey",
            backgroundColor: "#F8F6FF",
          }}
        />
        <StopWatchButton
          type="Reset"
          onClick={reset}
          style={{ padding: 10, backgroundColor: "#E8B163" }}
        />
        <StopWatchButton
          type="Lap"
          disabled={!isRunning}
          onClick={() => addLap(getTimeStamp(elapsed))}
          style={{ padding: 10, backgroundColor: "lightgrey" }}
        />
      </div>
    </div>
  );
}
