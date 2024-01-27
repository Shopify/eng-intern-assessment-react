import React from 'react'

// Define the props for the StopWatchButton component
type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset';
    onClick: () => void;
    timerOn?: boolean;
};
  
  export default function StopWatchButton({ type, onClick, timerOn }: StopWatchButtonProps) {
    // Determine the button text based on the type
    let buttonText;
    switch(type) {
        case 'start':
            buttonText = 'Start';
            break;
        case 'stop':
            buttonText = 'Stop';
            break;
        case 'lap':
            buttonText = 'Record Lap';
            break;
        case 'reset':
            buttonText = 'Reset';
            break;
        default: buttonText = '';
    }

    return(
        <button 
            onClick={onClick} 
            // Disable the lap button when the timer is stopped
            disabled={!timerOn && type === 'lap'}
            >
            {buttonText}
        </button>
    )
}