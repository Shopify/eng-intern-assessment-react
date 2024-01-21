import React from 'react';
import '../styles/StopWatchButton.css';

type StopWatchButtonProps = {
    label: string;
    onClick: () => void;
    buttonStyle: string;
    disabled: boolean;
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ label, onClick, buttonStyle, disabled }) => {
    return (
        <button
            className={`stopwatch-button ${buttonStyle}`}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    );
};

export default StopWatchButton;
