import React from 'react';

interface StopwatchButtonProps {
    action: () => void; // Function to execute on button click
    disabled?: boolean; // Optional flag to disable the button
    label: string; // Text label for the button
}

/**
 * A reusable button component for the stopwatch controls.
 * 
 * It receives an action function to be executed on click, an optional disabled
 * flag to enable or disable the button, and a label for the button's text.
 * This component enhances reusability and reduces redundancy in rendering
 * similar buttons for different stopwatch actions.
 */
const StopwatchButton: React.FC<StopwatchButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = 
    ({ action, disabled = false, label, ...props }) => {
    return (
        <button onClick={action} disabled={disabled} {...props}>{label}</button>
    );
};


export default StopwatchButton;
