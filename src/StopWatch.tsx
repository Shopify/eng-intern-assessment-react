import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      setInterval(() => setTime(time + 1), 1);
    }
  }, [time, isRunning]);

  const startStop = () => {
    useEffect(() => {
      setRunning(!isRunning);
    }, []);
  };

  const reset = () => {
    useEffect(() => {
      setRunning(false);
      setTime(0);
    }, []);
  };

  return (
    <div>
      <div>{time}</div>
      <br />
      <div>
        <StopWatchButton
          text={isRunning ? "Stop" : "Start"}
          pressed={startStop}
          disabled={false}
        />
        <StopWatchButton text={"Reset"} pressed={reset} disabled={false} />
      </div>
    </div>
  );
};

export default StopWatch;
