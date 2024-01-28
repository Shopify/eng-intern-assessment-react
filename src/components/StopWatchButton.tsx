import React from 'react'
import './StopWatchButton.css';

export default function StopWatchButton({
    text,
    onClick,
    className,
}: {
    text: string;
    onClick: () => void;
    className?: string;
}) {
    return(
        <button onClick={onClick} className={className}>{text}</button>
    )
}