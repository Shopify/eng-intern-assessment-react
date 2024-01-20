import React from "react";

/**
 * Typesafety is one of my favorite parts of any React application. Assigning types to your props is vitally important to ensure typesafety across your whole app.
 */
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
            {
                // I added an aria-disabled attribute to the lap button to make it more accessible. This is a common practice in React.
            }
            <button onClick={addLapTime} disabled={!isRunning} aria-disabled={!isRunning}>
                Lap
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
