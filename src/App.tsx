import React, { useState, useEffect } from "react";
import Stopwatch from "./StopWatch";
import "./App.css";

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<Array<{ id: number; time: number }>>([]);
  const [lapId, setLapId] = useState<number>(1);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setLapId(1);
  };

  const recordLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, { id: lapId, time: elapsedTime }]);
      setLapId(lapId + 1);
    }
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <Stopwatch
        elapsedTime={elapsedTime}
        isRunning={isRunning}
        laps={laps}
        startStop={startStop}
        reset={reset}
        recordLap={recordLap}
      />
    </div>
  );
};

export default App;
