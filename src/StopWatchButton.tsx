import React from 'react';
import './styles/StopWatchButton.css';

//defining the props for the component
interface StopWatchButtonProps {
    onClick: () => void;
    label: string;
    disabled?: boolean; //optional prop indicating whether the button is disabled
}

export default function StopWatchButton({ onClick, label, disabled }: StopWatchButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}>{label}</button>
    );
}
