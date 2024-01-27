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
    const primaryButton = ' bg-black text-white font-bold hover:bg-black/70' + allButtonsStyling // Start and enabled Lap buttons
    const secondaryButtonBlack = ' text-black border-black border-[0.23rem] font-semibold hover:bg-black/20' + allButtonsStyling // Stop button
    const secondaryButtonWhite = ' text-white border-white border-[0.2rem] font-semibold hover:bg-white/20' + allButtonsStyling // Reset button
    const disabledButton = ' text-gray-700/70  border-gray-700/70 border-[0.22rem]' + allButtonsStyling // Disabled Lap button

    // ========== RENDERING ==============
    return(
        <div id='buttons-row' className='space-x-2'>

            <button 
                className={isRunning ? 'stop-btn' + secondaryButtonBlack : 'start-btn' + primaryButton}
                id={isRunning ? 'stop-btn' : 'start-btn'}
                data-testid='start-stop-btn' 
                onClick={isRunning ? handleStop : handleStart}
            >
                {isRunning ? 'Stop' : 'Start'}
            </button>

            <button 
                className={'reset-btn' + secondaryButtonWhite}                
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