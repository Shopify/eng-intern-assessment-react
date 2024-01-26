import React from "react";
import { Button } from "@mui/material";
import { StopWatchButtonProps } from "./stopWatchProps";
import "./styles.css";

export default function StopWatchButton(props: StopWatchButtonProps) {
  const {
    isStopped,
    setIsStopped,
    time,
    resetTime,
    resetLaps,
    resetMinTime,
    resetMaxTime,
    resetCalculatedLapTimes,
  } = props;

  function onStartStopClick() {
    setIsStopped(!isStopped);
  }

  function onResetClick() {
    resetTime(0);
    setIsStopped(true);
    resetLaps([]);
    resetMinTime(Number.POSITIVE_INFINITY);
    resetMaxTime(0);
    resetCalculatedLapTimes([]);
  }

  function onLapTimeClick() {
    if (time !== 0) {
      resetLaps((prevLaps: number[]) => [...prevLaps, time]);
    }
  }

  return (
    <div className="stop-watch-button-container">
      <Button
        id="stop-watch-button-start-stop"
        variant="contained"
        color={isStopped ? "success" : "error"}
        onClick={onStartStopClick}
      >
        {isStopped ? "Start" : "Stop"}
      </Button>
      <Button
        id="stop-watch-button-reset-lap"
        color="info"
        variant="contained"
        onClick={isStopped ? onResetClick : onLapTimeClick}
      >
        {isStopped ? "Reset" : "Lap"}
      </Button>
    </div>
  );
}
