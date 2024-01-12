import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<Array<number>>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Start");

  const startWatch = () => {
    const newButtonText = buttonText === "Pause" ? "Resume" : "Pause";
    setButtonText(newButtonText);
    setIsRunning(!isRunning);
  };

  const resetWatch = () => {
    setIsRunning(false);
    setButtonText("Start");
    setTime(0);
    setLapTimes([]);
  };

  const recordLap = () => {
    if (isRunning) {
      setLapTimes((prev) => [...prev, time]);
      setTime(0);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <>
      <h2>StopWatch</h2>
      {formatTime(time)}
      <StopWatchButton buttonText={buttonText} onClickHandler={startWatch} />
      <StopWatchButton buttonText="Reset" onClickHandler={resetWatch} />
      <StopWatchButton buttonText="Lap" onClickHandler={recordLap} />
      {lapTimes.length > 0 &&
        lapTimes.map((lapTime, index) => (
          <div key={`${index}-${lapTime}`}>{formatTime(lapTime)}</div>
        ))}
    </>
  );
}
