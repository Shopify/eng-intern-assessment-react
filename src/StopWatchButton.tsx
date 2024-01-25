import React from 'react'

interface StopWatchButtonProps{
    onClick: () => void;
    text: string;
    disabled?: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, text, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default StopWatchButton;