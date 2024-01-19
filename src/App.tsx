import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./main.css";

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
    } else {
        clearInterval(intervalId)
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const handleStartStop = () => {
    if(isRunning){
        setIsRunning(false);
    } else {
        setStartTime(Date.now() - elapsedTime);
        setIsRunning(true);
    }
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
    <div className="app_container">
      <div className="button_container">
        {isRunning ? (
          <StopWatchButton onClick={handleLap} label={"Lap"} />
        ) : (
          <></>
        )}
        <StopWatchButton
          onClick={handleStartStop}
          label={isRunning ? "Stop" : "Start"}
        />
        {elapsedTime > 0 ? (
          <StopWatchButton onClick={handleReset} label={"Reset"} />
        ) : null}
      </div>
      <StopWatch isRunning={isRunning} time={elapsedTime} laps={laps} />
      <div  className="tagline">
      <p>github.com/jugal09xx</p>
      </div>
    </div>
  );
};

export default App;
