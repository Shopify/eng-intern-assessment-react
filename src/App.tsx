import { Box, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import ButtonType from "./enums/ButtonType";

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
      <HStack spacing={5}>
        <StopWatchButton type={ButtonType.Start} />
        <StopWatchButton type={ButtonType.Lap} />
        <StopWatchButton type={ButtonType.Reset} />
      </HStack>
    </Box>
  );
}
