import React from 'react';

interface Props {
    label: string;
    disabled: boolean;
    action: React.MouseEventHandler<HTMLButtonElement>;
    buttonClassName: string;
}

export default function StopWatchButton({label, disabled, action, buttonClassName}: Props) {
    return(
            <button onClick = {action} disabled = {disabled} className = {buttonClassName}>{label}</button>
    )
}