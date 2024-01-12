import { Box, HStack, Heading } from '@chakra-ui/react'
import React from 'react'

interface StopWatchProps {
    time: number;
    isRunning: boolean;
}

export default function StopWatch({time, isRunning}: StopWatchProps) {
    const seconds = time;
    const totalMinutes = Math.floor(seconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return (
        <HStack>
            <Box bgColor={'white'} p={2} rounded="xl" w={24}>
                <Heading size='3xl'>{hours.toString().padStart(2, '0')}</Heading>
            </Box>
            <Heading size="3xl" color='white'>:</Heading>
            <Box bgColor={'white'} p={2} rounded="xl" w={24}>
                <Heading size='3xl'>{minutes.toString().padStart(2, '0')}</Heading>
            </Box>
            <Heading size="3xl" color='white'>:</Heading>
            <Box bgColor={'white'} p={2} rounded="xl" w={24}>
                <Heading size='3xl'>{seconds.toString().padStart(2, '0')}</Heading>
            </Box>
        </HStack>
    )
}