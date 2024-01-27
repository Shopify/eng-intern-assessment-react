import React from 'react'

export default function StopWatchButton() {
    return(
        <div style={centerStyle}>
            <button style={textStyle} >Start</button>
            <button style={textStyle} >Stop</button>
            <button style={textStyle} >Lap</button>
            <button style={textStyle} >Reset</button>
        </div>
    )
}

export const textStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "32px",
}

export const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}