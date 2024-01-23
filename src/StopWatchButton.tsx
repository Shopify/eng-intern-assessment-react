import React from 'react'

type StopWatchButtonProps = {
    onClick: () => void;
    label: string;
}

export default function StopWatchButton({onClick, label} : StopWatchButtonProps) {
    return(
        <button onClick={onClick} id={label}>
            {label}
        </button>
    )
}
