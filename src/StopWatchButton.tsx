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

    const allButtonsStyling = ' text-3xl rounded-full w-[12rem] h-[4rem]'
    const primaryButton = ' bg-black text-white font-bold' + allButtonsStyling
    const secondaryButton = ' text-black  border-black border-[0.2rem]' + allButtonsStyling
    const disabledButton = ' text-gray-700/70  border-gray-700/70 border-[0.2rem]' + allButtonsStyling

    // ========== RENDERING ==============
    return(
        <div id='buttons-row' className='space-x-2'>

            <button 
                className={isRunning ? 'stop-btn' + secondaryButton : 'start-btn' + primaryButton}
                id={isRunning ? 'stop-btn' : 'start-btn'}
                data-testid='start-stop-btn' 
                onClick={isRunning ? handleStop : handleStart}
            >
                {isRunning ? 'Stop' : 'Start'}
            </button>

            <button 
                className={'reset-btn' + allButtonsStyling + ' border-[0.2rem] text-white font-semibold'}                
                id='reset-btn'
                data-testid='reset-btn' 
                onClick={handleReset}
            >
                Reset
            </button>

            <button 
                className={isRunning ? primaryButton : disabledButton}
                id='lap-btn'
                data-testid='lap-btn' 
                onClick={handleLap}
                disabled={!isRunning}
            >
                Lap
            </button>
            
        </div>
    )
}

export default StopWatchButton;