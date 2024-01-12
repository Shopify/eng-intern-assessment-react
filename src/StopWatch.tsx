import React from 'react'

// Props interface for StopWatch component
interface StopWatchProps {
    time: number;
    laps: number[];
}

// Function to format time in HH:MM:SS.SSS format
const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (3600 * 1000));
    const minutes = Math.floor((milliseconds % (3600 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    const millisecondsPart = milliseconds % 1000;

    const pad = (value: number, length: number) => {
        return value.toString().padStart(length, '0');
    };

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millisecondsPart, 3)}`;
};

// My StopWatch component to display the stopwatch and lap times
const StopWatch: React.FC<StopWatchProps> = ({ time, laps }) => {
    return (
        <div>
            <h3> My StopWatch </h3>
            <h1> {formatTime(time)} </h1>
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
};

export default StopWatch;