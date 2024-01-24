import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'


export default function StopWatch() {
    
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);  
    
    const formatTime = (timeInMs : number): string => {
        const minutes = Math.floor(timeInMs / (60 * 1000));
        const seconds = Math.floor((timeInMs % (60 * 1000)) / 1000);
        const ms = timeInMs % 1000;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    };

    return (
        <div>
            <div>{formatTime(elapsedTime)}</div>
            <StopWatchButton type="Start" isDisabled={false}/>
            <StopWatchButton type="Stop" isDisabled={true}/>
            <StopWatchButton type="Reset" isDisabled={true}/>
            <StopWatchButton type="Lap" isDisabled={true}/>
        </div>
    )
}