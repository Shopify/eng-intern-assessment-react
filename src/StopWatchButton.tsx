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
    const style: React.CSSProperties = {
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '2px solid #000',
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: 16,
        fontWeight: 600,
        height: 40,
        minWidth: 100,
        justifyContent: 'center'
    };
    return(
        <button id={`${props.name}-button`} style={style} onClick={props.callback}>
            {props.name}
        </button>
    )
}
