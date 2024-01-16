import React, { useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [running, setRunning] = useState(false);
    const [reset, setReset] = useState(true);

    return(
        <div>
            <div>
                <h1>Shopify StopWatch</h1>
                <div>
                    <p>00:00:00</p>
                </div>
            </div>
            <div>
                <p>{reset ? "Lap" : "Reset"}</p>
                <p>{running ? "Stop" : "Start"}</p>
            </div>
        </div>
    )
}