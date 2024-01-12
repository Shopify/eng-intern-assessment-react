import { Button, HStack } from '@chakra-ui/react'
import React from 'react'

interface StopWatchButtonProps {
    start: () => void;
    pause: () => void;
    reset: () => void;
    lap: () => void;
}

export default function StopWatchButton({ start, pause, reset, lap }: StopWatchButtonProps) {
    return(
        <HStack>
            <Button colorScheme={'green'} onClick={start}>Start</Button>
            <Button colorScheme={'red'} onClick={pause}>Stop</Button>
            <Button colorScheme='whiteAlpha' onClick={reset}>Reset</Button>
            <Button colorScheme='blue' onClick={lap}>Lap</Button>
        </HStack>
    )
}