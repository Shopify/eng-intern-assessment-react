import React from 'react';

type StopwatchProps = {
    time: number;
};

// Add className prop to StopwatchProps
const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    // Add formatTime function
    const formatTime = (time: number) => {
        // format time as mm:ss:ms
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };

    // pad numbers with leading zeros
    const pad = (num: number) => num.toString().padStart(2, '0');

    return <div>{formatTime(time)}</div>;
};

export default Stopwatch;
