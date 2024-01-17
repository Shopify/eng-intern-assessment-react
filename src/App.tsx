import React, { useEffect, useState } from "react";
import { Flex, HStack, Heading, VStack } from "@chakra-ui/react";

import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import ButtonType from "./enums/ButtonType";
import formatTime from "./utils/formatTime";
import LapTable from "./components/LapTable";
import LapTableProps from "./interfaces/LapTableProps";
import GlassContainer from "./components/GlassContainer";

export default function App() {
  // State variables
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [lapTableData, setLapTableData] = useState<LapTableProps>({
    lapTimes: []
  });
  const [showTable, setShowTable] = useState<boolean>(false);

  // Effect for handling the timer interval
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

  // Event handlers
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

  // Lap table props
  const lapTableProps: LapTableProps = {
    lapTimes: lapTableData.lapTimes
  };

  // Time formatting
  const formattedTime = formatTime(currentTime);

  return (
    <Flex
      flexDirection='row'
      alignItems='flex-start'
      justifyContent='center'
      minHeight='100vh'
      p={4}
    >
      <VStack>
        {/* Application Heading */}
        <Heading as='h1' size='2xl' mb='8'>
          React Stopwatch
        </Heading>

        {/* Stopwatch Component */}
        <StopWatch formattedTime={formattedTime} />

        {/* Buttons inside Glass Container */}
        <GlassContainer>
          <HStack spacing={5}>
            <StopWatchButton
              type={ButtonType.LAP}
              onClick={handleLap}
              isRunning={isRunning}
            />
            <StopWatchButton
              type={ButtonType.START}
              onClick={handleStartStop}
              isRunning={isRunning}
            />
            <StopWatchButton type={ButtonType.RESET} onClick={handleReset} />
          </HStack>
        </GlassContainer>
      </VStack>

      {/* Conditional Rendering of Lap Table */}
      {showTable && <LapTable {...lapTableProps} />}
    </Flex>
  );
}
