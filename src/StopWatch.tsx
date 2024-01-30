import React from 'react';

type StopwatchProps = {
    time: number;
};

const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };

    const pad = (num: number) => num.toString().padStart(2, '0');

    return <div>{formatTime(time)}</div>;
};

export default Stopwatch;
