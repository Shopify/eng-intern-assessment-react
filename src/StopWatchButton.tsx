import React, { useState } from "react";

// Maximum number of laps that can be recorded
const maxLaps = 25;

type Props = {
  time: number;
  setTime: Function;
  setLaps: Function;
  laps: Array<number>;
};
export default function StopWatchButton(props: Props) {
  const { time, setTime, setLaps } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleStartButton = (e: object) => {
    let interval: any = setInterval(() => {
      setTime((prev: number) => prev + 1);
    }, 10);

    setIntervalId(interval);
    setIsTimerActive(true);
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
    setIsTimerActive(false);
  };

  const handleLapsButton = () => {
    if (isTimerActive) {
      setLaps((prevLaps: any) => [...prevLaps, time]);
    }
  };

  const handleResetButton = () => {
    clearInterval(intervalId);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="stopwatchbutton-container">
      {isTimerActive ? (
        <button onClick={handleStopButton}>Stop</button>
      ) : (
        <button onClick={handleStartButton}>Start</button>
      )}
      <button onClick={handleLapsButton}>Laps</button>
      <button onClick={handleResetButton}>Reset</button>
    </div>
  );
}
