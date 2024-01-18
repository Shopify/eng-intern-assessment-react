//A separate component that represents the start, stop, and reset buttons.

import React from 'react'

interface StopWatchButtonProps { 
    start: () => void;
    stop: () => void;
    reset: () => void;
    lap: () => void;
}

export default function StopWatchButton({start, stop, reset, lap}: StopWatchButtonProps) {

    const buttonStyle = { //used to style the buttons
        backgroundColor: '#abdcf5',
        margin: '15px',
        border: 'none',
        padding: '7px 7px',
        borderRadius : '10px',
        cursor: 'pointer', //this allows the user to know when they are able to click on the button since the cursor changes to a pointer
        color: 'black'
    };

    return( //depending on which button is clicked the corresponding function in App.tsx is called
        <div> 
            <button style = {buttonStyle} onClick={start}> Start </button> 
            <button style = {buttonStyle} onClick={stop}> Stop </button>
            <button style = {buttonStyle} onClick={reset}> Reset </button>
            <button style = {buttonStyle} onClick={lap}> Lap </button>
        </div>
    )
}