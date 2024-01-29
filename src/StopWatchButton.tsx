import React from 'react'
import { CSSProperties, useState } from 'react';
type buttonProps = {
    name: string,
    bgcolor?: string,
    onClick?:() => void
}

export default function StopWatchButton(props: buttonProps) {
    const [hover, setHover] = useState(false);
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
    
    return(

            <button style = {button_style} onClick={props.onClick} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>{props.name}</button>

    )
}