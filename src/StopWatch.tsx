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
  return Math.floor((time / 1000) % 60);
};

export default function StopWatch() {
  // the start time when pressed start
  const [startTime, setStartTime] = useState(Date.now());
  const [start, setStart] = useState(false);
  // check whether stop is pressed for resume button
  // if use start as condition for start/resume button, resume button is going to display by default
	// Or in reverse the timer will run when start application
  const [stopped, setStopped] = useState(true);

  // store the passed time when pressed stop
  const [passed, setPassed] = useState(0);

  // parse the time to be human readable
  const [curTime, setCurTime] = useState(0);

  // store the laps
  const [laps, setLaps] = useState([]);
  const [lapTime, setLapTime] = useState(0);

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
      setStopped(true);
      setStart(true);
      setStartTime(Date.now());
    }
  };

  const stopTimer = () => {
    setStopped(false);
    setStart(false);
  };

  const lapTimer = () => {
    // only add laps when timer starts
    // if add laps when stop, only 0 will be added
    if (start) {
      setLaps([curTime - lapTime, ...laps]);
      setLapTime(curTime);
    }
  };

  const resetTimer = () => {
    setPassed(0);
    setLaps([]);
    setCurTime(0);
    setLapTime(0);
    setStopped(true);
    setStart(false);
    setStartTime(Date.now());
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 100);

    return () => clearInterval(interval);
  }, [startTime, start]);

  return (
    <div>
      {miliToHour(curTime).toString().padStart(2, "0")}:
      {miliToMin(curTime).toString().padStart(2, "0")}:
      {miliToSec(curTime).toString().padStart(2, "0")}
      <StopWatchButton
        stopped={stopped}
        startTimer={startTimer}
        stopTimer={stopTimer}
        lapTimer={lapTimer}
        resetTimer={resetTimer}
      ></StopWatchButton>
      <div>
        {`lap ${laps.length + 1}`}{" "}
        {miliToHour(curTime - lapTime)
          .toString()
          .padStart(2, "0")}
        :
        {miliToMin(curTime - lapTime)
          .toString()
          .padStart(2, "0")}
        :
        {miliToSec(curTime - lapTime)
          .toString()
          .padStart(2, "0")}
      </div>
      <div id="lap-list">
        {laps.length > 0 &&
          laps.map((lap, i) => (
            <div key={`lap ${laps.length - i}`}>
              {`lap ${laps.length - i}`}{" "}
              {miliToHour(lap).toString().padStart(2, "0")}:
              {miliToMin(lap).toString().padStart(2, "0")}:
              {miliToSec(lap).toString().padStart(2, "0")}
            </div>
          ))}
      </div>
    </div>
  );
}
