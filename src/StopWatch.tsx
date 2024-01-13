import React from "react";
import { useState } from "react";
import StopWatchButton from "./StopWatchButton";

// utilities
const miliToHour = (time: number) => {
  return Math.floor((time / (1000 * 60 * 60)) % 24);
};
const miliToMin = (time: number) => {
  return Math.floor((time / (1000 * 60)) % 60);
};
const miliToSec = (time: number) => {
  return parseFloat(((time / 1000) % 60).toFixed(2));
};

export default function StopWatch() {
  // the start time when pressed start
  const [startTime, setStartTime] = useState(Date.now());
  const [start, setStart] = useState(false);

  // store the passed time when pressed stop
  const [passed, setPassed] = useState(0);

  // parse the time to be human readable
  const [curTime, setCurTime] = useState(0);

  // store the laps
  const [laps, setLaps] = useState([]);
  const [newLap, setNewLap] = useState(0);

  const getTime = () => {
    let time = passed;
    if (start) {
      time = Date.now() - startTime + passed;
    }
    setCurTime(time);
    setPassed(time);
  };

  const startTimer = () => {
    // start the timer with current time
    if (!start) {
      setStart(true);
      setStartTime(Date.now());
    }
  };

  const stopTimer = () => {
    setStart(false);
  };

  const lapTimer = () => {
    // only add laps when timer starts
    // if add laps when stop, only 0 will be added
    if (start) {
      setLaps([curTime - newLap, ...laps]);
      setNewLap(curTime);
    }
  };

  const resetTimer = () => {
    setPassed(0);
    setLaps([]);
    setCurTime(0);
    setNewLap(0);
    setStartTime(Date.now());
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 100);

    return () => clearInterval(interval);
  }, [startTime, start]);

  return (
    <div>
      {miliToHour(curTime)}:{miliToMin(curTime)}:{miliToSec(curTime)}
      <StopWatchButton
        startTimer={startTimer}
        stopTimer={stopTimer}
        lapTimer={lapTimer}
        resetTimer={resetTimer}
      ></StopWatchButton>
      {`lap ${laps.length + 1}`} {miliToHour(curTime - newLap)}:
      {miliToMin(curTime - newLap)}:{miliToSec(curTime - newLap)}
      {laps.length > 0 && (
          laps.map((lap, i) => <div key={`lap ${laps.length - i}`}>{`lap ${laps.length - i}`} {lap}</div>)
      )}
    </div>
  );
}
