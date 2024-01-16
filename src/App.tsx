import { Box, HStack, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import ButtonType from "./enums/ButtonType";
import formatTime from "./utils/formatTime";
import LapTable from "./components/LapTable";
import LapTableInterface from "./interfaces/LapTableInterface";

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [lapTableData, setLapTableData] = useState<LapTableInterface>({
    lapTimes: []
  });
  const [showTable, setShowTable] = useState<boolean>(false);

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
    setLapTableData({ lapTimes: [] });
    setShowTable(false);
  };

  const handleLap = () => {
    if (isRunning) {
      setLapTableData(prevData => ({
        lapTimes: [
          ...prevData.lapTimes,
          { lapNumber: prevData.lapTimes.length + 1, lapTime: currentTime }
        ]
      }));
      setShowTable(true);
    }
  };

  const lapTableProps: LapTableInterface = {
    lapTimes: lapTableData.lapTimes
  };

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

      <HStack
        spacing={5}
        padding={6}
        background='rgba(255, 255, 255, 0.1)'
        border='1px solid rgba(255, 255, 255, 0.2)'
        borderRadius={30}
      >
        <StopWatchButton
          type={ButtonType.Lap}
          onClick={handleLap}
          isRunning={isRunning}
        />
        <StopWatchButton
          type={ButtonType.Start}
          onClick={handleStartStop}
          isRunning={isRunning}
        />
        <StopWatchButton type={ButtonType.Reset} onClick={handleReset} />
      </HStack>
      {showTable && <LapTable {...lapTableProps} />}
    </Box>
  );
}
