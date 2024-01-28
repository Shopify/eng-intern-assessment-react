import React from "react";
import { StopWatchButton } from "./StopWatchButton";

export default function StopWatch() {
  // not specifying the type here for useState since typescript can infer this from the initial state value
  const [time, setTime] = React.useState(0);
  const [isTimerRunning, setTimerRunning] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timer = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    // cleanup function
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <div>
      <div className="flex justify-center font-bold text-6xl text-primary-200">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <StopWatchButton onClick={() => setTimerRunning(true)}>
        Start
      </StopWatchButton>
      <StopWatchButton onClick={() => setTimerRunning(false)}>
        Stop
      </StopWatchButton>
      <StopWatchButton onClick={() => setTimerRunning(true)}>
        Resume
      </StopWatchButton>
      <StopWatchButton>Lap</StopWatchButton>
      <StopWatchButton onClick={() => setTime(0)}>Reset</StopWatchButton>
    </div>
  );
}
