import React from 'react';

// Props type definition for StopWatchButton component
type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset'; // Button type to determine its functionality and label
    onClick: () => void; // Click handler function
    disabled?: boolean; // Optional disabled state
};

// Functional component for rendering buttons with specific functionalities in the stopwatch
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ type, onClick, disabled = false }) => {
    // Mapping button type to its display text
    const buttonTextMap = {
        start: 'Start',
        stop: 'Stop',
        lap: 'Record Lap',
        reset: 'Reset'
    };

    return (
        <button onClick={onClick} disabled={disabled} aria-label={type}>
            {buttonTextMap[type]}
        </button>
    );
};

export default StopWatchButton;
