import React from 'react'
import { CSSProperties, useState } from 'react';

// Basic properties for each button such as name, background color, and function to execute onClick.
type buttonProps = {
    name: string,
    bgcolor?: string,
    onClick?:() => void
}

// Create the button with the specified properties.
export default function StopWatchButton(props: buttonProps) {
    // State that will store whether the mouse is hovering over the button (for styling purposes).
    const [hover, setHover] = useState(false);
    // Apply the generic styling for all the buttons and the button specific styles specified in the props property
    const button_style: CSSProperties = {
        borderRadius:'5vh',
        width:'10vw',
        height:'10vh',
        margin:'0 1em 0 1em ',
        fontSize:'5vh',
        fontWeight: 'bold',
        border:'0.5vh #4c4c4d solid',
        backgroundColor: hover ? '#4c4c4d' : props.bgcolor,
        color: hover ? props.bgcolor : 'black',
        cursor: 'pointer'
   
    };
    // Return the button component.
    return(

            <button style = {button_style} onClick={props.onClick} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>{props.name}</button>

    )
}