import React from 'react';
import '../styles/StopWatchButton.css';

interface ButtonProps {
    onClick: () => void;
    label: string;
};

const StopWatchButton: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <button className="watch-button" onClick={ onClick }>
            { label }
        </button>
    );
};

export default StopWatchButton;