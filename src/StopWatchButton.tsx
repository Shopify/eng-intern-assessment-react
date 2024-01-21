import React from "react";

interface Props {
    label: string;
    onClick: () => void; // Function to call when the button is clicked
    isRunning: boolean;
    className?: string;
}

export default function StopWatchButton({
    label,
    onClick,
    isRunning,
    className,
}: Props) {
    return (
        <button
            className={`button-outline ${className} ${
                isRunning ? "running" : ""
            }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
