import React from 'react';
import { formatTime } from './utils';

interface StopwatchLapsProps {
    laps: number[];
}

const StopwatchLaps: React.FC<StopwatchLapsProps> = (props: StopwatchLapsProps) => {
    return (
        <div className="lap-list">
            {props.laps.map((lapTime, index) => (
                <div key={index} className="lap-item">{`Lap ${index + 1} - ${formatTime(lapTime)}`}</div>
            ))}
        </div>
    );
};

export default StopwatchLaps;