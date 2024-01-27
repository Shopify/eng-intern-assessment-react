import React from 'react'


interface Props {
    time: number,
    handleStartTimer: () => void,
    handleStopTimer: () => void,
    handleResetTimer: () => void,
    handleNewLap: () => void,
    isRunning: boolean
};

export default function StopWatchButton({ time, handleStartTimer, handleStopTimer, handleResetTimer, handleNewLap, isRunning }: Props) {

    return (
        <div>
            {!isRunning ? (
                <>
                    <button onClick={handleResetTimer} disabled={time < 1}>Reset</button>
                    <button onClick={handleStartTimer}>Start</button>
                </>
            ) : (
                <>
                    <button onClick={handleNewLap}>Lap</button>
                    <button onClick={handleStopTimer}> Stop</button> 
                </>
            )}

        </div>
    )
}