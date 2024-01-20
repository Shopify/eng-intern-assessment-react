import React, { useEffect, useState, useRef } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [lap, setLap] = useState<number[]>([0]);
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startAndStop = (): void => {
    setRunning(!running);
  };

  const stop = (): void => {
    setRunning(false);
  };

  const reset = (): void => {
    setRunning(false);
    setTime(0);
    setLap([0]);
  };

  const handleLap = (): void => {
    setLap((prev) => [...prev, time]);
  };

  return (
    <div>
      <StopWatch time={time} />
      <StopWatchButton
        running={running}
        handleStartAndStop={startAndStop}
        handleReset={reset}
        handleLap={handleLap}
      />
    </div>
  );
}
