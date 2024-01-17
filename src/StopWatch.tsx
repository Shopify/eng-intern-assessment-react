import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import StopWatchButton from './StopWatchButton';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
interface StopwatchProps {
    elapsedTime: number,
    isRunning: boolean,
    startStopwatch: () => void,
    resetStopwatch: () => void,
    lap: () => void,
    laps: String[],
}

const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime, isRunning, startStopwatch, resetStopwatch, lap, laps }) => {
    return (
        <Box textAlign={"center"}>
            <Typography level="h1">Stopwatch</Typography>
            <Typography level="h3">
                {formatTime(elapsedTime)}
            </Typography>
            <StopWatchButton func={startStopwatch} name={isRunning ? 'Stop' : 'Start'} />
            <StopWatchButton func={resetStopwatch} name={"Reset"} />
            <StopWatchButton func={lap} name={"Lap"} />
            <Typography level="h2">Laps</Typography>
            <Box textAlign="center" sx={{  display: 'flex', justifyContent: 'center'}}>
                <List>
                    {laps.map((lapTime, index) => (
                        <ListItem key={index}>
                            <Typography level="h3">{"Lap "} {index + 1} {lapTime}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Box>
    );
};

const formatTime = (milliseconds: number): string => {
    const duration = moment.duration(milliseconds);
    return `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}:${String(Math.floor(duration.milliseconds() / 10)).padStart(2, '0')}`;
};

export default Stopwatch;
