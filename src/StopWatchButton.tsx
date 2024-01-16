import React from 'react';

interface StopWatchButtonProps {
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    isPressed: boolean;
}

export default function StopWatchButton({ onPress, label, isPressed }: StopWatchButtonProps) {
    return(
        <button type="button" className={`stopwatch-button stopwatch-${label.toLowerCase()} ${isPressed ? "stopwatch-button-pressed" : ""}`} onClick={onPress}>{label}</button>
    );
}
