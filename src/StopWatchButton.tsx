import React from 'react';

interface StopWatchProps {
    isRunning: boolean;
    title: string;
    secondaryTitle?: string;
    onClick: () => void;
}

export default function StopWatchButton({
    isRunning,
    title,
    secondaryTitle,
    onClick,
}: StopWatchProps) {
    return (
        <button onClick={onClick}>{isRunning && secondaryTitle ? secondaryTitle : title}</button>
    );
}
