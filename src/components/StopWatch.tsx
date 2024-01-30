import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import "./StopWatch.css";

//StopWatch functional component
const StopWatch: React.FC = () => {
  const [time, setTime] = useState(0); // Track elapsed time
  const [isRunning, setIsRunning] = useState(false); // Track running/paused
  const [laps, setLaps] = useState<number[]>([]); // Record lap times

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        // Update time every 10 milliseconds
        setTime((prevTime) => prevTime + 10); // Add 10 milliseconds to prevTime
      }, 10);
    }
    return () => clearInterval(interval); // Clear interval when paused/stopped
  }, [isRunning]); // Run effect when isRunning state changed

  const startTimer = () => {
    setIsRunning(true); // Set isRunning state to true
  };

  const stopTimer = () => {
    setIsRunning(false); // Set isRunning state to false
  };

  const resetTimer = () => {
    setTime(0); // Reset time to 0
    setIsRunning(false); // Set isRunning state to false
    setLaps([]); // Clear lap times
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]); // Add time to Laps array
  };

  return (
    <div className="stopwatch">
      <section className="container">
        {/* hours */}
        <h1 className="text">
          {Math.floor(time / 3600000)
            .toString()
            .padStart(2, "0")}
        </h1>
        <span>:</span>
        {/* mins */}
        <h1 className="text">
          {Math.floor((time % 3600000) / 60000)
            .toString()
            .padStart(2, "0")}
        </h1>
        <span>:</span>
        {/* seconds */}
        <h1 className="text">
          {Math.floor((time % 60000) / 1000)
            .toString()
            .padStart(2, "0")}
        </h1>
        <span>.</span>
        {/*milliseconds */}
        <h1 className="text">
          {((time % 1000) / 10).toFixed(0).toString().padStart(2, "0")}
        </h1>
      </section>

      {/* StopWatchButton & props */}
      <StopWatchButton
        onStart={startTimer}
        onStop={stopTimer}
        onReset={resetTimer}
        onLap={recordLap}
        isRunning={isRunning}
      />

      <div className="lap-list">
        {/* Map thru laps array and render times */}
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            <span>Lap {index + 1}:</span>
            {/* format and display lap time */}
            <span>
              {Math.floor(lap / 3600000)
                .toString()
                .padStart(2, "0")}
              :
            </span>
            <span>
              {Math.floor((lap % 3600000) / 60000)
                .toString()
                .padStart(2, "0")}
              :
            </span>
            <span>
              {Math.floor((lap % 60000) / 1000)
                .toString()
                .padStart(2, "0")}
            </span>
            <span>.</span>
            {/* add mlliseconds */}
            <span>
              {((lap % 1000) / 10).toFixed(0).toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
