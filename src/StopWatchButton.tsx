import React from 'react'


// Interface for StopWatchButton props
interface StopWatchButtonProps {
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
    isRunning: boolean;
}


const StopWatchButton: React.FC<StopWatchButtonProps> = ({ handleStart, handleStop, handleReset, handleLap, isRunning }) => {
    // Component for the Start/Stop, Reset, and Lap buttons

    
    // ========== RENDERING ==============
    return(
        <>
            <button 
                className={isRunning ? 'stop-btn' : 'start-btn'}
                id={isRunning ? 'stop-btn' : 'start-btn'}
                data-testid='start-stop-btn' 
                onClick={isRunning ? handleStop : handleStart}
            >
                {isRunning ? 'Stop' : 'Start'}
            </button>

            <button 
                className='reset-btn'
                id='reset-btn'
                data-testid='reset-btn' 
                onClick={handleReset}
            >
                Reset
            </button>

            <button 
                className='lap-btn'
                id='lap-btn'
                data-testid='lap-btn' 
                onClick={handleLap}
                disabled={!isRunning}
            >
                Lap
            </button>
            
        </>
    )
}

export default StopWatchButton;