import React from 'react'
import StopWatchButton from './StopWatchButton'

// initialize the props interface
interface Props {
    milliseconds: number;
    lapTime: number;
    watchStarted: boolean;

    handleStart: () => void;
    handleLap: () => void;
    handleReset: () => void;

    displayTime: (time: number) => React.JSX.Element;
    displayLaps: () => React.JSX.Element;

}

export default function StopWatch({
    milliseconds,
    lapTime,
    watchStarted,

    handleStart,
    handleLap,
    handleReset,

    displayTime,
    displayLaps }: Props) {

    return (
        <>
            <h3>{displayTime(milliseconds)}</h3>

            {/* only display the lap time if we started a lap */}
            <div>{lapTime !== 0 && <span>{displayTime(lapTime)}</span>}</div>


            {/* start / stop button */}
            <StopWatchButton text={!watchStarted ? "Start" : "Stop"} handleClick={handleStart} />

            {/* You can only lap when the watch is currently counting */}
            <StopWatchButton text="Lap" disabled={!watchStarted} handleClick={handleLap} />

            {/* You can only reset when timer started and paused */}
            <StopWatchButton text="Reset" disabled={milliseconds === 0 || watchStarted} handleClick={handleReset} />

            {/* Display the laps */}
            <ul>
                {displayLaps()}
            </ul>
        </>
    )
}
