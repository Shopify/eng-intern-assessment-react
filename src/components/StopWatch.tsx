import React from 'react';

interface StopwatchProps {
    time: number;
    laps: number[];
}

const formatTime = (time: number) => {
    // Convert time to a human-readable format
    // Assuming time is in milliseconds
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedSeconds = seconds % 60;
    const formattedMinutes = minutes % 60;

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

export default function Stopwatch({ time, laps }: StopwatchProps) {
    return (
        <div>
            <h2>Time: {formatTime(time)}</h2>
            <h3>Laps</h3>
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>{formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
}
