import React from 'react';

type StopWatchButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
};

// StopWatchButton component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ label, onClick, disabled = false }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default StopWatchButton;
