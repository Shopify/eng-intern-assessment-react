import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';

// This is the stopwatch, where the time is displayed and also number of laps
export default function StopWatch() {
    // Global Variables
    const [isPaused, setIsPaused] = useState<boolean>(true); // Is the timer running or paused? Initially paused
    const [currentTime, setCurrentTime] = useState<number>(0); // What is the current time? Initially 0
    const [currentLapCount, setCurrentLapCount] = useState<number>(0); // What is the current lap count? Initially 0

    useEffect(() => {
        let timer: NodeJS.Timeout;
    
        if (!isPaused) {
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
    };

    const handleLap = () => {
        // record a lap by updating the lap count to one more than the previous lap count
        setCurrentLapCount(currentLapCount + 1);
    };

    return(
        <div>
            <div>Current Time: {currentTime} seconds</div>
            <div>Current Lap: {currentLapCount} laps</div>
            <StopWatchButton
                handleStartPause={handleStartPause}
                handleReset={handleReset}
                handleLap={handleLap}
                isPaused={isPaused}
            />
        </div>
    )
}