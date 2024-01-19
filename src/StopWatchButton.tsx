import React from 'react'

interface StopWatchButtonProps {
    onClick: () => void;
    label: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

export default StopWatchButton;