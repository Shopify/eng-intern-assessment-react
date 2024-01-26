import React from 'react';
import { formatTime } from './utils';
import './assets/stopWatch.css';

type StopwatchProps = {
    time: number;
};

const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    

    return <div className='stopwatch'>{formatTime(time)}</div>;
};

export default Stopwatch;
