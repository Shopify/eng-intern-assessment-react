import React from 'react';
import {formatTime} from '../utils/StopwatchUtils';


type StopwatchProps = {
    time: number;
    laps: number[];
};

const Stopwatch: React.FC<StopwatchProps> = ({ time, laps }) => {

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

export default Stopwatch;