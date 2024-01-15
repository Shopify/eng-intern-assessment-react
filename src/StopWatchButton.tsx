import React from 'react';

// Import the StopWatchButtonProps interface
interface StopWatchButtonProps {
    label: string; // Label for the button
    onClick: () => void; // Event handler for the button click event
    disabled?: boolean; // Boolean to disable the button
  }

// Create a StopWatchButton component that accepts the StopWatchButtonProps interface as a parameter with the label as its text
export default function StopWatchButton({ label, onClick, disabled = false }: StopWatchButtonProps) {
    return(
        <button className="stop-watch-button" onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}