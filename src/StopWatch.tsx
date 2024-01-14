import React from 'react';
import { Time } from './App';

const StopWatch: React.FC<Time> = ({ hours, minutes, seconds }) => {
    return(
        <div className="stopwatch-container">
            <div className="stopwatch-item">
                <span className="number" data-testid="time-hrs">{hours}</span>
                <span className="label">hrs</span>
            </div>
            <div className="stopwatch-item">
                <span className="number" data-testid="time-min">{minutes}</span>
                <span className="label">min</span>
            </div>
            <div className="stopwatch-item">
                <span className="number" data-testid="time-sec">{seconds}</span>
                <span className="label">sec</span>
            </div>
        </div>
    );
};

export default StopWatch;