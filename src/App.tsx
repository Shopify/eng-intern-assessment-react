import { Box, HStack, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import ButtonType from "./enums/ButtonType";
import formatTime from "./utils/formatTime";

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    // Cleanup function: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(0);
  };

  const handleLap = () => {};

  const formattedTime = formatTime(currentTime);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-start'
      minHeight='100vh'
      p={4}
    >
      <Heading as='h1' size='2xl' mb='8' color='white'>
        React Stopwatch
      </Heading>
      <StopWatch formattedTime={formattedTime} />

      <HStack spacing={5}>
        <StopWatchButton type={ButtonType.Lap} onClick={handleLap} />
        <StopWatchButton type={ButtonType.Start} onClick={handleStartStop} />
        <StopWatchButton type={ButtonType.Reset} onClick={handleReset} />
      </HStack>
    </Box>
  );
}
