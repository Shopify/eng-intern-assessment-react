import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

interface Lap {
  id: number;
  time: number;
}

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
        intervalId = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000)
    }

    return () => clearInterval(intervalId);
  });

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([])
  }

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, { id: laps.length + 1, time}])
  }

  return (
    <div>
      <StopWatch isRunning={isRunning} time={time} laps={laps} />
      <StopWatchButton onClick={handleStartStop} label={"button text"} />
      <StopWatchButton onClick={handleReset} label={"Reset"} />
      <StopWatchButton onClick={handleLap} label={"Lap"} />
    </div>
  );
};

export default App;
