import React from 'react'

// Define the props for the StopWatchButton component
type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset';
    onClick?: () => void;
    timerOn?: boolean;
};
  
  export default function StopWatchButton({ type, onClick, timerOn }: StopWatchButtonProps) {
    // Determine the button text based on the type
    let buttonText;
    let tabIndex;
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
        default: buttonText = '';
    }

    return(
        <button 
            onClick={onClick} 
            aria-label={type}
            tabIndex={tabIndex}
            // Disable the lap button when the timer is stopped
            disabled={!timerOn && type === 'lap'}
            >
            {buttonText}
        </button>
    )
}