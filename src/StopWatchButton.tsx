import React from 'react'

type StopWatchButtonProps = {
    label: string;
    onClick: () => void;
};

export default function StopWatchButton({label, onClick}: StopWatchButtonProps) {
    return(
        <button onClick={onClick}>
            {label}
        </button>
    )
}