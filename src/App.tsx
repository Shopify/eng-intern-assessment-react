import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch"; 
import StopWatchButton from "./StopWatchButton"; 
import "./main.css";

// Define the structure of a lap object
interface Lap {
  id: number;
  time: number;
}

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false); // State to track if the stopwatch is running
  const [startTime, setStartTime] = useState<number | null>(null); // State to store the start time
  const [elapsedTime, setElapsedTime] = useState(0); // State to store the elapsed time
  const [laps, setLaps] = useState<Lap[]>([]); // State to store lap data

  // Effect to update elapsed time at regular intervals when the stopwatch is running
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      // Set the start time if it's not set yet
      setStartTime((prevStartTime) => prevStartTime ?? Date.now());
      // Update elapsed time based on the current time and start time
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime!);
      }, 10);
    } else {
      // Clear the interval if the stopwatch is not running
      clearInterval(intervalId);
    }

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  // Function to handle start/stop button click
  const handleStartStop = () => {
    if (isRunning) {
      // Stop the stopwatch
      setIsRunning(false);
    } else {
      // Start the stopwatch, set the start time to the current time minus elapsed time
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  // Function to handle reset button click
  const handleReset = () => {
    // Stop the stopwatch and reset state values
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  // Function to handle lap button click
  const handleLap = () => {
    if (isRunning) {
      // Add a lap with the current elapsed time to the laps array
      setLaps((prevLaps) => [
        { id: laps.length + 1, time: elapsedTime },
        ...prevLaps,
      ]);
    }
  };

  return (
    <div className="app_container">
      <div className="button_container">
        {isRunning ? (
          // Show lap button only when the stopwatch is running
          <StopWatchButton onClick={handleLap} label={"Lap"} />
        ) : (
          <></>
        )}
        <StopWatchButton
          onClick={handleStartStop}
          label={isRunning ? "Stop" : "Start"}
        />
        {elapsedTime > 0 ? (
          // Show reset button only when the elapsed time is greater than 0
          <StopWatchButton onClick={handleReset} label={"Reset"} />
        ) : null}
      </div>
      {/* Render the stopwatch component */}
      <StopWatch isRunning={isRunning} time={elapsedTime} laps={laps} />
      <div className="tagline">
        {/* Display a tagline at the bottom of the page */}
        <p>github.com/jugal09xx</p>
      </div>
    </div>
  );
};

export default App;
