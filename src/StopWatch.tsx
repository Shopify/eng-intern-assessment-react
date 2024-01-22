import React, { useContext } from 'react'
import StopWatchButton from './StopWatchButton';
import { WatchContext } from './WatchContext';
import "../styles/StopWatch.css"

// Function to format the time as HH:MM:SS:msmsms
export const formatTime = (timeInMilliseconds: number) => {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}; 

export default function StopWatch() {
    const { elapsedTime, laps, slowestLap, fastestLap } = useContext(WatchContext)    

    return(
        <div className='stopwatch'>
            {/* Displaying the formatted elapsed time */}
            <div className='time-display'>{formatTime(elapsedTime)}</div>

            {/* Stopwatch control buttons */}
            <StopWatchButton />

            {/* Container for displaying lap times */}
            <div className='lap-times'>
                {laps.map((lap, index) => (
                    <div
                        key={index}
                        className={`${lap.elapsedTime === slowestLap ? 'slowest-lap' : ''} ${lap.elapsedTime === fastestLap ? 'fastest-lap' : ''}`}
                    >
                        Lap {index + 1} {formatTime(lap.elapsedTime)}
                    </div>
                ))}
            </div>
        </div>
    )
}
