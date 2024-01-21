import React from 'react';

type StopWatchButtonProps = {
    label: string;
    onClick: () => void; 
    // Function to be called when the button is clicked
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
};

export default StopWatchButton;
