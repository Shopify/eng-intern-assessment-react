//A separate component that represents the start, stop, and reset buttons.

import React from 'react'

export default function StopWatchButton() {

    const backgroundStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const buttonStyle = {
        backgroundColor: '#fad49d',
        margin: '15px',
        border: 'none',
        padding: '7px 7px',
        borderRadius : '10px',
        cursor: 'pointer',
    };

    return(
        <div style = {backgroundStyle}>
            <button style = {buttonStyle}> Start </button>
            <button style = {buttonStyle}> Stop </button>
            <button style = {buttonStyle}> Reset </button>
            <button style = {buttonStyle}> Lap </button>
        </div>
    )
}