import React from 'react'
import './styles/StopWatchButton.css'


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
        <div className='stopwatch-controls'>
            {!isRunning ? (
                <div className='stopwatch-controls'>
                    <button className='stopwatch-button' onClick={handleResetTimer} disabled={time < 1}>Reset</button>
                    <button className='stopwatch-button start-button' onClick={handleStartTimer}>Start</button>
                </div>
            ) : (
                <div className='stopwatch-controls'>
                    <button className='stopwatch-button' onClick={handleNewLap}> Lap </button>
                    <button className='stopwatch-button stop-button' onClick={handleStopTimer}> Stop</button> 
                </div>
            )}

        </div>
    )
}