import React from 'react'

interface ButtonProps {
    name: string;
    callback: ()=>void;
}

export default function StopWatchButton(props: ButtonProps) {
    /*
        A button to control some functionality in the stopwatch
    */
    return(
        <button
            id={`${props.name}-button`}
            onClick={props.callback}
        >
            {props.name}
        </button>
    )
}