import React, { MouseEventHandler } from 'react';

interface StopWatchButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    title: string;
}

export default function StopWatchButton({ onClick, title }: StopWatchButtonProps) {
    return (
        <button onClick={onClick}>
            {title}
        </button>
    );
}
