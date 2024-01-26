import React from 'react';
import { formatTime } from './utils';

type StopwatchProps = {
    time: number;
};

const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    

    return <div>{formatTime(time)}</div>;
};

export default Stopwatch;
