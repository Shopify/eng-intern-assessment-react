import React from 'react'

interface StopWatchProps {
    time: number
}

export default function StopWatch({ time }: StopWatchProps) {
    return (
        <div>{formatTime(time)}</div>
    )
}

/**
 * Converts a time measured in milliseconds to "hh:mm:ss" 
 * formatted string 
 * 
 * @param time in milliseconds 
 * @returns time as a "hh:mm:ss" formatted string 
 */
function formatTime(time: number): string {
    const hours = Math.floor(time / 3600000).toString().padStart(2, "0"); 
    const minutes = Math.floor(time / 60000).toString().padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0"); 
    
    return `${hours}:${minutes}:${seconds}`;
}