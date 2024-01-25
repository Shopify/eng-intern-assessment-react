import React from 'react'

interface StopWatchButtonProps{
    startTimer: () => void;
    stopTimer: ()=> void;
    reset: () => void;
    lap: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ startTimer, stopTimer, reset, lap }) => {
    return (
        <div>
            <button onClick={startTimer}>
                Start
            </button>
            <button onClick={stopTimer}>
                Stop
            </button>
            <button onClick={reset}>
                Reset
            </button>
            <button onClick={lap}>
                Lap
            </button>
        </div>
    )
}

export default StopWatchButton;