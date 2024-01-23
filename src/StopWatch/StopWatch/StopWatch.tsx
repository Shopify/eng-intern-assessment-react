import React, { useState, useEffect, useMemo } from "react";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import { WatchTime } from "../../StopWatchInterface";
import "./StopWatchContainer.css";

export default function StopWatch() {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [lapTime, setLapTime] = useState<number>(0);
  const [watchTime, setWatchTime] = useState<WatchTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isStopWatchActive, setIsStopWatchActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<WatchTime[]>([]);
  const StopWatch = {
    START: "Start",
    STOP: "Stop",
    RESET: "Reset",
    LAP: "Lap",
  };

  useEffect(() => {
    let totalInterval: any;
    if (isStopWatchActive) {
      totalInterval = setInterval(() => setTotalTime(totalTime + 1), 10);
    }
    setWatchTime(calculateWatchTime(totalTime));
    return () => clearInterval(totalInterval);
  }, [isStopWatchActive, totalTime]);

  const handleStartAndStop = () => {
    setIsStopWatchActive(!isStopWatchActive);
  };
  const handleReset = () => {
    setTotalTime(0);
    setLaps([]);
  };
  const calculateWatchTime = (totalnput: number) => ({
    hours: Math.floor(totalnput / 360000),
    minutes: Math.floor((totalnput % 360000) / 6000),
    seconds: Math.floor((totalnput % 6000) / 100),
    milliseconds: totalnput % 100,
  });

  const padStart = (timeInput: number) => timeInput.toString().padStart(2, "0");
  const formatTime = (timeInput: WatchTime) =>
    `${padStart(timeInput.hours)}:${padStart(timeInput.minutes)}:${padStart(
      timeInput.seconds
    )}.${padStart(timeInput.milliseconds)}`;

  const handleLap = () => {
    setLaps([...laps, calculateWatchTime(Math.abs(totalTime-lapTime))]);
    setLapTime(totalTime);
  };

  return (
    <div id="stop_watch_container">
      <div className="stop_watch_time">
        <span>{formatTime(watchTime)}</span>
      </div>
      <div className="stop_watch_buttons_container">
        <StopWatchButton
          buttonType={isStopWatchActive ? StopWatch.STOP : StopWatch.START}
          handleStopwatchButton={handleStartAndStop}
        />
        {isStopWatchActive ? (
          <StopWatchButton
            buttonType={StopWatch.LAP}
            handleStopwatchButton={handleLap}
          />
        ) : (
          <StopWatchButton
            buttonType={StopWatch.RESET}
            handleStopwatchButton={handleReset}
          />
        )}
      </div>
      <div className="stop_watch_laps">
        {laps.map((currentLap: WatchTime) => (
          <span>{formatTime(currentLap)}</span>
        ))}
      </div>
    </div>
  );
}
