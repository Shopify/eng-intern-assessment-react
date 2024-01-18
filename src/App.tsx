import React, { useEffect, useState } from "react";
import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { render } from "@testing-library/react";

//This function displays the seconds in a hh:mm:ss format
const helperDisplay = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substring(11, 19);
  return timeString;
};

export default function App() {
  const [running, setRunning] = useState(false); //Watch is initally paused

  const [timePassed, setTimePassed] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);

  //Reasoning of keeping a string array for lap times is so that we don't have to convert numbers into strings each time we rerender
  const [laps, setLaps] = useState([]);

  const displayColor = running ? "green" : "red";
  const formattedTimePassed = helperDisplay(timePassed);

  //Controls incrementing time when running
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTimePassed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  //Updating lap times
  const recordLap = () => {
    const lapTime = timePassed - lastLapTime;
    setLastLapTime(timePassed);
    setLaps([...laps, helperDisplay(lapTime)]);
  };

  return (
    <ChakraProvider>
      <Flex align="center" justify="center" height={"100vh"} width={"full"}>
        <Flex
          direction="column"
          gap={4}
          align="center"
          bgColor="gray.200"
          p={4}
        >
          <Text fontWeight="bold" color={displayColor}>
            {running ? "RUNNING" : "STOPPED"}
          </Text>
          <StopWatch timePassed={formattedTimePassed} laps={laps} />
          <StopWatchButton
            setRunning={setRunning}
            recordLap={recordLap}
            running={running}
            setLastLapTime={setLastLapTime}
            setLaps={setLaps}
            setTimePassed={setTimePassed}
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
