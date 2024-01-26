import React from 'react'

type StopWatchProps = {
    time: number;
};

export const formatTime = (time: number): string => {
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${+seconds < 10 ? "0" : ""}${seconds}`;
};

export default function StopWatch({time} : StopWatchProps) {
    return(
        <div className="stopwatch-display">
            {formatTime(time)}
        </div>
    );
};