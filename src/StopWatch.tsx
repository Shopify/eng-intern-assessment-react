import React from "react";
import { Box } from "@chakra-ui/react";
import { useStopWatchContext } from "./Context";

export default function StopWatch() {
  const { formatTime } = useStopWatchContext();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize="90px"
      color="white"
    >
      {formatTime()}
    </Box>
  );
}
