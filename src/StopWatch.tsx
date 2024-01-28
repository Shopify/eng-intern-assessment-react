import React from 'react'

interface StopwatchTimeProps {
    seconds: number;
}

export default function StopWatch({seconds}:StopwatchTimeProps) {
    return(
        <div className='StopwatchTime'>
            <div style={swStyle}>Stopwatch</div>
            <div style={swStyle}>Time: {formatHMS(seconds)}</div>
        </div>
    )
}

export function formatHMS (timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds) % 60;
    const fraction = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 100);

    const formattedTime = `${
        String(hours).padStart(2, "0")}:${
        String(minutes).padStart(2, "0")}:${
        String(seconds).padStart(2, "0")}.${
        String(fraction).padStart(2, "0")}`;

    return formattedTime;
};

const swStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    fontSize: "32px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px', // Adjust the value based on your preference      
}