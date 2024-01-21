import React from 'react'

/*
A separate component that represents the start, stop, and reset buttons

--Parameters--
text: button text
color: button color
handleClick: button function
*/
export default function StopWatchButton({text, color, handleClick} : {text: string, color: string, handleClick: Function}) {
    
    return(
        <div style={{
            width: '160px',
            height: '60px',
            background: color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px'
            }}
            onClick={() => handleClick()}
        >
            <h4>{text}</h4>
        </div>
    )
}