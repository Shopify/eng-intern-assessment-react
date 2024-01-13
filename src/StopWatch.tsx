import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // stopwatch context
  const [elapsed, setElapsed] = useState(0); // elapsed time in milliseconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // lap table context
  const [lapTimes, setLapTimes] = useState<string[]>([]);
  function addLap(LapTime: string) {
    setLapTimes([LapTime, ...lapTimes]);
  }
  function clearLaps() {
    setLapTimes([]);
  }

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
    setIntervalId(intervalId);
  }

  // clear interval and add lap time
  function stop() {
    clearInterval(intervalId);
    setElapsed(0);
    setIsRunning(false);
    setIsPaused(false);
  }

  // pause and resume the stopwatch
  function pause() {
    clearInterval(intervalId);
    setIsPaused(true);
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
        height: "90vh",
        width: "100vw",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
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
          {/* 
          start button initiates a 10ms interval that updates the elapsed time 
          stop button clears the interval and resets the elapsed time
          */}
          <StopWatchButton
            type={isRunning ? "Stop" : "Start"}
            onClick={isRunning ? stop : start}
            style={{
              padding: 10,
              backgroundColor: isRunning ? "#DE9999" : "#99DE9C",
            }}
          />
          {/* 
          pause button clears the interval without resetting the elapsed time 
          resume button starts a new interval with the elapsed time at pause
          */}
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
          {/*
          reset button clears the interval, sets elapsed time to 0, and clears lap table
          */}
          <StopWatchButton
            type="Reset"
            onClick={reset}
            style={{ padding: 10, backgroundColor: "#E8B163" }}
          />
          {/*
          lap button adds the current elapsed time in string format to the lap table
          */}
          <StopWatchButton
            type="Lap"
            disabled={!isRunning}
            onClick={() => addLap(getTimeStamp(elapsed))}
            style={{ padding: 10, backgroundColor: "lightgrey" }}
          />
        </div>
      </div>
      <div
        data-testid="lap-list"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          maxWidth: 300,
          height: 300,
          overflowY: "scroll",
          borderRadius: 10,
          backgroundColor: "lightgrey",
          marginLeft: 50,
          fontSize: 24,
          fontFamily: "Inter",
        }}
      >
        {lapTimes.map((lap, index) => (
          <div key={index} style={{ marginBlock: 10 }}>
            <div
              style={{
                paddingBlock: 5,
                paddingInline: 50,
                borderRadius: 15,
                backgroundColor: "#F8F6FF",
              }}
            >
              {lap}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
