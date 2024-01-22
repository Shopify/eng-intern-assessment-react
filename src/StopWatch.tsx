import React, { useContext, useState } from 'react'
import StopWatchButton from './StopWatchButton';
import { WatchContext } from './WatchContext';

export default function StopWatch() {
    const { time, milliseconds, laps, slowestLap, fastestLap } = useContext(WatchContext)

    // Function to format the time as HH:MM:SS
    const formatTime = (seconds: number, milliseconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    };     

    return(
        <div className='stopwatch'>
            <div>{formatTime(time, milliseconds)}</div>
            <StopWatchButton />
            <div className='lap-times'>
            {laps.map((lap, index) => (
                <div
                key={index}
                style={{
                  color: lap.time === slowestLap ? 'red' : lap.time === fastestLap ? 'green' : 'black',
                }}
              >
                    {formatTime(lap.time, lap.milliseconds)}
                </div>
            ))}
            </div>
        </div>
    )
}