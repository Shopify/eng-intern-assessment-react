import React, { useState, useEffect } from "react";


//Using props to 'link' or help componenets communicate with each other
//Using an interface to contain all the functions because the StopwatchButton function can only take at most 2 arguments but more is required for button functionality
interface timerProps {
  setRun: Function;
  setSeconds: Function;
  setMinutes: Function;
  setHours: Function;
  recordLap: Function;
}

//button functionality
//uses an object of the timerProps interface to communicate with the Stopwatch component
export default function StopWatchButton(props: timerProps) {
  const setRun = props.setRun;
  const setSeconds = props.setSeconds;
  const setMinutes = props.setMinutes;
  const setHours = props.setHours;
  const setLaps = props.recordLap;

  //if start button is pressed, then set the run property to true in the Stopwatch component
  const startButton = () => {
    setRun(true);
  };


  //if stop button is pressed, then set the run property to false in the Stopwatch component
  const stopButton = () => {
    setRun(false);
  };

  //if reset button is pressed, then reset timer to 0, turn timer off, and empty the laps table
  const resetButton = () => {
    setRun(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setLaps(true);
  };

  //record a lap when button is clicked
  const lapButton = () => {
    setLaps(false);
  };

  //return the buttons
  return (
    <div>
      <button onClick={startButton}> start </button>
      <button onClick={stopButton}> stop </button>
      <button onClick={lapButton}> lap </button>
      <button onClick={resetButton}> reset </button>
    </div>
  );
}
