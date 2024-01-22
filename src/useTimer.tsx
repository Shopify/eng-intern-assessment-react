import { useState, useRef } from "react";
import { Time, Lap } from "./Time"

export function useTimer() {
  /*
        Hook to create a timer
        - keeps track of:  elapsedTime, interval reference and lapStart
        - returns: total_time (Time), lap_time (Time), laps (Lap[]), handlers
    */
  const [isRunning, setIsRunning] = useState(false);    // Is the timer active?
  const [elapsedTime, setElapsedTime] = useState(0);    // Total time since first start
  const [lapStart, setLapStart] = useState(undefined);  // Time start of curr lap
  const [laps, setLaps] = useState([] as Lap[]);        // Store an array of laps
  const countRef = useRef(null);                        // Reference to interval

  const handleStart = () => {
    const startTime = Date.now(); //Time in ms from Jan 1st
    setLapStart(Date.now()); //Lap 1 is at the start
    // Start an interval that will update <elapsedTime> every 10ms:
    countRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  };

  const handleLap = () => {
    if (!isRunning) return;                         // Don't lap if timer is stopped/not started
    setLapStart(Date.now());                        // Start a new lap
    laps.push({ total_t: total_t, lap_t: lap_t });  //Push the last lap
  };

  const handleStop = () => {
    clearInterval(countRef.current); //The interval stops (elapsedTime stays constant)
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(countRef.current);  // Stop the interval
    setLaps([]);                      // Clear all laps
    //Reset the timer:
    setElapsedTime(0);
    setLapStart(undefined);
    setIsRunning(false);
  };

  //Create the time objects based on the timer:
  const total_t = new Time(elapsedTime);
  const lap_t = new Time(lapStart ? Date.now() - lapStart : 0);
  //Return the data / functionality needed:
  return {
    total_t,
    lap_t,
    laps,
    handleStart,
    handleStop,
    handleReset,
    handleLap,
  };
};
