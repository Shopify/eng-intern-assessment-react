import React from 'react'

export default function App() {
    return(
        <div>
            <p><span id="seconds">00</span>:<span id="tens">00</span></p>
            <button id="button-start">Start</button>
            <button id="button-stop">Stop</button>
            <button id="button-reset">Reset</button>
            <button id="button-lap">Lap</button>
        </div>
    )
}