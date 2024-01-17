import React from "react";
import { Box, Heading } from "@chakra-ui/react";

import StopWatchProps from "../interfaces/StopWatchProps";

const StopWatch = ({ formattedTime }: StopWatchProps): JSX.Element => {
  return (
    // Container for the entire stopwatch component
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={4}
      minHeight='60vh'
    >
      {/* Circular border for the stopwatch display */}
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        borderRadius='50%'
        width='320px'
        height='320px'
        borderWidth='4px'
        borderStyle='dotted'
        borderColor='blue.500'
      >
        {/* Heading element to display the formatted time */}
        <Heading as='h2' size='4xl' data-testid='stopwatch-time'>
          {formattedTime}
        </Heading>
      </Box>
    </Box>
  );
};

export default StopWatch;
