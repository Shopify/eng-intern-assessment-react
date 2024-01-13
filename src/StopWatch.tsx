import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';

// Enumeration for different button types for the stopwatch
export enum ButtonType {
    Start = 'Start',
    Stop = 'Stop',
    Pause = 'Pause',
    Resume = 'Resume',
    Reset = 'Reset',
    Lap = 'Lap'
}

// Props interface for the StopWatchButton component
export interface StopWatchButtonProps {
    type: ButtonType;
    onClick: () => void;
}

// Interface for time values in minutes, seconds, and milliseconds
interface TimeValues {
    Minute: number;
    Second: number;
    Millisecond: number;
}

// Interface for keeping track of lap records
interface LapRecord {
    lapNumber: number;
    totalTime: string;
    lapTime: string;
}

// Stopwatch component
export default function StopWatch() {
    // State variables for the stopwatch functionality
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [stopWatchRunning, setStopWatchRunning] = useState<boolean>(false);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);
    const [millisecond, setMillisecond] = useState<number>(0);
    const [lapTime, setLapTime] = useState<number>(0)
    const [lapRecords, setLapRecords] = useState<LapRecord[]>([]);
    const [displayTime, setDisplayTime] = useState<boolean>(true);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Function to handle the stop action
    const handleStop = () => {
        setStopWatchRunning(false);
        setDisplayTime(false);  // Hide time display when stopped
    };

    // Function to handle the pause action
    const handlePause = () => {
        setIsPaused(true);
    };
    
    // Function to handle the resume action
    const handleResume = () => {
        setIsPaused(false);
    };
    
    // Function to handle the start action
    const handleStart = () => {
        setStopWatchRunning(true);
        setDisplayTime(true);  // Show time display when started
        setLapTime(currentTime); 
        setIsPaused(false)
    };
    
    // Function to handle the reset action
    const handleReset = () => {
        setCurrentTime(0);
        setLapTime(0);
        setStopWatchRunning(false);
        setLapRecords([])
    };

    // Function to handle the lap action
    const handleLap = () => {
        const currentLapTime = currentTime - lapTime;
        setLapTime(currentTime); // Update lapTime for the next lap

        // Format total and lap times to be displayed
        const formattedTotalTime = `${formatTime(minute)}:${formatTime(second)}:${formatTime(millisecond)}`;
        const formattedLapTime = formatLapTime(currentLapTime);

        // Add new lap record
        setLapRecords(prevLaps => [...prevLaps, { lapNumber: prevLaps.length + 1, totalTime: formattedTotalTime, lapTime: formattedLapTime }]);
    };

    // Function to update time values based on the current time
    const updatedTimeValues = (): TimeValues => {
        return {
            "Minute": Math.floor((currentTime % 360000) / 6000),
            "Second": Math.floor((currentTime % 6000) / 100),
            "Millisecond": currentTime % 100
        };
    };

    // Function to format time values as two digits
    const formatTime = (time:number) => {
        return time.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
    }

    // Function to format lap times
    const formatLapTime = (lapTime: number): string => {
        return `${formatTime(Math.floor((lapTime % 360000) / 6000))}:${formatTime(Math.floor((lapTime % 6000) / 100))}:${formatTime(lapTime % 100)}`;
    }

    // Function to generate the time string to be displayed
    const generateTimeString = () => {
        return `${formatTime(minute)}:${formatTime(second)}:${formatTime(millisecond)}`
    }

    // useEffect hook to update the stopwatch time
    useEffect(() => {
        let intervalId: NodeJS.Timer;

        // Update time every 10ms if stopwatch is running and not paused
        if (stopWatchRunning && !isPaused) {
          intervalId = setInterval(() => {
            setCurrentTime(currentTime + 1)
        }, 10);
        }

        // Update minute, second, and millisecond based on currentTime
        const { Minute, Second, Millisecond } = updatedTimeValues();
        setMinute(Minute);
        setSecond(Second);
        setMillisecond(Millisecond);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [stopWatchRunning, isPaused, currentTime]);

    // Render the stopwatch component
    return(
        <div className='stopwatch'>
            <div className='timer'>
                {displayTime && <p className='timer-time'>{generateTimeString()}</p>}
            </div>
            <div className='stopwatch-buttons'>
                {/* Render buttons based on the state of the stopwatch */}
                {!stopWatchRunning && <StopWatchButton type={ButtonType.Start} onClick={handleStart}/>}
                {stopWatchRunning && <StopWatchButton type={ButtonType.Resume} onClick={handleResume}/>}
                {stopWatchRunning && <StopWatchButton type={ButtonType.Pause} onClick={handlePause}/>}
                
                <StopWatchButton type={ButtonType.Stop} onClick={handleStop}/>
                <StopWatchButton type={ButtonType.Reset} onClick={handleReset}/>
                {stopWatchRunning && <StopWatchButton type={ButtonType.Lap} onClick={handleLap}/>}
            </div>
            <div className='lap-times'>
                <div className='lap-time-header'>
                    {/* Headers for lap times */}
                    <span>Lap Number</span>
                    <span>Total Time</span>
                    <span>Lap Time</span>
                </div>
                <div data-testid="lap-list">
                {/* Map each lap record to a row in the lap list */}
                {lapRecords.map((lap, index) => (
                    <div key={index} className='lap-time-row'>
                        <span>{lap.lapNumber}</span>
                        <span>{lap.totalTime}</span>
                        <span>{lap.lapTime}</span>
                    </div>
                ))}

                </div>
            </div>
        </div>
    )
}
