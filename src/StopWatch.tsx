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
        if (!isPaused) {
            setCurrentLapCount(currentLapCount + 1);
        }
    };
    // set the display variables for the time in the format mm:ss
    var minute = Math.floor(currentTime / 60)
    var second = currentTime % 60
    var minuteString, secondString

    minute < 10 ? minuteString = "0" + minute : minuteString = minute
    second < 10 ? secondString = "0" + second : secondString = second

    return(
        <div style={{width: "100%"}}>
            <div className='time-lap-display'>
                <h1 style={{fontSize: "5rem"}}>{minuteString}:{secondString}</h1>
                <h3 style={{fontSize: "2rem"}}>Current Lap: {currentLapCount} {currentLapCount == 1 ? "lap" : "laps"}</h3>
            </div>
            
            <StopWatchButton
                handleStartPause={handleStartPause}
                handleReset={handleReset}
                handleLap={handleLap}
                isPaused={isPaused}
            />
        </div>
    )
}