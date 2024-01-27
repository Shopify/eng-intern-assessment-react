import React from 'react';

interface Props {
    label: string;
    disabled: boolean;
    action: React.MouseEventHandler<HTMLButtonElement>;
}

export default function StopWatchButton({label, disabled, action}: Props) {
    return(
        <button onClick = {action} disabled = {disabled}>{label}</button>
    )
}