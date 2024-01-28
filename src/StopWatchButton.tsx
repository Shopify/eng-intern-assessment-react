import React from 'react'
import { centerStyle } from './App';

interface StopWatchButtonProps {
    running: boolean;
    setRunning: () => void;
    setStop: () => void;
    updateLaps: () => void;
    resetStopwatch: () => void;
}

export default function StopWatchButton({running, setRunning, setStop, updateLaps, resetStopwatch }: StopWatchButtonProps) {
    return(
        <div style={centerStyle}>
            <button style={textStyle} onClick={setRunning} disabled={running}>Start</button>
            <button style={textStyle} onClick={setStop} disabled={!running}>Stop</button>
            <button style={textStyle} onClick={updateLaps} disabled={!running}>Lap</button>
            <button style={textStyle} onClick={resetStopwatch}>Reset</button>
        </div>
    )
}

export const textStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "32px",
}
