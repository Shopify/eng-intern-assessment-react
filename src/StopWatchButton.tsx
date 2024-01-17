import React from 'react'

// Interface for StopWatchButtonConfig
interface IProps {
    stopped: boolean;
    laps: number[];
    currentLapTime: number;
    setTime: (newTime : number) => void;
    setStopped: (newState : boolean) => void;
    setLaps: (newLaps: number[]) => void;
    setCurrentLapTime: (newLapTime : number) => void;
}

// Contains Start, Stop, Reset, Lap Buttons
export default function StopWatchButton({
    stopped,
    laps,
    currentLapTime,
    setTime,
    setStopped,
    setLaps,
    setCurrentLapTime
} : IProps) {

    // Stop stop watch if watch is running
    // Start stop watch if watch is paused
    const stopStartWatch = () => {
        setStopped(!stopped)
    }

    // Reset stop watch, and resets the laps, also stops the watch
    const resetStopWatch = () => {
        setTime(0);
        setCurrentLapTime(0);
        setLaps([]);
        setStopped(true);
    }

    // Saves the current lap to the laps, then reset the current lap time
    const lapStopWatch = () => {
        const currentLapTimeSaved = structuredClone(currentLapTime);
        const newLapTimes = [...laps];
        newLapTimes.push(currentLapTimeSaved);

        setCurrentLapTime(0);
        setLaps(newLapTimes);
    }

    if (stopped) {
        return(
            <div className='ButtonContainer'>
                <div className='Button' onClick={resetStopWatch}>Reset</div>
                <div className='Button StartButton' onClick={stopStartWatch}>Start</div> 
            </div>
        )
    } else {
        return(
            <div className='ButtonContainer'>
                <div className='Button' onClick={lapStopWatch}>Lap</div>
                <div className='Button StopButton' onClick={stopStartWatch}>Stop</div> 
            </div>
        )
    }
}