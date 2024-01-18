import React from 'react';
import './styles/StopWatchButton.css';

interface StopWatchButtonProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

export default function StopWatchButton({ onClick, label, disabled }: StopWatchButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}>{label}</button>
    );
}
