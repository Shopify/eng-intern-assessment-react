import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [elapsed, setElapsed] = useState(0); // elapsed time in milliseconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]); // array of lap times in milliseconds
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

  // create an interval to set the elapsed time every 10ms
  // store interval id in a variable for stop function
  function start() {
    setElapsed(0);
    setIsRunning(true);
    let startTime = Date.now();
    const intervalId = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 10);
    setIntervalId(intervalId);
  }

  // clear interval and add lap time
  function stop() {
    clearInterval(intervalId!);
    setIsRunning(false);
    setIsPaused(false);
  }

  // pause and resume the stopwatch
  function pause() {
    setIsPaused((prev) => !prev);
  }

  // reset to default
  function reset() {
    clearInterval(intervalId!);
    setIsRunning(false);
    setIsPaused(false);
    setElapsed(0);
    setLapTimes([]);
  }

  return (
    <div
      style={{
        width: "100%",
        padding: 15,
        fontSize: 72,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
        {`${getMinutes(elapsed)}:${getSeconds(elapsed)}:${getMillis(elapsed)}`}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
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
          onClick={pause}
          style={{
            padding: 10,
            border: "2px solid",
            borderColor: "lightgrey",
            backgroundColor: "#F8F6FF",
          }}
        />
        <StopWatchButton
          type="reset"
          onClick={reset}
          style={{ padding: 10, backgroundColor: "#E8B163" }}
        />
      </div>
    </div>
  );
}
