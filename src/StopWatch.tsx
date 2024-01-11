import React from 'react'

interface StopWatchProps {
    time: number
}

export default function StopWatch({ time }: StopWatchProps) {
    const minutes = Math.floor(time / 60000).toString().padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0"); 
    const milliseconds = ((time % 1000) / 10).toString().padStart(2, "0");

    return(
        <div>{`${minutes}:${seconds}:${milliseconds}`}</div>
    )
}