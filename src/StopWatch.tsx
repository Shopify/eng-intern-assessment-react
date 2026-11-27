import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

const StopWatch = () => {
  // States to manage time and timer functionality
  const [hours, setHours] = useState(0); // State for hours
  const [minutes, setMinutes] = useState(0); // State for minutes
  const [seconds, setSeconds] = useState(0); // State for seconds
  const [milliseconds, setMilliseconds] = useState(0); // State for milliseconds
  const [isActive, setIsActive] = useState(false); // State to track if timer is active or not
  const [lapTimes, setLapTimes] = useState<string[]>([]); // State to store lap times

  // Effect hook to handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      // If timer is active, create an interval to update time
      interval = setInterval(() => {
        // Update milliseconds every millisecond
        if (milliseconds < 99) {
          setMilliseconds((prev) => prev + 1);
        }
        // Update seconds when milliseconds reach 99
        else if (seconds < 59) {
          setMilliseconds(0);
          setSeconds((prev) => prev + 1);
        }
        // Update minutes when seconds reach 59
        else if (minutes < 59) {
          setMilliseconds(0);
          setSeconds(0);
          setMinutes((prev) => prev + 1);
        }
        // Update hours when minutes reach 59
        else {
          setMilliseconds(0);
          setSeconds(0);
          setMinutes(0);
          setHours((prev) => prev + 1);
        }
      }, 10);
    }

    // Clear interval on component unmount or when isActive becomes false
    return () => clearInterval(interval);
  }, [isActive, milliseconds, seconds, minutes]);

  // Handler to start the timer
  const startTimer = () => {
    setIsActive(true);
  };

  // Handler to stop the timer
  const stopTimer = () => {
    setIsActive(false);
  };

  // Handler to reset the timer and lap times
  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setLapTimes([]);
  };

  // Handler to record a lap
  const recordLap = () => {
    // Format the current time with hours, minutes, seconds, and milliseconds
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
    // Add the formatted lap time to the lap times array
    setLapTimes((prevLapTimes) => [...prevLapTimes, formattedTime]);
  };

  // JSX rendering

  return (
    <main className="main-container">
      <section className="section-container">
        <div className="timer-container">
          <div className="time-display">
            <div>
              <p className="value">{`${hours
                .toString()
                .padStart(2, "0")} :`}</p>
            </div>
            <div>
              <p className="value">{`${minutes
                .toString()
                .padStart(2, "0")} :`}</p>
            </div>
            <div className="seconds-tab">
              <p className="value">
                {`${seconds.toString().padStart(2, "0")}.`}{" "}
                <span className=" milisecond">{`${milliseconds
                  .toString()
                  .padStart(2, "0")}`}</span>
              </p>
            </div>
          </div>
          <div className="control-buttons">
            {/* Render the StopWatchButton component for each button */}
            <StopWatchButton
              onClick={startTimer}
              disabled={isActive}
              className={"button"}
            >
              Start
            </StopWatchButton>
            <StopWatchButton
              onClick={recordLap}
              disabled={!isActive}
              className="button"
            >
              Lap
            </StopWatchButton>
            <StopWatchButton
              onClick={stopTimer}
              disabled={!isActive}
              className="button"
            >
              Stop
            </StopWatchButton>
            {/* reset is only active when the stopwatch is stopped */}
            <StopWatchButton onClick={resetTimer} className="button">
              Reset
            </StopWatchButton>
          </div>
        </div>
        <div className="lap-times">
          <h2 className="lap-times-heading">Lap Times</h2>
          <ul>
            {/* Display lap times */}
            {lapTimes.map((lapTime, index) => (
              <li className="lap-list" key={index}>{`Lap ${
                index + 1
              }: ${lapTime}`}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default StopWatch;
