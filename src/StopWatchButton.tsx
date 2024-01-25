import React from 'react'


interface ButtonProps {
    type: string
    isDisabled: boolean
    clickHandler(): void
    className?: string;
}

export default function StopWatchButton( {type, isDisabled, clickHandler, className} : ButtonProps ) {
    return (
        <button className={className} disabled={isDisabled} onClick={clickHandler}>
            {type}
        </button>
    )
}