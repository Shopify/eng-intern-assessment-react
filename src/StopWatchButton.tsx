import React, { MouseEventHandler } from 'react'

interface StopWatchButtonProps {
    handleStart: MouseEventHandler<HTMLButtonElement>;
    handleStop: MouseEventHandler<HTMLButtonElement>;
    handleReset: MouseEventHandler<HTMLButtonElement>;
    handleLap: MouseEventHandler<HTMLButtonElement>;
  }

export default function StopWatchButton({ handleStart, handleStop, handleReset, handleLap}: StopWatchButtonProps) {
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 25 }}>
            <button 
                style={{ 
                    margin: '0 10px', 
                    padding: '10px 20px', 
                    backgroundColor: 'green', 
                    color: '#FBF8EF', 
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#006400'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'green'}
                onClick={handleStart}>
                Start
            </button>
            <button 
                style={{ 
                    margin: '0 10px', 
                    padding: '10px 20px', 
                    backgroundColor: 'orange', 
                    color: '#FBF8EF', 
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#cc7a00'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'orange'}
                onClick={handleStop}>
                Stop
            </button>
            <button 
                style={{ 
                    margin: '0 10px', 
                    padding: '10px 20px', 
                    backgroundColor: 'red', 
                    color: '#FBF8EF', 
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b30000'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'red'}
                onClick={handleReset}>
                Reset
            </button>
            <button 
                style={{ 
                    margin: '0 10px', 
                    padding: '10px 20px', 
                    backgroundColor: 'blue', 
                    color: '#FBF8EF', 
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0000cc'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'blue'}
                onClick={handleLap}>
                Lap
            </button>
        </div>
    )
}