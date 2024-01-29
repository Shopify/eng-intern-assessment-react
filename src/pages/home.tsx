import React, { useEffect, useState } from "react";
import StopWatch from "../components/StopWatch";
import StopWatchButton from "../components/StopWatchButton";
import LapDisplay from "../components/LapDisplay";
import "../styles/home.css";

export default function Home() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [lapStartTime, setLapStartTime] = useState(0);
  const [interv, setInterv] = useState(null);
  const [minLapIndex, setMinLapIndex] = useState(null);
  const [maxLapIndex, setMaxLapIndex] = useState(null);

  //   status 0: start enabled; lap disabled
  //   status 1: stop enabled; lap enabled
  //   status 2: start enabled; reset enabled
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
    setLapStartTime(0);
    setMinLapIndex(null);
    setMaxLapIndex(null);
  };

  const recordLap = () => {
    const lapTime = time - lapStartTime;
    setLapStartTime(time);

    setLaps((old) => {
      const newLaps = [...old, lapTime];
      const minIndex = newLaps.indexOf(Math.min(...newLaps));
      const maxIndex = newLaps.indexOf(Math.max(...newLaps));
      setMinLapIndex(minIndex);
      setMaxLapIndex(maxIndex);
      return newLaps;
    });
  };

  const updateTime = () => {
    setTime((cur) => cur + 10);
  };

  return (
    <div className="main-section">
      <div className="title">STOPWATCH</div>
      <div className="clock-bg"></div>
      <div className="clock-holder">
        <div className="stopwatch">
          <StopWatch time={time} />
        </div>
      </div>
      <div className="button-holder">
        <StopWatchButton
          start={startTimer}
          stop={stopTimer}
          resume={resumeTimer}
          reset={resetTimer}
          recordLap={recordLap}
          status={status}
        />
      </div>
      <LapDisplay
        laps={laps}
        minLapIndex={minLapIndex}
        maxLapIndex={maxLapIndex}
      />
    </div>
  );
}
