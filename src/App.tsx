// The main component that renders the stopwatch and handles its functionality.
import React, { useEffect, useState } from "react";
import StopWatch from "./Components/StopWatch";
import "./styles.css";

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);
  // const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    // setting up the intervalID and type for Node environment
    let timer: NodeJS.Timeout;

    // if the timer is running (isRunning state = true) then run the setInterval, if false then clear the intervalTimer
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); // updates every 10 milliseconds
    }

    return () => clearInterval(timer);
    // Dependency array watches the isRunning state for it to change to false and re-renders the component
  }, [isRunning]);

  // function the handle if the start button has been clicked
  const handleStartClick = () => {
    setIsRunning(true);
    formatTimer(time);
  };

  // function the handle if the stop button has been clicked
  const handleStopClick = () => {
    setIsRunning(false);
  };

  // function the handle if the lap button has been clicked
  const handleLapClick = () => {
    const lapTime = formatTimer(time); // getting the current lap time
    setLaps((prevLaps) => [...prevLaps, lapTime]); // add the lap Time to the state variable array
  };

  // function the handle if the reset button has been clicked
  const handleResetClick = () => {
    setIsRunning(false);
    setTime(0); // resets the timer stored in State back to zero (00:00.00)
    setLaps([]); // clears the laps array when timer is reset
  };

  // function to correctly format time
  const formatTimer = (time: number) => {
    // take the time state and divide it by 3600000. Round it down to the nearest whole number to get the minute whole number.
    // convert the number to a string and use padStart() method to make it a 2 digit number beginning with a zero
    const hours: string = Math.floor(time / 3600000)
      .toString()
      .padStart(2, "0");

    // take the time state and divide it by 3600000 then divide by 6000. Round it down to the nearest whole number to get the minute whole number.
    // convert the number to a string and use padStart() method to make it a 2 digit number beginning with a zero
    const minutes: string = Math.floor((time % 3600000) / 60000)
      .toString()
      .padStart(2, "0");

    // toFixed converts the value to a string in order to use padStart
    // finding the remainder of time divided by 60000 and then dividing by 1000 to get seconds and milli seconds
    const seconds: string = ((time % 60000) / 1000).toFixed(2).padStart(5, "0");

    // Return hours, minutes, and seconds in the correct timer format
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="stopWatch">
      <h1>Stop Watch</h1>
      <StopWatch
        label={isRunning ? "Stop" : "Start"}
        onStartClick={isRunning ? handleStopClick : handleStartClick}
        onResetClick={handleResetClick}
        onLapClick={handleLapClick}
        formattedTime={formatTimer(time)}
        laps={laps}
      />
    </div>
  );
}
