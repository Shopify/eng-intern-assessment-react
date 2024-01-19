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
    //enter handlers code here
  });

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div>
      <StopWatch isRunning={isRunning} time={time} laps={laps} />
      <StopWatchButton onClick={handleStartStop} label={"button text"} />
    </div>
  );
};

export default App;
