import React from 'react'


interface ButtonProps {
    type: string
    isDisabled: boolean
}

export default function StopWatchButton( {type, isDisabled} : ButtonProps ) {
    return (
        <button disabled={isDisabled}>
            {type}
        </button>
    )
}