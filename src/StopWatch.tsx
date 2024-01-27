import React from 'react'

type StopWatchProps = {
    time: number;
};

//display time function
export const displayTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
};

export default function StopWatch({time} : StopWatchProps) {
    return(
        <div className="stopwatch-display">
            {displayTime(time)}
        </div>
    );
};