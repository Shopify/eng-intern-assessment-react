import React from 'react'
import './StopWatchButton.css'

interface StopWatchButtonProps{
    startTimer: () => void;
    stopTimer: ()=> void;
    reset: () => void;
    lap: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ startTimer, stopTimer, reset, lap }) => {
    return (
        <div className='btnContainer'>
            <button className='button' onClick={startTimer}>
                Start
            </button>
            <button className='button' onClick={stopTimer}>
                Stop
            </button>
            <button className='button' onClick={reset}>
                Reset
            </button>
            <button className='button' onClick={lap}>
                Lap
            </button>
        </div>
    )
}

export default StopWatchButton;