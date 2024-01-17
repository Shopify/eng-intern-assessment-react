import React from 'react';
import moment from 'moment';
import StopWatchButton from './StopWatchButton';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

/**
 * Stopwatch Component
 * 
 * A stopwatch component with controls and lap information.
 * 
 * @param {Object} props - The properties of the component.
 * @param {number} props.elapsedTime - The elapsed time in milliseconds.
 * @param {boolean} props.isRunning - Indicates if the stopwatch is running.
 * @param {Function} props.startStopwatch - Function to start or stop the stopwatch.
 * @param {Function} props.resetStopwatch - Function to reset the stopwatch.
 * @param {Function} props.lap - Function to record a lap.
 * @param {string[]} props.laps - Array of lap times as strings.
 * 
 * @returns {JSX.Element} - The rendered Stopwatch component.
 */
interface StopwatchProps {
  elapsedTime: number;
  isRunning: boolean;
  startStopwatch: () => void;
  resetStopwatch: () => void;
  lap: () => void;
  laps: string[];
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
      <Box textAlign="center" sx={{ display: 'flex', justifyContent: 'center' }}>
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

/**
 * Format time in milliseconds to a string in MM:SS:SS format.
 * 
 * @param {number} milliseconds - The time in milliseconds.
 * @returns {string} - Formatted time string.
 */
const formatTime = (milliseconds: number): string => {
  const duration = moment.duration(milliseconds);
  return `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}:${String(Math.floor(duration.milliseconds() / 10)).padStart(2, '0')}`;
};

export default Stopwatch;
