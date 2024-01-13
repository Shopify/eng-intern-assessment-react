import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';

export enum ButtonType {
    Start = 'Start',
    Stop = 'Stop',
    Pause = 'Pause',
    Resume = 'Resume',
    Reset = 'Reset',
    Lap = 'Lap'
}

export interface StopWatchButtonProps {
    type: ButtonType;
    onClick: () => void;
}

interface TimeValues {
    Minute: number;
    Second: number;
    Millisecond: number;
}

interface LapRecord {
    lapNumber: number;
    totalTime: string;
    lapTime: string;
}

export default function StopWatch() {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [stopWatchRunning, setStopWatchRunning] = useState<boolean>(false);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);
    const [millisecond, setMillisecond] = useState<number>(0);
    const [lapTime, setLapTime] = useState<number>(0)
    const [lapRecords, setLapRecords] = useState<LapRecord[]>([]);
    const [displayTime, setDisplayTime] = useState<boolean>(true);
    const [isPaused, setIsPaused] = useState<boolean>(false);


    // Handler functions
    const handleStop = () => {
        setStopWatchRunning(false);
        setDisplayTime(false);  // Hide time display when stopped
    };

    const handlePause = () => {
        setIsPaused(true);
    };
    
    const handleResume = () => {
        setIsPaused(false);
    };
    
    const handleStart = () => {
        setStopWatchRunning(true);
        setDisplayTime(true);  // Show time display when started
        setLapTime(currentTime); 
        setIsPaused(false)
    };
    
    const handleReset = () => {
        setCurrentTime(0);
        setLapTime(0);
        setStopWatchRunning(false);
        setLapRecords([])
    };
    const handleLap = () => {
        const currentLapTime = currentTime - lapTime;
        setLapTime(currentTime); // Update lapTime for the next lap
    
        // Format total and lap times
        const formattedTotalTime = `${formatTime(minute)}:${formatTime(second)}:${formatTime(millisecond)}`;
        const formattedLapTime = `${formatTime(Math.floor((currentLapTime % 360000) / 6000))}:${formatTime(Math.floor((currentLapTime % 6000) / 100))}:${formatTime(currentLapTime % 100)}`;
    
        // Add new lap record
        setLapRecords(prevLaps => [...prevLaps, { lapNumber: prevLaps.length + 1, totalTime: formattedTotalTime, lapTime: formattedLapTime }]);
    };


    const updatedTimeValues = (): TimeValues => {
        return {
            "Minute": Math.floor((currentTime % 360000) / 6000),
            "Second": Math.floor((currentTime % 6000) / 100),
            "Millisecond": currentTime % 100
        };
    };

    const formatTime = (time:number) => {
        return time.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
    }

    const generateTimeString = () => {
        return `${formatTime(minute)}:${formatTime(second)}:${formatTime(millisecond)}`
    }

    useEffect(() => {
        let intervalId: NodeJS.Timer;
        if (stopWatchRunning && !isPaused) {
          intervalId = setInterval(() => {
            setCurrentTime(currentTime + 1)

        }, 10);
        }
        const { Minute, Second, Millisecond } = updatedTimeValues();
        setMinute(Minute);
        setSecond(Second);
        setMillisecond(Millisecond);        
        return () => clearInterval(intervalId);
    }, [stopWatchRunning, isPaused, currentTime]);


    return(
        <div className='stopwatch'>
            <div className='timer'>
                {displayTime && <p className='timer-time'>{generateTimeString()}</p>}
            </div>
            <div className='stopwatch-buttons'>
                {!stopWatchRunning && <StopWatchButton type={ButtonType.Start} onClick={handleStart}/>}
                {stopWatchRunning && <StopWatchButton type={ButtonType.Resume} onClick={handleResume}/>}
                {stopWatchRunning && <StopWatchButton type={ButtonType.Pause} onClick={handlePause}/>}
                
                <StopWatchButton type={ButtonType.Stop} onClick={handleStop}/>
                <StopWatchButton type={ButtonType.Reset} onClick={handleReset}/>
                {stopWatchRunning && <StopWatchButton type={ButtonType.Lap} onClick={handleLap}/>}
            </div>
            <div className='lap-times'>
                <div className='lap-time-header'>
                    <span>Lap Number</span>
                    <span>Total Time</span>
                    <span>Lap Time</span>
                </div>
                <div data-testid="lap-list">
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