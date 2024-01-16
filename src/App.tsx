import React from 'react'
import StopWatchButton from './StopWatchButton'
import { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import './styles/App.css'

export default function App() {
    const [running, setRunning] = useState<boolean>(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [timer, setTimer] = useState<number>(0);

    const RecordLapTime = () => {
        setLapTimes((prevLapTimes) => [...prevLapTimes, timer]);
    };

    const ResetTimer = () => {
        setTimer(0);
        setLapTimes([]);
        setRunning(false);
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout
        if (running) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [running]);

    return(
        <div>
            <StopWatch timer={timer}/>
            <StopWatchButton running={running} recordLapTime={RecordLapTime} setRunning={setRunning} resetTimer={ResetTimer} timer={timer}/>
            {
                (lapTimes.length > 0)
                ?<div className="lapTimesBox">
                    <hr/>
                    <h2>Laps Tracker</h2>
                    {
                        lapTimes.map((lapTime, index) => {
                            return <div key={"lap"+index} className="lapTimeComponent">
                                <span className="lapTimeTag">Lap {index + 1}: </span><span>{lapTime}</span>
                            </div>
                        })
                    }
                </div>
                :''
            }
        </div>
    )
}