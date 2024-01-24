import React, { useState, useEffect } from "react";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import { WatchTime } from "../../StopWatchInterface";
import "./StopWatchContainer.css";

export default function StopWatch() {
  // UseStates
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

  // ENUM for text
  const StopWatch = {
    START: "Start",
    STOP: "Stop",
    RESET: "Reset",
    LAP: "Lap",
  };

  //Timer useEffect to keep calculating time for the intervals
  useEffect(() => {
    let totalInterval: any;
    if (isStopWatchActive) {
      totalInterval = setInterval(() => setTotalTime(totalTime + 1), 10);
    }
    setWatchTime(calculateWatchTime(totalTime));
    return () => clearInterval(totalInterval);
  }, [isStopWatchActive, totalTime]);

  // HandleStartAndStop just sets the timer to active/inactive
  const handleStartAndStop = () => {
    setIsStopWatchActive(!isStopWatchActive);
  };

  // handleReset is the onClick the the reset button and sets all the useStates back empty/0
  const handleReset = () => {
    setLapTime(0);
    setTotalTime(0);
    setLaps([]);
  };

  // CalculateWatchTime seperates the time into its hour, minutes, seconds and milliseconds
  const calculateWatchTime = (totalnput: number) => ({
    hours: Math.floor(totalnput / 360000),
    minutes: Math.floor((totalnput % 360000) / 6000),
    seconds: Math.floor((totalnput % 6000) / 100),
    milliseconds: totalnput % 100,
  });

  //Pad start adds padding to the text if the number can't occupy double digits 1 -> 01
  const padStart = (timeInput: number) => timeInput.toString().padStart(2, "0");

  // Format time utilizes the padStart and formats the time
  const formatTime = (timeInput: WatchTime) =>
    `${padStart(timeInput.hours)}:${padStart(timeInput.minutes)}:${padStart(
      timeInput.seconds
    )}.${padStart(timeInput.milliseconds)}`;

  // HandleLap appends a watchTime object into the laps state then sets the current lapTime so it can be used in later iterations
  const handleLap = () => {
    //Calculate laptime by subtracting total time with previous laptime
    setLaps([...laps, calculateWatchTime(totalTime - lapTime)]);
    setLapTime(totalTime);
  };

  return (
    <div className="stop_watch_container">
      <div className="stop_watch_time">
        <span data-testid = 'stop_watch_time'>{formatTime(watchTime) || "00:00:00.00"} </span>
      </div>
      <div
        className="stop_watch_buttons_container"
        data-testid="stop_watch_buttons_container"
      >
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
      <div className="stop_watch_laps" data-testid = 'stop_watch_laps'>
        {laps.map((currentLap: WatchTime, index) => (
          <span>{`Lap ${index + 1}: ${formatTime(currentLap)}`}</span>
        ))}
      </div>
    </div>
  );
}
