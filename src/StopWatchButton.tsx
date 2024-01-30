import React, { useState } from 'react';

// Max number of laps that can be recorded
const maxLaps = 25;

type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset';
    onClick?: () => void;
    timerOn?: boolean;
    time?: number;
    lapTimes?: number[];
};

export default function StopWatchButton({ type, onClick, timerOn, time, lapTimes }: StopWatchButtonProps) {
    // Map button types to display text and tabIndex
    const buttonConfig = {
        'start': { text: 'Start', tabIndex: 1 },
        'stop': { text: 'Stop', tabIndex: 2 },
        'lap': { text: 'Record Lap', tabIndex: 3 },
        'reset': { text: 'Reset', tabIndex: 4 }
    };

    // Extract buttonText and tabIndex based on the type
    const { text: buttonText, tabIndex } = buttonConfig[type] || { text: '', tabIndex: 0 };

    // Determine whether the lap or reset buttons should be disabled
    const isLapDisabled = !timerOn || (lapTimes && lapTimes.length >= maxLaps);
    const isResetDisabled = time === 0;
    const [isFlashing, setIsFlashing] = useState(false);

    // Function to handle click and apply the flashing effect
    const handleLapClick = () => {
        if (onClick && type === 'lap') {
            onClick();
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 200); // Flash for 200ms
        }
    };

    // Apply the flashing style if the button is in the flashing state
    const buttonStyle = isFlashing ? { borderColor: 'blue', borderWidth: '2px', borderStyle: 'solid' } : {};

    return (
        <button 
        onClick={type === 'lap' ? handleLapClick : onClick} 
        aria-label={type}
        tabIndex={tabIndex}
        disabled={(type === 'lap' && isLapDisabled) || (type === 'reset' && isResetDisabled)}
        style={buttonStyle}
    >
        {lapTimes && lapTimes.length >= maxLaps && timerOn && type === 'lap' ? "Maximum laps reached" : buttonText}
    </button>
    );
}