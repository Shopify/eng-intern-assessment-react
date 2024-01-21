import React from 'react';

// style sheet
const styles = {
    button: {
        width: '160px',
        height: '60px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px'
    } 
}

/*
A separate component that represents the start, stop, and reset buttons

--Parameters--
text: button text
color: button color
handleClick: button function
*/
export default function StopWatchButton({text, color, handleClick} : {text: string, color: string, handleClick: Function}) {
    
    return(
        <button style={{...styles.button, background: color}} onClick={() => handleClick()}>
            <h4>{text}</h4>
        </button>
    )
}