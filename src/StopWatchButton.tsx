import React from 'react'

interface StopWatchButtonProps{
    onStart: () => void;
    onStop: ()=> void;
    onReset: () => void;
    onLap: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onStart, onStop, onReset, onLap }) => {
    return (
        <div>
            <button onClick={onStart}>
                Start
            </button>
            <button onClick={onStop}>
                Stop
            </button>
            <button onClick={onReset}>
                Reset
            </button>
            <button onClick={onLap}>
                Lap
            </button>
        </div>
    )
}

export default StopWatchButton;