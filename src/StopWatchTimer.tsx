import React from 'react';
import { formatTime } from './utils';

interface StopwatchTimerProps {
    time: number;
 }

const StopwatchTimer: React.FC<StopwatchTimerProps> = (props) => {

    return (
        <div className="timer">{formatTime(props.time)}</div>
    );
};

export default StopwatchTimer;