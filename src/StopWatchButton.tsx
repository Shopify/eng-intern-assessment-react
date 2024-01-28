import React from 'react'

const maxLaps = 25;

// Define the props for the StopWatchButton component
type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset';
    onClick?: () => void;
    timerOn?: boolean;
    time?: number;
    lapTimes?: number[];
};
  
  export default function StopWatchButton({ type, onClick, timerOn, time, lapTimes }: StopWatchButtonProps) {
    // Determine the button text based on the type and add corresponding tabIndex
    let buttonText, tabIndex;
    switch(type) {
        case 'start':
            buttonText = 'Start';
            tabIndex = 1;
            break;
        case 'stop':
            buttonText = 'Stop';
            tabIndex = 2;
            break;
        case 'lap':
            buttonText = 'Record Lap';
            tabIndex = 3;
            break;
        case 'reset':
            buttonText = 'Reset';
            tabIndex = 4;
            break;
        default: 
        buttonText = '';
        tabIndex = 0;
    }
    // Determine whether the reset or lap buttons should be disabled
    const isLapDisabled = !timerOn || (lapTimes && lapTimes.length === 25);
    const isResetDisabled = time === 0;
    return(
        <button 
            onClick={onClick} 
            aria-label={type}
            tabIndex={tabIndex}
            // Disable the lap button when the timer is stopped. Disable reset button when the timer is already reset or when the max number of lap times is reached
            disabled={(type === 'lap' && isLapDisabled) || (type === 'reset' && isResetDisabled)}
            >
            {/* Display the button text, otherwise display the max laps reached message when max number is reached */}
            {lapTimes && lapTimes.length === maxLaps && timerOn && type === 'lap' ? "Maximum laps reached" : buttonText}
        </button>
    )
}