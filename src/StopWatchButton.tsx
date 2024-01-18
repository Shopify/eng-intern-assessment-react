import React from 'react';
import './StopWatchButton.css';

interface StopWatchButtonProps {
    onClick: () => void;
    label: string;
}

export default function StopWatchButton({ onClick, label }: StopWatchButtonProps) {
    return (
        <button onClick={onClick}>{label}</button>
    );
}