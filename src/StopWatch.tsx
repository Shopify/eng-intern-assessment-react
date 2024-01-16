//A separate component that represents the stopwatch display.

import React from 'react'

export default function StopWatch() {

    const backgroundStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    };

    const textStyle = {
        color: '#dbdada',
        fontSize: '70px',
        letterSpacing: '3px',
        margin: '2px'
    };

    const colonStyle = { //try to fix the colon allignment
        color: '#dbdada',
        fontSize: '45px',
    };

    return(
        <div style = {backgroundStyle}>
            <p style = {textStyle}> 00 </p>

            <span style = {colonStyle}> : </span>

            <p style = {textStyle}> 00 </p>

            <span style = {colonStyle}> : </span>

            <p style = {textStyle}> 00 </p>
        </div>
    )
}
