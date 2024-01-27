import React from 'react'

interface StopWatchButtonProps {
    setRunning: () => void;
    setStop: () => void;
    updateLaps: () => void;
    resetStopwatch: () => void;
}

export default function StopWatchButton({setRunning, setStop, updateLaps, resetStopwatch }: StopWatchButtonProps) {
    return(
        <div style={centerStyle}>
            <button style={textStyle} onClick={setRunning}>Start</button>
            <button style={textStyle} onClick={setStop}>Stop</button>
            <button style={textStyle} onClick={updateLaps}>Lap</button>
            <button style={textStyle} onClick={resetStopwatch}>Reset</button>
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