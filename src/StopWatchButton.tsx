import React from 'react';

// Max laps that can be recorded
const maxLaps = 25;

type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset';
    onClick?: () => void;
    timerOn?: boolean;
    time?: number;
    lapTimes?: number[];
};

export default function StopWatchButton({ type, onClick, timerOn, time, lapTimes }: StopWatchButtonProps) {
    // map button types to display text and tabIndex
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

    return (
        <button 
            onClick={onClick} 
            aria-label={type}
            tabIndex={tabIndex}
            disabled={(type === 'lap' && isLapDisabled) || (type === 'reset' && isResetDisabled)}
        >
            {lapTimes && lapTimes.length >= maxLaps && timerOn && type === 'lap' ? "Maximum laps reached" : buttonText}
        </button>
    );
}