import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import StopWatchInterface from "./interfaces/StopWatchInterface";

export default function StopWatch({ isRunning }: StopWatchInterface) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={4}
      minHeight='60vh'
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        borderRadius='50%'
        width='280px'
        height='280px'
        borderWidth='2px'
        borderStyle='dotted'
        borderColor='teal.500'
      >
        <Heading as='h2' size='4xl'>
          00:00
        </Heading>
      </Box>
    </Box>
  );
}
