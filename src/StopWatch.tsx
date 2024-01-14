import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // stopwatch context
  const [elapsed, setElapsed] = useState(0); // elapsed time in milliseconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isRunning, setIsRunning] = useState(false);

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

  // clear interval
  function stop() {
    clearInterval(intervalId);
    setIsRunning(false);
  }

  // reset to default
  function reset() {
    clearInterval(intervalId);
    setIsRunning(false);
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
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 15,
          fontSize: 72,
          fontFamily: "Inter",
        }}
      >
        <div style={{ width: 300 }}>{getTimeStamp(elapsed)}</div>
        {/* buttons container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 15,
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
          <div
            key={index}
            data-testid={`lap-${index}`}
            style={{ marginBlock: 10 }}
          >
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
