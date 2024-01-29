import React from 'react';
import {formatTime} from '../utils/stopWatchUtils';

type StopwatchProps = {
    time: number;
    laps: number[];
};

const StopWatch: React.FC<StopwatchProps> = ({ time, laps }) => {

    return (
        <div>
            <div>{formatTime(time)}</div>
            <div>
                {laps.map((lap, index) => (
                    <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
                ))}
            </div>
        </div>
    );
};

export default StopWatch;