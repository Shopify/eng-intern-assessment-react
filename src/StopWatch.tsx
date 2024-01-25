import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import { StyledButtonWrapper } from './StylingComponents/StyledButtonWrapper';
import StyledStopWatchWrapper from './StylingComponents/StyledStopWatchWrapper';

type firstDigits = 11 | 14; // have the first digits be hours or minutes
type lastDigits = 19 | 21 | 22; // have the last digits be seconds, tenths of a second, or hundredths of a second

interface TimerDigits {
    firstDigits: firstDigits,
    lastDigits: lastDigits
  }
  
  export default function Stopwatch(props: TimerDigits){
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const firstDigits = props.firstDigits
  const lastDigits = props.lastDigits

  
  // use effect block will update the time every 10 milliseconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);


  const startStopwatch = (): void => {
    setRunning(true)
  };
  const stopStopwatch = (): void => setRunning(false);
  const lapStopwatch = (): void => {
    setLaps([...laps, time])
    if (!running){
    }
  };
  const resetStopwatch = (): void => {
    setTime(0);
    setLaps([]);
    setRunning(false);
  };

  return (
    <StyledStopWatchWrapper>
      <h2>Diego's Stopwatch</h2>
      <div>Time: {new Date(time).toISOString().slice(firstDigits, lastDigits)}</div>
      { running ? (
      <StyledButtonWrapper>
        <StopWatchButton color={"#f44336"} hover={"#da190b"} onClick={stopStopwatch} text="Stop" />
        <StopWatchButton color={"#555555"} hover={"#333333"} onClick={lapStopwatch} text="Lap" />
    </StyledButtonWrapper>):(
    <StyledButtonWrapper>
        <StopWatchButton color={"#4CAF50"} hover={"#45a049"} onClick={startStopwatch} text="Start" />
        <StopWatchButton color={"#555555"} hover={"#333333"} onClick={resetStopwatch} text="Reset" />
    </StyledButtonWrapper>)
      }
      {/* Displays lap times */}
      {laps.length > 0 && (
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {new Date(lap).toISOString().slice(firstDigits, lastDigits)}</li>
          ))}
        </ul>
      )}
    </StyledStopWatchWrapper>
  );
};

Stopwatch.defaultProps = {
    firstDigits: 11,
    lastDigits: 22
  }