import React, { useEffect, useState } from "react";
import StopWatch from "../components/StopWatch";
import StopWatchButton from "../components/StopWatchButton";
import LapDisplay from "../components/LapDisplay";
import { TimerStatus } from "../constants/constants";
import "../styles/home.css";

export default function Home() {
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [lapStartTime, setLapStartTime] = useState<number>(0);
  const [interv, setInterv] = useState<NodeJS.Timeout | null>(null);
  const [minLapIndex, setMinLapIndex] = useState<number | null>(null);
  const [maxLapIndex, setMaxLapIndex] = useState<number | null>(null);

  //   status timerNotStarted: start enabled; lap disabled
  //   status timerRunning: stop enabled; lap enabled
  //   status timerPaused: start enabled; reset enabled
  const [status, setStatus] = useState<String>(TimerStatus.NOT_STARTED);

  const startTimer = () => {
    updateTime();
    setStatus(TimerStatus.RUNNING);
    setInterv(setInterval(updateTime, 10));
  };

  const stopTimer = () => {
    clearInterval(interv);
    setStatus(TimerStatus.PAUSED);
  };

  const resumeTimer = () => startTimer();

  //This function resets the timer and also clears the laps array
  const resetTimer = () => {
    clearInterval(interv);
    setStatus(TimerStatus.NOT_STARTED);
    setTime(0);
    setLaps([]);
    setLapStartTime(0);
    setMinLapIndex(null);
    setMaxLapIndex(null);
  };

  /*Lap timings are calculted by subtrating the start time of previous lap from the 
    current time */

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

  //Increments the stopwatch by 10ms
  const updateTime = () => {
    setTime((cur) => cur + 10);
  };

  //Main rendering
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
