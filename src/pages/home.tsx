import React, { useEffect, useState } from "react";
import StopWatch from "../components/StopWatch";
import StopWatchButton from "../components/StopWatchButton";
import LapDisplay from "../components/LapDisplay";

import "../styles/home.css";

export default function Home() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [previousLapTime, setPreviousLapTime] = useState(0);
  const [interv, setInterv] = useState(null);

  //   status0:start enabled; lap disabled
  //   status1: stop enabled; lap enabled
  //   status2: start enabled; reset enabled
  const [status, setStatus] = useState(0);

  const startTimer = () => {
    updateTime();
    setStatus(1);
    setInterv(setInterval(updateTime, 10));
  };

  const stopTimer = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const resumeTimer = () => startTimer();

  const resetTimer = () => {
    clearInterval(interv);
    setStatus(0);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    const lapTime = time - previousLapTime;
    setLaps((old) => [...old, lapTime]);
    setPreviousLapTime(lapTime);
    // console.log(lap);
  };

  // const calculateTimeDifference = (
  //   previousTime: { h: number; m: number; s: number; ms: number },
  //   currentTime: { h: number; m: number; s: number; ms: number }
  // ): { h: number; m: number; s: number; ms: number } => {
  //   let lapDifference = {
  //     h: currentTime.h - previousTime.h,
  //     m: currentTime.m - previousTime.m,
  //     s: currentTime.s - previousTime.s,
  //     ms: currentTime.ms - previousTime.ms,
  //   };

  //   // Adjust for negative values
  //   if (lapDifference.ms < 0) {
  //     lapDifference.s--; // Borrow 1 second
  //     lapDifference.ms += 100; // Add 1000 milliseconds
  //   }
  //   if (lapDifference.s < 0) {
  //     lapDifference.m--; // Borrow 1 minute
  //     lapDifference.s += 60; // Add 60 seconds
  //   }
  //   if (lapDifference.m < 0) {
  //     lapDifference.h--; // Borrow 1 hour
  //     lapDifference.m += 60; // Add 60 minutes
  //   }

  //   // Adjust for overflow
  //   if (lapDifference.ms >= 100) {
  //     lapDifference.s += Math.floor(lapDifference.ms / 100);
  //     lapDifference.ms %= 100;
  //   }
  //   if (lapDifference.s >= 60) {
  //     lapDifference.m += Math.floor(lapDifference.s / 60);
  //     lapDifference.s %= 60;
  //   }
  //   if (lapDifference.m >= 60) {
  //     lapDifference.h += Math.floor(lapDifference.m / 60);
  //     lapDifference.m %= 60;
  //   }

  //   return lapDifference;
  // };

  const updateTime = () => {
    // if (updatedM === 60) {
    //   updatedH++;
    //   updatedM = 0;
    // }
    // if (updatedS === 60) {
    //   updatedM++;
    //   updatedS = 0;
    // }
    // if (updatedMs === 100) {
    //   updatedS++;
    //   updatedMs = 0;
    // }
    // updatedMs++;
    // return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    setTime((cur) => cur + 10);
  };

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <StopWatch time={time} />
          <StopWatchButton
            start={startTimer}
            stop={stopTimer}
            resume={resumeTimer}
            reset={resetTimer}
            recordLap={recordLap}
            status={status}
          />
          <LapDisplay laps={laps} />
        </div>
        {/* <div>
          <h2>Laps</h2>
          <ul>
            {lapDifferences.map((lapDiff, index) => (
              <li key={index}>
                {lapDiff.h}h {lapDiff.m}m {lapDiff.s}s {lapDiff.ms}ms
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
