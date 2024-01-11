import React from 'react'

interface StopwatchButtonProps {
    color: string
    label: string
    onButtonClick: () => void
}

export default function StopWatchButton({ color, label, onButtonClick } : StopwatchButtonProps) {
    return(
        <button
        className={`button ${color}`}
        onClick={onButtonClick}
        >
            {label}
        </button>
    )
}
