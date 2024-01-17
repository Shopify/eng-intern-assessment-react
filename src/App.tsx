import React, { useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import LapsDisplay from './LapsDisplay';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export type Time = {
  minutes: number;
  seconds: number;
  milliseconds: number;
};


const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(45, 55, 72);
    color: rgb(237, 237, 237);
  }
`;

const calculateTime = (totalMilliseconds: number): Time => {
  const minutes = Math.floor((totalMilliseconds % 3600000) / 60000); // 60000 milliseconds in a minute
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000); // 1000 milliseconds in a second
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10); // rounding to two digits

  return { minutes, seconds, milliseconds };
};

export const timeToString = (timeObject: Time): string => {
  const { minutes, seconds, milliseconds } = timeObject;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

export default function App() {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<String[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setRunning(true);
    intervalId.current = setInterval(() => {
      setMilliseconds(prev => prev + 10);
    }, 10);
  }
  
  const stop = () => {
    setRunning(false);
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };  
  
  // Reset button resets the timer to zero but does not stop the timer from running
  const resetTimer = () => {
    setMilliseconds(0);
  }
  
  const recordLap = () => {
    setLaps([...laps, timeToString(calculateTime(milliseconds))]);
  }
  
  const clearLaps = () => {
    setLaps([]);
  }

  return(
    <>
      <GlobalStyle />
      <StopwatchContainer>
        <StopWatch duration={calculateTime(milliseconds)} />
        <FlexContainer>
          {running ?
            <StopWatchButton label='Stop' action={stop} variant='red'/> :
            <StopWatchButton label='Start' action={start} variant='green'/>
          }
          <StopWatchButton label='Lap' action={recordLap} />
          <StopWatchButton label='Reset Timer' action={resetTimer} />
        </FlexContainer>
      </StopwatchContainer>
      <LapsContainer>
        {laps.length > 0 && 
          <LapsFlexContainer>
            <h2>Laps</h2>
            <StopWatchButton label='Clear Laps' action={clearLaps} />
          </LapsFlexContainer>
        }
        <LapsDisplay laps={laps} />
      </LapsContainer>
    </>
  )
}

const StopwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: rgb(10, 18, 30);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 400px;
`

const LapsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px auto;
  max-width: 400px;
  font-family: sans-serif;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`

const LapsFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 10px;
  border-bottom: 3px solid white;
`