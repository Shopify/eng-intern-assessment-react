import React from 'react';

// Define the props for the StopWatchButton component
interface StopWatchButtonProps {
    onClick: () => void; // Function to be called on button click
    label: string; // Label to be displayed on the button
}

// StopWatchButton component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>{label}</button>
    );
}

export default StopWatchButton;
