// src/Stopwatch.tsx
import React from 'react';

interface StopwatchProps {
    time: number;
}

//component recieves time as prop
const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    return (
        <div>
            <div>
                <span>{time}</span>
            </div>
        </div>
    );
};

export default Stopwatch;