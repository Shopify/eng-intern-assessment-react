import React from 'react'

interface ButtonProps {
    onClick: () => void
    label: string
}

export default function StopWatchButton({onClick, label} : ButtonProps) {
    return(
        <button onClick={onClick}>{label}</button>
    )
}