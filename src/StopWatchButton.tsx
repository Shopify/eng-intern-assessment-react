import React, { MouseEventHandler } from 'react'

interface StopWatchButtonProps {
    handleStart: MouseEventHandler<HTMLButtonElement>;
    handleStop: MouseEventHandler<HTMLButtonElement>;
    handleReset: MouseEventHandler<HTMLButtonElement>;
    handleLap: MouseEventHandler<HTMLButtonElement>;
  }

export default function StopWatchButton({ handleStart, handleStop, handleReset, handleLap}: StopWatchButtonProps) {
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button 
                style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'green', color: '#FBF8EF'}}
                onClick={handleStart}>
                START
            </button>
            <button 
                style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'orange', color: '#FBF8EF'}}
                onClick={handleStop}>
                STOP
            </button>
            <button 
                style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'red', color: '#FBF8EF'}}
                onClick={handleReset}>
                RESET
            </button>
            <button 
                style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'blue', color: '#FBF8EF'}}
                onClick={handleLap}>
                LAP
            </button>
        </div>
    )
}