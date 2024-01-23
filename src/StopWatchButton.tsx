import React from 'react'

interface ButtonProps {
    name: string;
    value?: number;
    disabled: boolean;
    onClick: (value?: number) => void;
    datatestid: string;
}

export default function StopWatchButton({ name, value, disabled, onClick, datatestid }: ButtonProps) {
    return (
        <button className='stopwatchButton' disabled={disabled} onClick={() => onClick(value)} data-testid={datatestid}>
            {name}
        </button>
    );
}