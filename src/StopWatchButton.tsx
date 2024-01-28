import React from 'react';
import './StopWatchButton.css';

interface Props {
    label: string;
    disabled: boolean;
    action: React.MouseEventHandler<HTMLButtonElement>;
}

export default function StopWatchButton({label, disabled, action}: Props) {
    return(
        <button className = 'btn' onClick = {action} disabled = {disabled}>{label}</button>
    )
}