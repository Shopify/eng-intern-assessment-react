//A separate component that represents the start, stop, and reset buttons.

import React from 'react'

interface Props {
    start: () => void;
    stop: () => void;
    reset: () => void;
}

export default function StopWatchButton({start, stop, reset}: Props) {

    const buttonStyle = {
        backgroundColor: '#fad49d',
        margin: '15px',
        border: 'none',
        padding: '7px 7px',
        borderRadius : '10px',
        cursor: 'pointer',
    };

    return(
        <div>
            <button style = {buttonStyle} onClick={start}> Start </button>
            <button style = {buttonStyle} onClick={stop}> Stop </button>
            <button style = {buttonStyle} onClick={reset}> Reset </button>
            <button style = {buttonStyle}> Lap </button>
        </div>
    )
}