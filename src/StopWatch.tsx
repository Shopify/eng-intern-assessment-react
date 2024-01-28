import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

/*
  This component is responsible for rendering the stopwatch.
  It takes no props, but it uses the StopWatchButton component.
  It is responsible for keeping track of time, and displaying it,
  as well as keeping track of laptimes. and displaying them.
  __________________________________________________________________
  |                                                                |
  |  State:                                                        |
  |    timeMs: number                                              |
  |    lapTimeMs: number                                           |
  |    displayTime: string                                         |
  |    laps: string[]                                              |
  |    hasStarted: boolean                                         |
  |                                                                |
  |  Methods:                                                      |
  |    getTime(time: number): string                               |
  |    lap(): void                                                 |
  |    timerEvent(event: string): void                             |
  |                                                                |
  |________________________________________________________________|
*/

export default function StopWatch() {
  const [timeMs, setTimeMs] = useState(0); // Used to keep track of total time in milliseconds
  const [lapTimeMs, setLapTimeMs] = useState(0); // Used to keep track of Curent lap time in milliseconds
  const [displayTime, setDisplayTime] = useState("00:00:00:00"); // Used to display time
  const [laps, setLaps] = useState([]); // Used to keep track of all laptimes
  const [hasStarted, setHasStarted] = useState(false); // Used to keep track of if the timer is running

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

  // responsible for triggering events based on user input
  const timerEvent = (event: string) => {
    switch (event) {
      case "start": // stars timer
        setHasStarted(true);
        break;
      case "stop": // stops timer
        setHasStarted(false);
        break;
      case "lap": // laps timer
        lap();
        break;
      case "reset": // resets timer and laptimes
        setTimeMs(0);
        setLapTimeMs(0);
        setLaps([]);
        break;
    }
  };

  // renders all laptimes
  const totLaps = laps.map((laptime, index, laps) => (
    <div id="laps-con" key={index}>
      <h3>Lap {laps.length - index}</h3>
      <h3>{laptime}</h3>
    </div>
  ));

  return (
    <div>
      <div id="timer">{displayTime}</div>
      <StopWatchButton onTimerEvent={timerEvent} />
      {totLaps}
    </div>
  );
}
