import { Heading, Stack, VStack, HStack } from "@chakra-ui/react";
import StopWatchButton from './StopWatchButton'
import React, { useState, useEffect } from "react";


export default function StopWatch() {
    const initLaps: Array<[number, string]> = [];

    const [laps, setLaps] = useState(initLaps);
    const [numLaps, setNumLaps] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const addLap = () => {
        let temp = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
        setLaps((prevLaps) => [...prevLaps, [numLaps, temp]]);
        setNumLaps(numLaps => numLaps + 1);
        console.log(laps);
    };

    const hours = Math.floor(time/360000).toString().padStart(2, "0");
    const minutes = Math.floor((time%360000) / 6000).toString().padStart(2, "0");
    const seconds = Math.floor((time%6000) / 100).toString().padStart(2, "0");
    const milliseconds = (time%100).toString().padStart(3, "0");
  
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
  
    const start = () => {
        if (!isRunning){
            setIsRunning(isRunning => !isRunning);
        }
      };

    const stop = () => {
        if (isRunning){
            setIsRunning(isRunning => !isRunning);
        }
    };
  
    const reset = () => {
      setTime(0);
      setIsRunning(false);
      setLaps([]);
      setNumLaps(0);
    };


    return(
        <Stack direction={["column", "column", "column", "row"]} px='6' pb='6' spacing='8'>
            <VStack alignItems="stretch" w='full' spacing="1.5">
                <Heading as="h1" color="black" textAlign="center" fontWeight="bold" fontSize="6xl">
                    Text
                </Heading>
                <StopWatchButton label='start' back='lavender' testId='testid' disableCondition={false} onClick={start}></StopWatchButton>
                <HStack>
                    <StopWatchButton label='reset' back='purple' testId='testid' disableCondition={false} onClick={reset} ></StopWatchButton>
                    <StopWatchButton label='stop' back='purple' testId='testid' disableCondition={false} onClick={stop} ></StopWatchButton>
                    <StopWatchButton label='lap' back='purple' testId='testid' disableCondition={false} onClick={addLap} ></StopWatchButton>
                </HStack>                
                <Heading as="h1" color="black" textAlign="center" fontWeight="bold" fontSize="6xl">
                    <span>{ hours } : { minutes } : { seconds } : { milliseconds }</span>
                </Heading>
                {  laps.map((item) => {
                    return <HStack w='full' mx='10%'><Heading textAlign="left" w='40%'>{item[0]}</Heading><Heading textAlign="right" w='40%'>{item[1]}</Heading></HStack>;
                }) }
            </VStack>
        </Stack>        
    )
}
