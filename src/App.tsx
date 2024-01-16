import { Box, HStack, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import ButtonType from "./enums/ButtonType";

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  const handleLap = () => {};

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
      <StopWatch isRunning={isRunning} />
      <HStack spacing={5}>
        <StopWatchButton type={ButtonType.Start} onClick={handleStartStop} />
        <StopWatchButton type={ButtonType.Lap} onClick={handleLap} />
        <StopWatchButton type={ButtonType.Reset} onClick={handleLap} />
      </HStack>
    </Box>
  );
}
