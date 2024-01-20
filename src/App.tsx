import React, { useEffect, useState, useRef } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [laps, setLaps] = useState<number[]>([0]);
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
    setLaps([0]);
  };

  const handleLap = (): void => {
    if (running) {
      setLaps((prev) => [...prev, time]);
    }
  };

  const format = (time: number): string => {
    const hour = Math.floor(time / 1000 / 60 / 60)
      .toString()
      .padStart(2, "0");
    const min = Math.floor((time / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hour}:${min}:${sec}:${ms}`;
  };

  return (
    <div>
      <StopWatch time={time} format={format} />
      <StopWatchButton
        running={running}
        handleStartAndStop={startAndStop}
        handleReset={reset}
        handleLap={handleLap}
      />
      <div>
        {laps.map((lap, idx) => {
          if (idx > 0) {
            return (
              <div key={idx}>
                {idx}: {format(lap - laps[idx - 1])}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
