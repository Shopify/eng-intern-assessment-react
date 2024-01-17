import React from 'react';
import { timeToString } from './App';
import { Time } from './App';
import styled from 'styled-components';

type StopwatchProps = {
  duration: Time;
};

const Stopwatch: React.FC<StopwatchProps> = ({ duration }) => {
  return (
    <StyledStopwatch data-testid="stopwatch-time">
      {timeToString(duration)}
    </StyledStopwatch>
  );
};

const StyledStopwatch = styled.div`
  font-size: 4rem;
  font-family: sans-serif;
`;

export default Stopwatch;
