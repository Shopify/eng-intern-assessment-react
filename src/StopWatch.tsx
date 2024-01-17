import React from 'react';
import { timeToString } from './App';
import { Time } from './App';

type StopwatchProps = {
  duration: Time;
};

const Stopwatch: React.FC<StopwatchProps> = ({ duration }) => {
  return (
    <div>
      {timeToString(duration)}
    </div>
  );
};

export default Stopwatch;
