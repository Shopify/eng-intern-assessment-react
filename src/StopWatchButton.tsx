//A separate component that represents the start, stop, and reset buttons.

import React from 'react'

interface Props {
    start: () => void;
    stop: () => void;
    reset: () => void;
    lap: () => void;
}

export default function StopWatchButton({start, stop, reset, lap}: Props) {

    const buttonStyle = {
        backgroundColor: '#abdcf5',
        margin: '15px',
        border: 'none',
        padding: '7px 7px',
        borderRadius : '10px',
        cursor: 'pointer',
        color: 'black'
    };

    return(
        <div>
            <button style = {buttonStyle} onClick={start}> Start </button>
            <button style = {buttonStyle} onClick={stop}> Stop </button>
            <button style = {buttonStyle} onClick={reset}> Reset </button>
            <button style = {buttonStyle} onClick={lap}> Lap </button>
        </div>
    )
}