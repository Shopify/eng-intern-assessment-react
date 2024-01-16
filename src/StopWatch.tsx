import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // Indicate whether timer is running
  const [isPaused, setIsPaused] = useState<boolean>(true);
  // Record time in milliseconds
  const [time, setTime] = useState<number>(0);
  // Record laps in milliseconds
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  // useEffect to handle the timer interval (in milliseconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    //Start the interval when timer is running
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    // Clean up the interval on component unmount or when isPaused changes
    return () => clearInterval(interval);
  }, [isPaused, time]);

  // Handler to start or stop the timer
  const handleStartStop = () => {
    setIsPaused(!isPaused);
  };

  // Handler to reset the timer and lap times
  const handleReset = () => {
    setTime(0);
    setIsPaused(true);
    setLapTimes([]);
  };

  // Handler to record a lap time
  const handleLap = () => {
    // Add current time to previous recordings
    setLapTimes((prevLaps) => [...prevLaps, time]);
  };

  // Function to format time in MM:SS:SS format
  const formatTime = (totalMilSeconds: number) => {
    const milliseconds = Math.floor((totalMilSeconds / 10) % 1000);
    const seconds = Math.floor((totalMilSeconds / 1000) % 60);
    const minutes = Math.floor((totalMilSeconds / 60000) % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds)
      .padStart(2, "0")
      .slice(-2);

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  return (
    <div>
      {/* Display buttons */}
      <StopWatchButton
        isPaused={isPaused}
        handleStartStop={handleStartStop}
        handleReset={handleReset}
        handleLap={handleLap}
      ></StopWatchButton>

      {/* Display current time */}
      <div
        style={{
          textAlign: "center",
          backgroundColor: "black",
          borderRadius: "0 0 8px 8px",
          padding: "24px",
          marginBottom: "4px",
        }}
        data-testid="time-display"
      >
        <h1 style={{ color: "white", fontSize: "64px" }}>{formatTime(time)}</h1>
      </div>

      {/* Display lap times in reverse order */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
        data-testid="lap-list"
      >
        {lapTimes
          .slice()
          .reverse()
          .map((lapTime, index) => (
            <div
              style={{
                backgroundColor: "black",
                borderRadius: "8px",
                padding: "6px",
              }}
            >
              {/* Display formatted lap time */}
              <h2 key={index} style={{ color: "white", fontSize: "32px" }}>
                {formatTime(lapTime)}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}
