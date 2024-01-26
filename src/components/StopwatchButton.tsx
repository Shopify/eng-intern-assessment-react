import React from 'react';

type StopwatchButtonProps = {
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onStart, onStop, onReset, onLap }) => {
    return (
        <div>
            <button onClick={onStart}>Start</button>
            <button onClick={onStop}>Stop</button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onLap}>Lap</button>
        </div>
    );
};

export default StopwatchButton;