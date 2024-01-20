import React, { useState } from "react";
import "./StopWatchButton.css";

type Props = {
  setTimeInMiliSeconds: Function;
  timerString: string;
  setLaps: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTimeInMiliSeconds, timerString, setLaps } = props; // Destructuring props

  const [intervalId, setIntervalId] = useState<number>(0);
  const [startButtonSwitch, setStartButtonSwitch] = useState<boolean>(true);

  const handleStartButton = () => {
    // handles the start button click and sets the interval
    let interval: any = setInterval(() => {
      setTimeInMiliSeconds(
        (prevTimeInMiliSeconds: number) => prevTimeInMiliSeconds + 10
      );
    }, 10);
    setIntervalId(interval);
    setStartButtonSwitch(!startButtonSwitch);
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
    setStartButtonSwitch(!startButtonSwitch);
  };

  const handleResetButton = () => {
    // resets the stopwatch and the laps
    clearInterval(intervalId);
    setIntervalId(0);
    setTimeInMiliSeconds(0);
    setLaps([]);
    setStartButtonSwitch(true);
  };

  const handleLapButton = () => {
    setLaps((prevLaps: string[]) => [timerString, ...prevLaps]);
  };

  return (
    <div className="controls-container">
      {startButtonSwitch && intervalId ? ( // conditions for buttons to be displayed
        <button onClick={handleResetButton}>Reset</button>
      ) : (
        <button onClick={handleLapButton} disabled={startButtonSwitch}>
          Lap
        </button>
      )}
      <button
        onClick={startButtonSwitch ? handleStartButton : handleStopButton}
        className={startButtonSwitch ? "start-button" : "stop-button"}
      >
        {startButtonSwitch ? "Start" : "Stop"}
      </button>
    </div>
  );
}
