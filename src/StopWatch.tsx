import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [timeMs, setTimeMs] = useState(0);
  const [lapTimeMs, setLapTimeMs] = useState(0);
  const [displayTime, setDisplayTime] = useState("00:00:00:00");
  const [laps, setLaps] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  // gets total time and curent lap time in ms
  useEffect(() => {
    if (hasStarted) {
      const interval = setInterval(() => {
        setTimeMs((timeMs) => timeMs + 10);
        setLapTimeMs((lapTimeMs) => lapTimeMs + 10);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [hasStarted]);

  // updates timer display
  useEffect(() => {
    setDisplayTime(getTime(timeMs));
  }, [timeMs]);

  // responsible for turning the time in ms into readable time
  function getTime(time: number) {
    // getting ms
    let ms = (time % 1000) / 10 + "";
    ms = ms.length > 1 ? ms : "0" + ms;

    //getting s
    let s = Math.floor((time % (60 * 1000)) / 1000) + "";
    s = s.length > 1 ? s : "0" + s;

    //getting min
    let min = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000)) + "";
    min = min.length > 1 ? min : "0" + min;

    //getting h
    let h = Math.floor(time / (60 * 60 * 1000)) + "";
    h = h.length > 1 ? h : "0" + h;

    return h + ":" + min + ":" + s + ":" + ms;
  }

  // Updates laptimes
  function lap() {
    setLaps([getTime(lapTimeMs), ...laps]);
    setLapTimeMs(0);
  }

  // responsible for triggering events based
  // on user input
  const timerEvent = (event: string) => {
    console.log(event);
    switch (event) {
      case "start":
        setHasStarted(true);
        break;
      case "stop":
        setHasStarted(false);
        break;
      case "lap":
        lap();
        break;
      case "reset":
        setTimeMs(0);
        setLapTimeMs(0);
        setLaps([]);
        break;
    }
  };

  // renders all laptimes
  const totLaps = laps.map((laptime, index) => <p key={index}>{laptime}</p>);

  return (
    <div>
      <div id="timer">{displayTime}</div>
      <StopWatchButton onTimerEvent={timerEvent} />
      {totLaps}
    </div>
  );
}
