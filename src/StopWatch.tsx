import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
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
  const showLap = () => {
    alert("show lap");
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
      {time}
      <StopWatchButton buttonText={buttonText} onClickHandler={startWatch} />
      <StopWatchButton buttonText="Reset" onClickHandler={resetWatch} />
      <StopWatchButton buttonText="Lap" onClickHandler={showLap} />
    </>
  );
}
