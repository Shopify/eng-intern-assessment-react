import { Box } from "@chakra-ui/react";
import React from "react";
import { useStopWatchContext } from "./Context";

const StopWatch: React.FC = () => {
  const { formatTime } = useStopWatchContext();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize="90px"
      color="white"
      data-testid="timer-display"
    >
      {formatTime()}
    </Box>
  );
};

export default StopWatch;
