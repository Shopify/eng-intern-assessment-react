import React from "react";

interface Props {
    setIsRunning: (isRunning: boolean) => void;
    isRunning: boolean;
    addLapTime: () => void;
    reset: () => void;
}

export default function StopWatchButton({
    setIsRunning,
    isRunning,
    addLapTime,
    reset,
}: Props) {
    return (
        <div>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={addLapTime} disabled={!isRunning}>
                Lap
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
