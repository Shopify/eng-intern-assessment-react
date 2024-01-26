import React, { useState, useEffect } from "react";

import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import { calculateTime } from "./StopWatchUtils";
import { LapCategory } from "./stopWatchProps";

export default function App() {
  const [isStopped, setIsStopped] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [calculatedLapTimes, setCalculatedLapTimes] = useState<number[]>([]);
  const [minTime, setMinTime] = useState<number>(Number.POSITIVE_INFINITY);
  const [maxTime, setMaxTime] = useState<number>(0);

  useEffect(() => {
    laps.map((currLap: number, index: number) => {
      let prevLap: number = index !== 0 ? laps[index - 1] : 0;
      let calculatedTime: number = calculateTimeDifference(currLap, prevLap);

      if (calculatedTime < minTime) {
        setMinTime(calculatedTime);
      } else if (calculatedTime > maxTime) {
        setMaxTime(calculatedTime);
      }

      setCalculatedLapTimes([...calculatedLapTimes, calculatedTime]);
    });
  }, [laps]);

  function calculateTimeDifference(
    currentTime: number,
    prevTime: number
  ): number {
    return currentTime - prevTime;
  }

  function lapTextColour(lapTime: number): LapCategory {
    if (lapTime === minTime) {
      return LapCategory.Green;
    } else if (lapTime == maxTime) {
      return LapCategory.Red;
    } else {
      return LapCategory.Black;
    }
  }

  return (
    <div className="container">
      <StopWatch isStopped={isStopped} time={time} setTime={setTime} />
      <StopWatchButton
        isStopped={isStopped}
        setIsStopped={setIsStopped}
        time={time}
        resetTime={setTime}
        resetLaps={setLaps}
        resetMinTime={setMinTime}
        resetMaxTime={setMaxTime}
        resetCalculatedLapTimes={setCalculatedLapTimes}
      />
      <div className="laps">
        <ul>
          {calculatedLapTimes.map((lap: number, index: number) => {
            return (
              <li key={index}>
                <span className="lap-index">
                  <b>{`Lap ${index + 1}`}</b>
                </span>
                <span
                  className="lap-time"
                  style={{ color: lapTextColour(lap) }}
                >
                  {calculateTime(lap)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
