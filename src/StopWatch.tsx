import React, {useEffect, useState} from 'react';
import StopWatchButton from './StopWatchButton';
import {
  BlockStack,
  Divider,
  InlineStack,
  Text,
} from '@shopify/polaris';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [currentLapTime, setCurrentLapTime] = useState<number>(0);

  useEffect(() => {
    if (!active) return;

    // Set up an interval to increment the elapsed time and lap time
    const INTERVAL = 10; // 10 ms
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + INTERVAL);
      setCurrentLapTime(prevLap => prevLap + INTERVAL);
    }, INTERVAL);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [active]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const displayedMilliseconds = Math.floor((milliseconds % 1000) / 10); // Only two decimal places
    const displayedSeconds = totalSeconds % 60;
    const displayedMinutes = totalMinutes % 60;
    const displayedHours = totalHours;

    return [displayedHours, displayedMinutes, displayedSeconds, displayedMilliseconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  }

  const handleStartStopClick = () => {
    setActive(prevActive => !prevActive);
  }

  const handleLapResetClick = () => {
    // Reset the elapsed time if the stopwatch is inactive
    if (!active) {
      setElapsedTime(0);
      setCurrentLapTime(0);
      setLaps([]);
      return;
    } else {
      // Otherwise, add the current lap time to the laps
      setLaps(prevLaps => [...prevLaps, currentLapTime]);
      setCurrentLapTime(0);
    }
  }

  return (
    <BlockStack align='space-between' gap='500'>
      <Text
        alignment='center'
        as='p'
        variant='heading2xl'
        numeric={true}
      >
        {formatTime(elapsedTime)}
      </Text>
      <InlineStack align='space-between'>
        <StopWatchButton
          labels={["Reset", "Lap"]}
          active={active}
          tone={active ? 'success' : 'critical'}
          onClick={handleLapResetClick}
        />
        <StopWatchButton
          labels={["Start", "Stop"]}
          active={active}
          tone={active ? 'critical' : 'success'}
          onClick={handleStartStopClick}
        />
      </InlineStack>
      <Divider />
      {elapsedTime !== 0 && <Text as='p' variant='bodyLg'>Lap {laps.length + 1} {formatTime(currentLapTime)}</Text>}
      {[...laps].reverse().map((lap, index) => (
        <Text as='p' variant='bodyLg' key={index}>Lap {laps.length - index} {formatTime(lap)}</Text>
      ))}
    </BlockStack>
  )
}