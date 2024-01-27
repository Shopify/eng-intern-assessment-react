import React, { useMemo } from 'react';
import './styles.css';
import formatTime from "../formatTime";

type StopWatchProps = {
    elapsedTime: number;
    laps: number;
};

export default function StopWatch({ elapsedTime }: StopWatchProps) {
    const timeString = useMemo(
        () => formatTime(elapsedTime),
        [elapsedTime],
    );
    return (
        <div>
            <span className="elapsedTime">{timeString}</span>
        </div>
    );
}
