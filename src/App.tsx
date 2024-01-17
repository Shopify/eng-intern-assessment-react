// The main component that renders the stopwatch and handles its functionality.
import React, { useEffect, useState } from "react";
import StopWatch from "./Components/StopWatch";
import "./styles.css";
import { createConfigItem } from "@babel/core";

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);

  useEffect(() => {
    // setting up the intervalID and type for Node environment
    let timer: NodeJS.Timeout;

    // if the timer is running (isRunning state = true) then run the setInterval, if false then clear the intervalTimer
    // Dependency array watches the isRunning state for it to change to false
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); // updates every 10 milliseconds
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  // function the handle if the start button has been clicked
  const handleStartClick = () => {
    setIsRunning(true);
    console.log("The Timer is Running!");
    formatTimer(time);
  };

  // function the handle if the stop button has been clicked
  const handleStopClick = () => {
    setIsRunning(false);
    console.log("The Timer has Stopped!");
  };

  // function the handle if the lap button has been clicked
  const handleLapClick = () => {
    console.log("Lap Time Recorded");
    const lapTime = formatTimer(time); // getting the current lap time
    setLaps((prevLaps) => [...prevLaps, lapTime]); // add the lap Time to the state variable array
  };

  // function the handle if the reset button has been clicked
  const handleResetClick = () => {
    console.log("The Timer Reset");
    setIsRunning(false);
    setTime(0); // resets the timer stored in State back to zero (00:00.00)
    setLaps([]); // clears the laps array when timer is reset
  };

  const formatTimer = (time: number) => {
    // take the time state and divide it by 60000. Round it down to the nearest whole number to get the minute whole number
    // convert the number to a string and use padStart() method to make it a 2 digit number beginning with a zero
    const minutes: string = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");

    // finding the remainder of time and dividing by 1000 to get the seconds and milliseconds remaining
    // toFixed converts the value to a string in order to use padStart
    const seconds: string = ((time % 60000) / 1000).toFixed(2).padStart(5, "0");

    // return minutes and seconds in the correct timer format
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="stopWatch">
        <h1>Stop Watch - By Dean Lane</h1>
        <StopWatch
          label={isRunning ? "Stop" : "Start"}
          onStartClick={isRunning ? handleStopClick : handleStartClick}
          onResetClick={handleResetClick}
          onLapClick={handleLapClick}
          display={formatTimer}
          time={time}
          laps={laps}
        />
      </div>
    </>
  );
}

/* Pseudo Code 

// 1) Style the stopwatch by adding a display, buttons, and lap section on the dom
// 2) using the button component get the correct labels applied
// 3) create an interval function for the timer and get that to display in the display
// 4) when the start button is clicked start the timer
// 5) change the start button to stop using state variable to track if the timer is running (Boolean)
// 6) when you click the stop button the timer should pause
// 7) when you click the reset button the time should be reset back to zero
// 8) Format the timer to be 00:00.00
9) when you click the lap button it should map the current time to the <ul> using a template literal eg Lap 1 15:01.34. Get 1 to increment for each lap ie Lap 1, Lap 2 etc
10) When the reset button is clicked it should also delete all the laps
11) push code to main 

*/
