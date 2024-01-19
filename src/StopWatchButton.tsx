import React from 'react'
import './StopWatchButton.css';

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