import React from 'react'

// define the props interface
interface Props {
    text: string;
    disabled?: boolean;
    handleClick: () => void;
}

export default function StopWatchButton({ text, disabled, handleClick }: Props) {
    return (
        <button className="btn" disabled={disabled} onClick={handleClick}>{text}</button>
    )
}
