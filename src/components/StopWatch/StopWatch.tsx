import React, { useEffect, useState } from "react";
import { CalculateTime } from "../../utils/CalculateTime";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import LapsList from "../LapsList/LapsList";
import "./StopWatch.css";

export default function StopWatch() {
  const [timeInMiliSeconds, setTimeInMiliSeconds] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);
  const [timerString, setTimerString] = useState<string>(`00:00.00`);

  useEffect(() => {
    // useEffect hook to update the stopwatch string every time the time in milliseconds changes
    let timerString: string = CalculateTime(timeInMiliSeconds);
    setTimerString(timerString); // sets the time string calculated by the CalculateTime utility component
  }, [timeInMiliSeconds]);

  return (
    <>
      <div className="top">
        <p className="stopwatch-text">{timerString}</p>
        <StopWatchButton
          setTimeInMiliSeconds={setTimeInMiliSeconds}
          timerString={timerString}
          setLaps={setLaps}
        />
      </div>
      <div className="bottom">
        <LapsList laps={laps} />
      </div>
    </>
  );
}
