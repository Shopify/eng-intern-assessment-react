import React from "react";
import { Box } from "@chakra-ui/react";
import { useStopwatch } from "./useStopWatch";

export default function StopWatch() {
  const { isRunning, start, pause, reset, formattedTime } = useStopwatch();
  // console.log(formattedTime);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {formattedTime()}
      <button onClick={() => start()}>start</button>
      <button onClick={() => pause()}>stop</button>
      <button onClick={() => reset()}>reset</button>
    </Box>
  );
}
