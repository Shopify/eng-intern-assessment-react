import { Button, HStack } from '@chakra-ui/react'
import React from 'react'

interface StopWatchButtonProps {
    time: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
    lap: () => void;
    isRunning: boolean;
}

export default function StopWatchButton({ time, start, pause, reset, lap, isRunning }: StopWatchButtonProps) {
    return(
        <HStack>
            <Button colorScheme={'green'} onClick={isRunning ? pause: start}>{!isRunning && time == 0 ? "Start" : (isRunning ? "Pause" : "Resume")}</Button>
            <Button colorScheme={'red'} onClick={pause} isDisabled={time === 0}>Stop</Button>
            <Button colorScheme='whiteAlpha' onClick={reset}>Reset</Button>
            <Button colorScheme='blue' onClick={lap} isDisabled={!isRunning}>Lap</Button>
        </HStack>
    )
}