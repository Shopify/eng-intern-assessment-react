import React from "react";
import StopWatchButton from "./StopWatchButton";
import { useState } from "react";

export default function StopWatch() {
  const [displayedTime, setDisplayedTime] = useState<number>(0);
  const [startStopAction, setStartStopAction] = useState<boolean>(false);
  const [milliSecondsIntervalId, setMilliSecondsIntervalId] =
    useState<NodeJS.Timer | null>(null);
  const [laps, setLaps] = useState<Array<number>>([]);

  const startStopTimer = () => {
    setStartStopAction(!startStopAction);

    console.log(startStopAction);

    if (startStopAction) {
      console.log("first if");
      const id = setInterval(() => {
        setDisplayedTime((prevDisplayedTime) => prevDisplayedTime + 1);
      }, 100);
      setMilliSecondsIntervalId(id);
    } else {
      clearInterval(milliSecondsIntervalId);
    }
  };

  const resetStopWatch = () => {
    setStartStopAction(false);
    clearInterval(milliSecondsIntervalId);
    setDisplayedTime(0);
  };

  const recordLap = () => {
    console.log("lap");
    setLaps([...laps, displayedTime]);
  };

  return (
    <div>
      <StopWatchButton title={"Start/Stop"} handleClick={startStopTimer} />
      <StopWatchButton title={"Reset"} handleClick={resetStopWatch} />
      <StopWatchButton title={"Lap"} handleClick={recordLap} />
      <div className="clock-container">{displayedTime}</div>
      <div className="lap-container">
        Laps
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
