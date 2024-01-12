import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<Array<number>>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Start");

  const startWatch = () => {
    const newButtonText =
      buttonText === "Start" || buttonText === "Resume" ? "Pause" : "Resume";
    setButtonText(newButtonText);
    setIsRunning(!isRunning);
  };

  const resetWatch = () => {
    setButtonText("Start");
    setTime(0);
    setIsRunning(false);
  };

  const recordLap = () => {
    console.log("laptime", lapTimes);
    if (isRunning) {
      setLapTimes((prev) => [...prev, time]);
      setTime(0);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
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
      <div>StopWatch</div>
      {formatTime(time)}
      <StopWatchButton buttonText={buttonText} onClickHandler={startWatch} />
      <StopWatchButton buttonText="Reset" onClickHandler={resetWatch} />
      <StopWatchButton buttonText="Lap" onClickHandler={recordLap} />
      {lapTimes.length > 0 &&
        lapTimes.map((lapTime) => (
          <div key={lapTime}>{formatTime(lapTime)}</div>
        ))}
    </>
  );
}
