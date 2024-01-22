import React from 'react'

/*
    This file defines a standard button for
    controlling the stopwatch
*/

interface ButtonProps {
    name: string;
    callback: ()=>void;
}

export default function StopWatchButton(props: ButtonProps) {
    /*
        A button to control some functionality in the stopwatch
    */
    return(
        <button className="ControlButton" id={`${props.name}-button`} onClick={props.callback}>
            {props.name}
        </button>
    )
}
