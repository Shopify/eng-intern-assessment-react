import React from "react";

/**
 * Converts a time measured in milliseconds to "hh:mm:ss"
 * formatted string.
 *
 * @param time in milliseconds
 * @returns time as a "hh:mm:ss" formatted string
 */
const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600000)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor(time / 60000)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60)
        .toString()
        .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};

interface StopWatchProps {
    /** Time to display in milliseconds*/
    time: number;
}

const StopWatch = ({ time }: StopWatchProps) => {
    return <div className="stop-watch-display">{formatTime(time)}</div>;
};

export default StopWatch;
