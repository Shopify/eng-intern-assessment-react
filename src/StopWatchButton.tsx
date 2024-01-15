import React, { MouseEventHandler } from 'react';

// Define the props for the StopWatchButton component
interface StopWatchButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    title: string;
}

// This is the StopWatchButton component
export default function StopWatchButton({ onClick, title }: StopWatchButtonProps) {
    // The component renders a button with an onClick handler and a title
    return (
        <button onClick={onClick}>
            {title}
        </button>
    );
}
