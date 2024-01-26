import React from 'react'
import './styles/StopWatch.css'

type StopwatchProps = {
    time: number; // Time in milliseconds
    laps: number[]; // Array of lap times in milliseconds
};

const formatTime = (time: number) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours > 0 ? hours + ':' : '') +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 10 ? '0' : '') + milliseconds
    );
};

export default function Stopwatch({ time, laps }: StopwatchProps) {
    return (
        <div>
            <div className="stopwatch-display">
                {formatTime(time)}
            </div>
            <div className="stopwatch-laps">
                {laps.length > 0 && <h2>Laps</h2>}
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>
                            Lap {index + 1}: {formatTime(lap)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}