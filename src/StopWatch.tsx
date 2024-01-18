import React, { useState, useEffect} from 'react'
import ResetButton from './buttons/ResetButton';
import StartButton from './buttons/StartButton';
import StopButton from './buttons/StopButton';
import SetLapButton from './buttons/SetLapButton';
import useStopwatch from './hooks/useStopwatch';

/**
 * @author Harsh Kothari
 * @returns a display of the time, all the stop watch buttons, and the laps if there are any
 */
export default function StopWatch() {

    const { time, handleStart, handleStop, handleReset, handleLaps, laps } = useStopwatch();


    /**
     * takes time  and returns formatted time like this: 00:00:00 in minutes, seconds and centiseconds
     * @param time (in millseconds)
     * @returns formatted time
     */
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
 
    /**
     * always called in the return of the react component
     * @returns an array of <li> tags, each with the lap number and formatted time
     */
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
            <SetLapButton setLap={handleLaps}>Lap</SetLapButton>
            {laps.length > 0 && (<ul> {renderLaps()} </ul> )}
        </div>
    );
}