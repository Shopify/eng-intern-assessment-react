import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (isRunning) {
      let id = setInterval(() => setTime(time + 1));
      return () => clearInterval(id);
    }
  }, [time, isRunning]);

  const start = () => {
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setLaps([]);
    setTime(0);
  };

  const lap = () => {
    setLaps([...laps, { min: minutes, sec: seconds, ms: milliseconds }]);
  };

  function padNumber(num: number, pad: number) {
    return Math.floor(num).toString().padStart(pad, "0");
  }

  const milliseconds = padNumber(time % 100, 2);
  const seconds = padNumber((time % 6000) / 100, 2);
  const minutes = padNumber((time % 360000) / 6000, 2);

  return (
    <div>
      <div>
        {minutes}:{seconds}:{milliseconds}
      </div>
      <br />
      <div>
        <StopWatchButton text={"Start"} pressed={start} disabled={isRunning} />
        <StopWatchButton text={"Stop"} pressed={stop} disabled={!isRunning} />
        <StopWatchButton text={"Reset"} pressed={reset} disabled={false} />
        <StopWatchButton text={"Lap"} pressed={lap} disabled={!isRunning} />
      </div>
      {laps.map((l) => {
        return (
          <div>
            {l.min}:{l.sec}:{l.ms}
          </div>
        );
      })}
    </div>
  );
};

export default StopWatch;
