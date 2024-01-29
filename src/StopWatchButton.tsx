import React from 'react';
import { Button, Flex, Spacer, useToast, Box, Center } from '@chakra-ui/react';

// Props for StopWatchButton component
interface StopWatchButtonProps {
  stopCount: () => void;
  startCount: () => void;
  resetCount: () => void;
  addLapCount: () => void;
}
// StopWatchButton component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  stopCount,
  startCount,
  resetCount,
  addLapCount,
}) => {
  const toast = useToast(); // chakra-ui toast component

  return (
    <>
      {/* Used chakra-ui toast component to display a message when buttons are clicked. */}
      {/* Buttons display 🔲*/}
      <Flex justifyContent="justify">
        {/* Start Button component from chakra-ui */}
        <Button
          colorScheme="messenger"
          variant="outline"
          onClick={() => {
            toast({
              position: 'bottom',
              duration: 2000,
              render: () => (
                <Box color="white" p={3} bg="green.500" borderRadius={5}>
                  <Center>Time Started ✅</Center>
                </Box>
              ),
            });
            startCount(); // startCount function passed down from StopWatch component
          }}
        >
          Start
        </Button>
        {/* Spacer component from chakra-ui */}
        <Spacer />
        {/* Stop Button component from chakra-ui */}
        <Button
          colorScheme="messenger"
          variant="outline"
          onClick={() => {
            toast({
              position: 'bottom',
              duration: 2000,
              render: () => (
                <Box color="white" p={3} bg="yellow.500" borderRadius={5}>
                  <Center>Time Stopped 🛑</Center>
                </Box>
              ),
            });
            stopCount();
          }}
        >
          Stop
        </Button>
        {/* Spacer component from chakra-ui */}
        <Spacer />
        {/* Reset Button component from chakra-ui */}
        <Button
          colorScheme="messenger"
          variant="outline"
          onClick={() => {
            toast({
              position: 'bottom',
              duration: 2000,
              render: () => (
                <Box color="white" p={3} bg="red.500" borderRadius={5}>
                  <Center>Time Reset ✖️</Center>
                </Box>
              ),
            });
            resetCount();
          }}
        >
          Reset
        </Button>
        {/* Spacer component from chakra-ui */}
        <Spacer />
        {/* Lap Button component from chakra-ui */}
        <Button
          colorScheme="messenger"
          variant="outline"
          onClick={() => {
            toast({
              position: 'bottom',
              duration: 2000,
              render: () => (
                <Box color="white" p={3} bg="blue.500" borderRadius={5}>
                  <Center>Time Lapped 🏃‍♀️</Center>
                </Box>
              ),
            });
            addLapCount();
          }}
        >
          Lap
        </Button>
      </Flex>
    </>
  );
};

export default StopWatchButton;
