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
      setElapsed((prevElapsed) => prevElapsed + 1);
      setLapElapsed((prevLapElapsed) => prevLapElapsed + 1);
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
    console.log(laps);
  };

  return (
    <div>
      <h1>{elapsed / 100 + "s"}</h1>
      <h2>{lapElapsed / 100 + "s"}</h2>
      <StopWatchButton title={"Start"} onPressed={onStart} />
      <StopWatchButton title={"Stop"} onPressed={onStop} />
      <StopWatchButton title={"Reset"} onPressed={onReset} />
      <StopWatchButton title={"Lap"} onPressed={onLap} />
    </div>
  );
}
