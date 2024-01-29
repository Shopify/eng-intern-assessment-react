import React, { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import formatTime from "../helpers/formatTime";
import StopWatchButton from "./StopWatchButton";
import StopWatchLaps from "./StopWatchLaps";

import "../styles/stopwatch.css";

export default function StopWatch() {
  // Current timestamp displayed on stopwatch
  const [time, setTime] = useState(0);
  // Stopwatch running state
  const [isRunning, setIsRunning] = useState(false);
  // List of recorded laps
  const [laps, setLaps] = useState([]);
  // Current lap time elapsed since previous
  const [curLap, setCurLap] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isRunning) {
      // Increment time and curLap every 10 miliseconds using setInterval
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setCurLap((prevLap) => prevLap + 1);
      }, 10);
    }
    // Stop interval when component unmounts
    return () => clearInterval(intervalId);
  }, [isRunning, time, curLap]);

  // Start / stop stopwatch
  const handleStartAndStopClick = () => {
    setIsRunning(!isRunning);
  };

  // Reset time and laps
  const handleResetClick = () => {
    setTime(0);
    setLaps([]);
    setCurLap(0);
  };

  // Finish current lap and start new lap - push curLap to start of laps list
  const handleLapClick = () => {
    setLaps([curLap, ...laps]);
    setCurLap(0);
  };

  return (
    <Paper className="stopwatch-paper" sx={{ borderRadius: "10px" }}>
      <Typography variant="h2" className="stopwatch-time">
        {formatTime(time)}
      </Typography>
      <Box className="stopwatch-buttons">
        <StopWatchButton
          buttonType={isRunning ? "stop" : "start"}
          onClick={handleStartAndStopClick}
        />
        <StopWatchButton
          buttonType={isRunning ? "lap" : "reset"}
          onClick={isRunning ? handleLapClick : handleResetClick}
        />
      </Box>
      <StopWatchLaps time={time} curLap={curLap} laps={laps} />
    </Paper>
  );
}
