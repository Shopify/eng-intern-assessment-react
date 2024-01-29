// StopWatchButton.tsx
import React from 'react';

interface StopWatchButtonProps {
    onClick: () => void;
    text: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};

export default StopWatchButton;
