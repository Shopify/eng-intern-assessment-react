import React, { useRef, useState } from "react";

import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [elapsed, setElapsed] = useState(0);
  const [lapElapsed, setLapElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  let intervalRef = useRef(null);
  const onStart = () => {
    if (isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((prevElapsed) => prevElapsed + 10);
      setLapElapsed((prevLapElapsed) => prevLapElapsed + 10);
    }, 10);
    setIsRunning(true);
  };

  const onStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const onReset = () => {
    setElapsed(0);
    setLapElapsed(0);
  };

  const onLap = () => {
    laps.unshift(lapElapsed);
    setLapElapsed(0);
    setLaps(laps);
  };

  const formatTime = (ms: number) => {
    const hours: number = Math.floor(ms / 3600000);
    let remainder: number = ms % 3600000;

    const minutes: number = Math.floor(remainder / 60000);
    remainder = remainder % 60000;

    const seconds: number = Math.floor(remainder / 1000);
    remainder = (remainder % 1000) / 10;

    let formattedTime =
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2) +
      "." +
      String(remainder).padEnd(2, "0");

    return hours > 0 ? hours + ":" + formattedTime : formattedTime;
  };

  return (
    <div>
      <h1>{formatTime(elapsed)}</h1>
      <StopWatchButton title={"Start"} onPressed={onStart} />
      <StopWatchButton title={"Stop"} onPressed={onStop} />
      <StopWatchButton title={"Reset"} onPressed={onReset} />
      <StopWatchButton title={"Lap"} onPressed={onLap} />
    </div>
  );
}
