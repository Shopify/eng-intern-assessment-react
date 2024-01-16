import React from 'react'
import StopWatchButton from './StopWatchButton'
import { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import './styles/App.css'

export default function App() {
    const [running, setRunning] = useState(false);
    const [lapTimes, setLapTimes] = useState(["5000", "6000"]);

    return(
        <div>
            <StopWatch/>
            <StopWatchButton/>
            <div className="lapTimesBox">
                <hr/>
                <h2>Laps Tracker</h2>
                {
                    lapTimes.map((lapTime, index) => {
                        return <div key={"lap"+index} className="lapTimeComponent">
                            <span className="lapTimeTag">Lap {index + 1}</span>: <span>{lapTime}</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}