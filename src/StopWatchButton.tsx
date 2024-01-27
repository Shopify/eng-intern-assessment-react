import React from 'react'

// Interface to assign types to the props of the component StopWatchButton
interface StopWatchButtonProps{
    id: string;
    text: string;
    handleClick(): void;
}

// Component that renders a StopWatch button
// the id, text of the button and the event that triggers on click is determined by the props
export default function StopWatchButton({ id, text, handleClick }: StopWatchButtonProps) {
    return(
        <button id={id} className="stopwatch-btn" onClick={() => handleClick()}>{text}</button>
    )
}