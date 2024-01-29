import React from 'react'

interface ButtonProps {
    className?: string
    onClick: () => void
    label: string
}

export default function StopWatchButton({className, onClick, label} : ButtonProps) {
    return(
        <button className={`button ${className}`} onClick={onClick}>{label}</button>
    )
}