import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import StopWatchInterface from "./interfaces/StopWatchInterface";

export default function StopWatch({ formattedTime }: StopWatchInterface) {
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
        width='320px'
        height='320px'
        borderWidth='4px'
        borderStyle='dotted'
        borderColor='blue.500'
      >
        <Heading as='h2' size='4xl'>
          {formattedTime}
        </Heading>
      </Box>
    </Box>
  );
}
