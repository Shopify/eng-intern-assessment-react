import React from 'react'


interface ButtonProps {
    type: string
    isDisabled: boolean
    clickHandler(): void 
}

export default function StopWatchButton( {type, isDisabled, clickHandler} : ButtonProps ) {
    return (
        <button disabled={isDisabled} onClick={clickHandler}>
            {type}
        </button>
    )
}