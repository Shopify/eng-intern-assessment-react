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
{/* 
    2 UI states:
    1. When the stopwatch is not running, allow the user to either Reset or Start the stopwatch 
    2. When the stopwatch is running, allow the user to either create a Lap or Stop the stopwatch 
*/}
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