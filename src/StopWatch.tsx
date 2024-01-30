import { Heading, Stack, VStack, HStack, Text } from "@chakra-ui/react";
import StopWatchButton from './StopWatchButton'
import React, { useState, useEffect } from "react";


export default function StopWatch() {
    // init arrat to use for state of laps
    const initLaps: Array<[number, string]> = [];

    // define states for variables used
    const [laps, setLaps] = useState(initLaps);
    const [numLaps, setNumLaps] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // addsthe current time value and lap number as a member of the laps array, to be dynamically rendered
    const addLap = () => {
        let temp = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
        setLaps((prevLaps) => [...prevLaps, [numLaps, temp]]);
        setNumLaps(numLaps => numLaps + 1);
    };

    // translate time into its derivatives to be displayed separately
    const hours = Math.floor(time/360000).toString().padStart(2, "0");
    const minutes = Math.floor((time%360000) / 6000).toString().padStart(2, "0");
    const seconds = Math.floor((time%6000) / 100).toString().padStart(2, "0");
    const milliseconds = (time%100).toString().padStart(3, "0");
  
    // set interval updates every 10ms so the stopwatch is continuous
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isRunning){
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
  
    // functions to alter the clock functions by handling button presses
    const handleStart = () => {
        if (!isRunning){
            setIsRunning(isRunning => !isRunning);
        }
      };

    const handleStop = () => {
        if (isRunning){
            setIsRunning(isRunning => !isRunning);
        }
    };
  
    // sets all values back to their initial states
    const handleReset = () => {
      setTime(0);
      setIsRunning(false);
      setLaps([]);
      setNumLaps(0);
    };


    return(
        <Stack w="full" mx="0" p="0" direction={["column", "column", "column", "row"]} spacing='8' minHeight={"100vh"} bg="black">
            <VStack alignItems="space-between" w='90%' spacing="1.5" h="full" bg="white" mt ="3%" mb="2%" mx="5%" borderRadius="25px">
                <Heading mt="5%" as="h1" color="black" textAlign="center" fontWeight="bold" fontSize="4xl">
                    Shopify Challenge Stopwatch
                </Heading>
                <VStack mx="3%" my="3%" py="10%" border="5px solid grey" borderRadius="25px">                
                    <Heading as="h1" color="black" textAlign="center" fontWeight="bold" fontSize="6xl">
                        <span>{ hours } : { minutes } : { seconds } : { milliseconds }</span>
                    </Heading>
                </VStack>
                <StopWatchButton label='start' back='#1BE4F4' disableCondition={isRunning} onClick={handleStart}></StopWatchButton>
                <HStack mt="3%">
                    <StopWatchButton label='reset' back='#30F99E' disableCondition={false} onClick={handleReset} ></StopWatchButton>
                    <StopWatchButton label='stop' back='#30F99E' disableCondition={false} onClick={handleStop} ></StopWatchButton>
                    <StopWatchButton label='lap' back='#30F99E' disableCondition={false} onClick={addLap} ></StopWatchButton>
                </HStack>
                <VStack minH="10%" alignItems="center">
                    <Text>{numLaps>0 ? "laps:" : "laps will be displayed below here"}</Text>
                    {  laps.map((item) => {
                        return <HStack justifyContent="space-between" w='90%' mx='10%'><Text textAlign="left" w='40%'>{item[0]}</Text><Text textAlign="right" w='40%'>{item[1]}</Text></HStack>;
                    }) }
                </VStack>
                <VStack padding="0" my="5px" h="5%" fontSize="2xs">
                    <br />
                    <Text my="0">&copy; Jaren Worme 2024</Text>
                    <HStack color="#4DEEF5" my="0" >
                        <a  href="https://www.jarenworme.com/">visit my portfolio website</a>
                    </HStack>
                </VStack>
            </VStack>
        </Stack>        
    )
}
