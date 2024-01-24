import React from 'react';



interface StopwatchButtonProps {
    onStart: () => void;   // onStart function is called when the "Start" button is clicked
    onStop: () => void;    // onStop function is called when the "Stop" button is clicked
    onReset: () => void;   // onReset function is called when the "Reset" button is clicked
    onLap: () => void;     // onLap function is called when the "Lap" button is clicked
    laps: number[];        // laps array contains recorded lap times
}

// StopwatchButton functional component receives onStart, onStop, onReset, onLap functions, and laps array as props
const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onStart, onStop, onReset, onLap, laps }) => {
    return (
        <div>
            <button onClick={onStart}>Start</button>
            <button onClick={onStop}>Stop</button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onLap}>Lap</button>

            {/* Display laps */}
            {laps.length > 0 && (
                <div className = "laps-list" data-testid = "laps-list">
                    <ul>
                        {laps.map((lap, index) => (
                            <li key={index} className = "laps-list-item">
                                {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
                                {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:
                                {("0" + ((lap / 10) % 100)).slice(-2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default StopwatchButton;
