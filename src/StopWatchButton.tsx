import React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export interface StopWatchButtonsProps {
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  addNewLap: () => void;
  resetStopWatch: () => void;
}

export default function StopWatchButton({
  isPaused,
  setIsPaused,
  addNewLap,
  resetStopWatch,
}: StopWatchButtonsProps) {
  const handlePause = (): void => {
    setIsPaused(!isPaused);
  };

  // Use a grid layout from MUI to format the buttons.
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
            onClick={resetStopWatch}
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
