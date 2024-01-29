import React from 'react';
import { useEffect } from 'react';
import StopWatchButton from './StopWatchButton'; // import StopWatchButton component
import { Center, StackDivider, VStack, Text } from '@chakra-ui/react'; // for centering purposes
const StopWatch: React.FC = () => {
  let [count, setCount] = React.useState(0); // count variable
  let [isOn, setIsOn] = React.useState(false); // boolean for stop watch to continue or stop
  const [laps, setLaps] = React.useState<number[]>([]); // laps array

  useEffect(() => {
    if (!isOn) return; // if isOn is false the setInterval will not be executed

    //setInterval timeCounter
    const timerCount = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      console.log(isOn);
    }, 1000);

    return () => {
      clearInterval(timerCount); // clear interval
    };
  }, [isOn]);

  const stopTimer = () => setIsOn(false); // stop timer function
  const startTimer = () => setIsOn(true); // start timer function
  const resetTimer = () => {
    setCount(0); // after reset set count to 0
    setLaps([]); // after reset set laps to empty array
    setIsOn(false); // after reset set isOn to false
    //user will have to click start button to start timer again
  };

  // addLap function
  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, count]);
  };

  return (
    <>
      {/* Stop Watch Display */}
      <VStack
        divider={<StackDivider borderColor="messenger.200" />}
        spacing={4}
        align="stretch"
        w="300px"
      >
        {/* Display */}
        <Center>
          <Text fontSize="2xl" color="gray.700" as="b">
            Stop Watch Display ⌚
          </Text>
        </Center>

        {/* Display Seconds*/}
        <Center>
          <Text fontSize="xl" color="gray.700" as="b">
            {count}
          </Text>
        </Center>

        {/* Buttons */}
        <StopWatchButton
          stopCount={stopTimer}
          startCount={startTimer}
          resetCount={resetTimer}
          addLapCount={addLap}
        />

        {/* Display Laps if laps is clicked */}
        {laps.length > 0 && count > 0 ? (
          <Center>
            <Text fontSize="2xl" color="gray.700" as="b">
              <VStack
                divider={<StackDivider borderColor="messenger.200" />}
                spacing={4}
                align="stretch"
                w="300px"
              >
                {laps.map((lap, index) => {
                  return (
                    <Center>
                      <Text
                        key={index + 1}
                        fontSize="sm"
                        color="gray.700"
                        as="b"
                      >
                        Lap {index + 1}: {lap}{' '}
                        {`${lap > 1 ? 'seconds' : 'second'}`}
                      </Text>
                    </Center>
                  );
                })}
              </VStack>
            </Text>
          </Center>
        ) : null}
      </VStack>
    </>
  );
};

export default StopWatch;
