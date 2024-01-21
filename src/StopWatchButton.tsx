import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";

interface StopWatchButtonProps {
  isStarted: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
}

export default function StopWatchButton({
  isStarted,
  start,
  stop,
  reset,
  lap,
}: StopWatchButtonProps) {
  return (
    <>
      {isStarted ? (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={4}
        >
          <Button variant="contained" onClick={lap}>
            Lap
          </Button>
          <Button variant="contained" onClick={stop} color="error">
            Stop
          </Button>
        </Stack>
      ) : (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={4}
        >
          <Button variant="contained" onClick={reset}>
            Reset
          </Button>
          <Button variant="contained" onClick={start} color="success">
            Start
          </Button>
        </Stack>
      )}
    </>
  );
}
