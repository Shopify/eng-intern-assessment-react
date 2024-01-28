import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

// Format time to show minutes, seconds, and milliseconds
function formatTime(ms: number): string {
  let milliseconds = (ms / 10) % 100;
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / 60000);

  // Pad with leading zeros to show two digits for minutes and seconds, and three digits for milliseconds
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(2, "0")}`;
}

// StopWatch Component
const StopWatch: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false); // Determine if the stopwatch is running
  const [isPaused, setIsPaused] = useState<boolean>(true); // Determine if the stopwatch is paused
  const [time, setTime] = useState<number>(0); // Elapsed time in milliseconds
  const [laps, setLaps] = useState<number[]>([]); // Lap times in milliseconds

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // If the stopwatch is running and not paused, increment the time by 10 milliseconds every 10 milliseconds
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);

      // If the stopwatch is not active or is paused, clear the interval
    } else if (interval) {
      clearInterval(interval);
    }

    // Cleanup function to clear the interval
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  // Handle the start and pause button
  const handleStartStop = () => {
    setIsActive((currentIsActive) => !currentIsActive);
    setIsPaused((currentIsPaused) => !currentIsPaused);
  };

  // Handle the reset button
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
    setLaps([]);
  };

  // Handle the lap button
  const handleLap = () => {
    if (isActive && !isPaused && laps.length < 100) {
      setLaps([...laps, time]);
    }
    if (laps.length === 100) {
      alert("You have reached the maximum number of laps!");
    }
  };

  // Function to divide laps into groups of 10
  const getLapGroups = (laps: number[]): number[][] => {
    const groups: number[][] = [];
    for (let i = 0; i < laps.length; i += 10) {
      groups.push(laps.slice(i, i + 10));
    }
    return groups;
  };

  const lapGroups = getLapGroups(laps);

  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <div>
        <StopWatchButton className="stopwatch-button reset-button" onClick={handleReset} label="Reset" />
        <StopWatchButton
          className="stopwatch-button lap-button"
          onClick={handleLap}
          label="Lap"
          disabled={!isActive || isPaused}
        />
        <StopWatchButton
          className="stopwatch-button stop-button"
          onClick={handleStartStop}
          label={isActive && !isPaused ? "Pause" : "Start"}
        />
      </div>
      <div className="lap-groups">
        {lapGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="lap-times">
            {group.map((lap, index) => (
              <div className="lap-time" key={groupIndex * 10 + index}>
                Lap {groupIndex * 10 + index + 1}: {formatTime(lap)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
