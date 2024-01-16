// The main component that renders the stopwatch and handles its functionality.
import React, { useState } from "react";
import StopWatch from "./Components/StopWatch";
import "./styles.css";
import { createConfigItem } from "@babel/core";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);

  // function the handle if the start button has been clicked
  const handleStartClick = () => {
    setIsRunning(true);
    console.log("The Timer is Running!");
  };

  // function the handle if the stop button has been clicked
  const handleStopClick = () => {
    setIsRunning(false);
    console.log("The Timer has Stopped!");
  };

  // function the handle if the lap button has been clicked
  const handleLapClick = () => {};

  // function the handle if the reset button has been clicked
  const handleResetClick = () => {};

  return (
    <>
      <div className="stopWatch">
        <h1>Stop Watch - By Dean Lane</h1>
        <StopWatch onStartClick={handleStartClick} />
      </div>
    </>
  );
}

/* Pseudo Code 

// 1) Style the stopwatch by adding a display, buttons, and lap section on the dom
2) using the button component get the correct labels applied
3) create an interval function for the timer and get that to display in the display
4) when the start button is clicked start the timer
5) change the start button to stop using state variable to track if the timer is running (Boolean)
6) when you click the stop button the timer should pause
7) when you click the reset button the time should be reset back to zero
8) when you click the lap button it should map the current time to the <ul> using a template literal eg Lap 1 15:01.34. Get 1 to increment for each lap ie Lap 1, Lap 2 etc
9) When the reset button is clicked it should also delete all the laps
10) push code to main 

*/
