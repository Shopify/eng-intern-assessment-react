import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import SavedLaps from "./SavedLaps";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [timeOn, setTimeOn] = useState<boolean>(false);
  const [lappedTimes, setLappedTimes] = useState<number[]>([]);

  useEffect(() => {
    // setInterval returns Timeout object as an ID for the interval
    let interval: NodeJS.Timeout | null = null;

    if (timeOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeOn]);

  const handleTimeReset = () => {
    setTime(0);
    setLappedTimes([]);
  };
  const handleTimeStart = () => {
    setTimeOn(true);
  };
  const handleTimeStop = () => {
    setTimeOn(false);
  };
  const handleLapClick = () => {
    setLappedTimes((prevTimes) => [time, ...prevTimes]);
  };

  return (
    <>
      <span className="timerText">
        <span>{("0" + Math.floor(time / (60 * 60 * 1000))).slice(-2)}:</span>

        <span>{("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        <span className="ms">
          .{("0" + Math.floor((time / 10) % 100)).slice(-2)}
        </span>
      </span>
      <div className="buttonContainer">
        <StopWatchButton
          type="Restart"
          onBtnClick={handleTimeReset}
          isDisabled={timeOn}
        />
        <StopWatchButton
          type="Start"
          onBtnClick={handleTimeStart}
          isDisabled={timeOn}
        />
        <StopWatchButton
          type="Stop"
          onBtnClick={handleTimeStop}
          isDisabled={!timeOn}
        />
        <StopWatchButton
          type="Lap"
          onBtnClick={handleLapClick}
          isDisabled={!timeOn}
        />
      </div>
      <SavedLaps lappedTotalTimes={lappedTimes} />
    </>
  );
}
