import React, { useState, useRef } from "react";

export function useTimer() {
  /*
        Hook to createa a timer
        - keeps track of:  elapsedTime, interval reference and lapStart
    */
  const [elapsedTime, setElapsedTime] = useState(0); //Total time since first start
  const [lapStart, setLapStart] = useState(undefined); //Time start of curr lap
  const [isRunning, setIsRunning] = useState(false); //Is the timer active?
  const countRef = useRef(null); //reference to interval

  const handleStart = () => {
    const startTime = Date.now(); //Time in ms from Jan 1st
    setLapStart(Date.now()); //Lap 1 is at the start
    // Start an interval that will update <elapsedTime> every 10ms:
    countRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  };

  const handleLap = (lap_callback: () => void) => {
    if (!isRunning) return; //Don't lap if timer is stopped/not started
    setLapStart(Date.now());
    lap_callback(); //Do the specified action
  };

  const handleStop = () => {
    clearInterval(countRef.current); //The interval stops (elapsedTime stays constant)
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(countRef.current); //Stop the interval
    //Reset the timer:
    setElapsedTime(0);
    setLapStart(undefined);
    setIsRunning(false);
  };

  //Return the data / functionality needed:
  return {
    elapsedTime,
    lapTime: lapStart ? Date.now() - lapStart : 0,
    handleStart,
    handleStop,
    handleReset,
    handleLap,
  };
};
