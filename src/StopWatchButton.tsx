import React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface StopwatchButtonsProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  addNewLap: () => void;
  setLaps: React.Dispatch<React.SetStateAction<number[]>>;
  setSavedTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function StopWatchButton({
  time,
  setTime,
  isPaused,
  setIsPaused,
  addNewLap,
  setLaps,
  setSavedTime,
}: StopwatchButtonsProps) {
  const handlePause = (): void => {
    setIsPaused(!isPaused);
  };

  const resetTime = (): void => {
    setTime(0);
    setSavedTime(0);
    setIsPaused(true);
    setLaps([]);
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center" display="flex">
        <Grid
          item
          xs={3}
          alignItems="center"
          display="flex"
          justifyContent="center"
          alignSelf="center"
        >
          {isPaused ? (
            <Button
              onClick={handlePause}
              style={{
                color: "green",
                textAlign: "center",
                alignSelf: "center",
                margin: "10px",
              }}
            >
              Start
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              style={{
                color: "red",
                textAlign: "center",
                alignSelf: "center",
                margin: "10px",
              }}
            >
              Stop
            </Button>
          )}
        </Grid>

        <Grid
          item
          xs={3}
          alignItems="center"
          display="flex"
          justifyContent="center"
          alignSelf="center"
        >
          <Button
            onClick={resetTime}
            style={{
              color: "gray",
              textAlign: "center",
              alignSelf: "center",
              margin: "10px",
            }}
          >
            Reset
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          alignItems="center"
          display="flex"
          justifyContent="center"
          alignSelf="center"
        >
          <Button
            onClick={addNewLap}
            style={{ textAlign: "center", alignSelf: "center", margin: "10px" }}
          >
            Lap
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
