import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-start'
      minHeight='100vh'
      p={4}
    >
      <Heading as='h1' size='2xl' mb='8'>
        React Stopwatch
      </Heading>
      <StopWatch />
    </Box>
  );
}
