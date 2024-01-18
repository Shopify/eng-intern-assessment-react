import React, { useState, useEffect} from 'react'
import ResetButton from './buttons/ResetButton';
import StartButton from './buttons/StartButton';
import StopButton from './buttons/StopButton';
import SetLapButton from './buttons/SetLapButton';
import useStopwatch from './hooks/useStopwatch';

export default function StopWatch() {

    const { time, handleStart, handleStop, handleReset } = useStopwatch();
    const [laps, setLaps] = useState<number[]>([]);

    const handleLap = (): void => {
        setLaps(prevLaps => [...prevLaps, time]); // update with the current time
    };

    const formatTime = (time: number): string => {
        // time is in miillseconds so we have to floor the resulting value 
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const centiseconds = Math.floor((time / 10) % 100);
    
        const formattedMinutes = ("0" + minutes).slice(-2);
        const formattedSeconds = ("0" + seconds).slice(-2);
        const formattedCentiseconds = ("0" + centiseconds).slice(-2);
    
        return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
    };

    // render laps as a function that is always called in the return of the react component
    const renderLaps = (): JSX.Element[] => {
        return laps.map((lap, index) => (
            <li key={index}>
                Lap {index + 1}: {formatTime(lap)}
            </li>
        ));
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <StartButton onStart={handleStart}> Start </StartButton>
            <StopButton onStop={handleStop}> Stop </StopButton>
            <ResetButton onReset={handleReset}> Reset </ResetButton>
            <SetLapButton setLap={handleLap}>Lap</SetLapButton>
            {laps.length > 0 && (<ul> {renderLaps()} </ul> )}
        </div>
    );
}