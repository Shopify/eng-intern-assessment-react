import React from 'react'


// focused only on the timing portion
export default function StopWatch({ time, laps }: { time: number; laps: number[] }) {
    const formatTime = (milliseconds: number): string => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(2);
        return `${String(minutes).padStart(2, '0')}:${seconds}`;
      };
    
    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <ul>
            {laps.map((lap, index) => (
                <li key={index}>{formatTime(lap)}</li>
            ))}
            </ul>
        </div>
    );
}