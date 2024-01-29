import React, {
  useState,
  useEffect,
  ReactFragment,
  SetStateAction,
} from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  /** States for the stopwatch */
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<string[]>([]);

  /**
   * useEffect hook & setInterval function that act as the timer
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Interval code runs every 1 millisecond to update the time
    if (isRunning) {
      timer = setInterval(() => {
        setTime((time) => time + 15);
      }, 1);
    }
    // Clears interval to stop timer and prevent any potential memory leaks
    return () => clearInterval(timer);
  }, [isRunning]);

  /**
   * Starts the stopwatch by setting isRunning state to true
   */
  const startStopwatch = () => {
    setIsRunning(true);
  };

  /**
   * Stops the stopwatch by setting isRunning state to false
   */
  const stopStopwatch = () => {
    setIsRunning(false);
  };

  /**
   * Resets the stopwatch by setting the time to 0, laps to empty, and isRunning state to false
   */
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  /**
   * Formats the time in milliseconds to the proper format for the stopwatch and lap times
   * @param {number} time - the time of the stopwatch in milliseconds
   * @param {string} type - the type of result to be returned
   */
  const formatTime = (time: number, type: string): JSX.Element | string => {
    // Calculations for milliseconds, seconds, minutes, and hours
    const milliseconds = Math.floor((time / 10) % 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);

    // When type is stopwatch, return relevant styles
    if (type === "stopwatch") {
      return (
        <h1 style={{ fontSize: "8rem", fontWeight: "lighter" }}>
          {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
          <span
            style={{ fontSize: "3rem", width: "50px", display: "inline-block" }}
          >{`${milliseconds.toString().padStart(2, "0")}`}</span>
        </h1>
      );
    // When type is lap, return a single string of the lap time
    } else if (type === "lap") {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    }
  };

  /**
   * Records the lap times when Lap button is clicked
   * @param {number} time -  the time of the stopwatch in milliseconds
   */
  const lapStopwatch = (time: number): void => {
    const lapTime = formatTime(time, "lap");
    setLapTimes((prev) => [...prev, lapTime.toString()]);
  };

  return (
    <>
      {/* Render the stopwatch and its buttons */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {formatTime(time, "stopwatch")}
        {/* Stopwatch functions passed in as props for StopWatchButton.tsx */}
        <StopWatchButton
          onStart={startStopwatch}
          onStop={stopStopwatch}
          onReset={resetStopwatch}
          onLap={() => lapStopwatch(time)}
          isRunning={isRunning}
        />
      </div>
      {/* Render the lap times */}
      <div style={{ padding: "40px" }}>
        {lapTimes.map((lap, index) => (
          <div key={index} style={{ fontSize: "1.5rem" }}>
            <b>Lap {index + 1}:</b> {lap}
          </div>
        ))}
      </div>
    </>
  );
}
