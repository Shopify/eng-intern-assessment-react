import React from "react";
import { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // the start time when pressed start
  const [startTime, setStartTime] = useState(Date.now());
  const [start, setStart] = useState(false);

  // store the passed time when pressed stop
  const [passed, setPassed] = useState(0);

  // parse the time to be human readable
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    let time = passed;
    if (start) {
      time = Date.now() - startTime + passed;
    }

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(parseFloat(((time / 1000) % 60).toFixed(2)));
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
  const loopTimer = () => {};
  const resetTimer = () => {
    setPassed(0);
		setStartTime(Date.now());
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 100);

    return () => clearInterval(interval);
  }, [startTime, start]);

  return (
    <div>
      {days}days {hours}hours {minutes}minutes {seconds}seconds
      <StopWatchButton
        startTimer={startTimer}
        stopTimer={stopTimer}
        loopTimer={loopTimer}
        resetTimer={resetTimer}
      ></StopWatchButton>
    </div>
  );
}
