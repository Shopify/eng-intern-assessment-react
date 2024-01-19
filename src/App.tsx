import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

interface Lap {
  id: number;
  time: number;
}

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      setStartTime((prevStartTime) => prevStartTime ?? Date.now());
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime!);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [
          { id: laps.length + 1, time: elapsedTime },
        ...prevLaps,
      ]);
    }
  };

  return (
    <div>
        <StopWatchButton
        onClick={handleStartStop}
        label={isRunning ? "Stop" : "Start"}
      />
      <StopWatchButton onClick={handleLap} label={"Lap"} />
      <StopWatchButton onClick={handleReset} label={"Reset"} />
      <StopWatch isRunning={isRunning} time={elapsedTime} laps={laps} />
    </div>
  );
};

export default App;
