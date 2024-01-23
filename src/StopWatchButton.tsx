import React from "react";

interface StopwatchButtonProps {
    onLap: () => void;
    onStartStop: () => void;
    onReset: () => void;
    isStart: boolean;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
    onLap,
    onStartStop,
    onReset,
    isStart,
}) => {
    return (
        <div>
            <button onClick={onStartStop}>{isStart ? "Start" : "Stop"}</button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onLap}>Lap</button>
        </div>
    );
};

export default StopwatchButton;
