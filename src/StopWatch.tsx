import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';


// This is the stopwatch, where the time is displayed and also number of laps
// We also call StopWatchButtons, which allow us to control time and laps
export default function StopWatch() {
    // Global Variables
    const [isPaused, setIsPaused] = useState<boolean>(true); // Is the timer running or paused? Initially paused
    const [currentTime, setCurrentTime] = useState<number>(0); // What is the current time? Initially 0
    const [currentLapCount, setCurrentLapCount] = useState<number>(0); // What is the current lap count? Initially 0
    const [lapTimes, setLapTimes] = useState<number[]>([]); // What are the lap times? Initially none

    useEffect(() => {
        let timer: NodeJS.Timeout;
    
        if (!isPaused) {
        // if not paused, we increment the timer by 1 second at every second
          timer = setInterval(() => {
            setCurrentTime((prevTime) => prevTime + 1);
          }, 1000);
        }
    
        return () => {
          clearInterval(timer);
        };
      }, [isPaused]);
    

    const handleStartPause = () => {
        // start or pause the stopwatch
        setIsPaused(!isPaused);
    };
    const handleReset = () => {
        // reset the stopwatch by setting current time back to 0 and current lap count to 0
        setCurrentTime(0);
        setCurrentLapCount(0);
        setIsPaused(true);
        setLapTimes([]);
    };

    const handleLap = () => {
        // record a lap by updating the lap count to one more than the previous lap count
        if (!isPaused) {
            setCurrentLapCount(currentLapCount + 1);
            setLapTimes((prevLapTimes) => [...prevLapTimes, currentTime]);
        }
    };

    const formatTime = (time: number): string => {
        // set the display variables for the time in the format hh:mm:ss
        const hour = Math.floor(time / (60 * 60))
        const minute = Math.floor(time / 60);
        const second = time % 60;
        // set the hour/minute/second string (in the case that they are only one digit)
        const hourString = hour < 10 ? (hour > 1 ? '0' + hour + ':' : '') : '' + hour + ':';
        const minuteString = minute < 10 ? '0' + minute : '' + minute;
        const secondString = second < 10 ? '0' + second : '' + second;
        return `${hourString}${minuteString}:${secondString}`;
    };

    return(
        <div style={{width: "100%"}}>
            <div className='time-lap-display'>
                {/* Time display */}
                <h1 style={{fontSize: "5rem"}}>{formatTime(currentTime)}</h1>
                {/* Lap display */}
                <h3 style={{fontSize: "2rem"}}>Current Lap: {currentLapCount} {currentLapCount == 1 ? "lap" : "laps"}</h3>
            </div>
            {/* Button Controls */}
            <StopWatchButton
                handleStartPause={handleStartPause}
                handleReset={handleReset}
                handleLap={handleLap}
                isPaused={isPaused}
            />
            {/* Lap Times - display most recent lap at the top*/}
            <ul className='lap-container'>
                {lapTimes.slice().reverse().map((lapTime, index) => (
                    <li key={index} className={`lap-card ${index === 0 ? 'most-recent-lap' : ''}`}>
                        Lap {lapTimes.length - index}: {formatTime(lapTimes.length - index - 2 < 0 ?
                            lapTimes[lapTimes.length - index - 1] :
                            lapTimes[lapTimes.length - index - 1] - lapTimes[lapTimes.length - index - 2]
                        )}
                    </li>
                ))}
            </ul>
            
        </div>
    )
}