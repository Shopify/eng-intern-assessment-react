import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [buttonText, setButtonText] = useState<string>("Start");

  const startWatch = () => {
    const newButtonText =
      buttonText === "Start" || buttonText === "Resume" ? "Pause" : "Resume";
    setButtonText(newButtonText);
  };
  const resetWatch = () => {
    setButtonText("Start");
  };
  const showLap = () => {
    alert("show lap");
  };
  return (
    <>
      <div>StopWatch</div>
      <StopWatchButton buttonText={buttonText} onClickHandler={startWatch} />
      <StopWatchButton buttonText="Reset" onClickHandler={resetWatch} />
      <StopWatchButton buttonText="Lap" onClickHandler={showLap} />
    </>
  );
}
