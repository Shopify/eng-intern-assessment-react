import React from 'react'

/**
 * Props for the StopWatchButton
 */
interface StopWatchButtonProps {
    // The text that will be displayed in the button
    text: string;

    // The onClick handler that will be called when the button is pressed
    onClick: React.MouseEventHandler<HTMLButtonElement>;

    // Boolean to indicate whether the button is disabled or not
    disabled?: boolean;
}

/**
 * Button for the StopWatch that can be customized with text and onClick actions
 */
export default function StopWatchButton({
    text,
    onClick,
    disabled,
}: StopWatchButtonProps) {
    return(
        <button className="stopwatch-button" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
