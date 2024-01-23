import React, { useState, useEffect } from "react";
import ButtonFactory from "./ButtonFactory";
import SavedLaps from "./SavedLaps";
import { useStopWatchTime } from "../hooks/useStopWatchTime";
import { formatTime } from "../utils/FormatTime";

/* 
Entry point for the StopWatch component
StopWatches have a Timer, Buttons, and Saved Laps
*/
export default function StopWatch() {
  // time state managed by custom hook
  const { time, setTime, timeOn, setTimeOn } = useStopWatchTime();
  const [lappedTimes, setLappedTimes] = useState<number[]>([]);

  const buttonFactoryProps = {
    time,
    timeOn,
    setTime,
    setTimeOn,
    setLappedTimes,
  };
  // miliseconds are extracted from the rest of time - to be rendered differently
  let [formattedTime, formattedMs] = formatTime(time).split(".");

  return (
    <>
      <span className="timerText" data-testid="timer-text">
        {formattedTime}
        <span className="ms">.{formattedMs}</span>
      </span>

      <div className="buttonContainer">
        <ButtonFactory {...buttonFactoryProps} />
      </div>

      <SavedLaps lappedTotalTimes={lappedTimes} />
    </>
  );
}
