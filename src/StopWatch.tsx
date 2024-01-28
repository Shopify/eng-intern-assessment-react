import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

    // state variables to track timer, lap time, and lap array
    const [timer, setTimer] = useState<number>(0);
    const [lapTime, setLapTime] = useState<number>(0);
    const [laps, setLaps] = useState<string[]>([]);

    // update laps array when lap time changes, skip initial render
    useEffect(() => {
        if (lapTime !== 0) {
            setLaps((prevLaps) => [calculateTime(lapTime), ...prevLaps])
        }
    }, [lapTime]);

    // helper function to convert timer into string representiing hours, minutes, and seconds
    const calculateTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    //render stopwatch component
    return (
        <main>
            <section className="timer-section">
                <div className="timer-display">
                    <p>{calculateTime(timer)}</p>
                </div>
                <StopWatchButton timer={timer} setTimer={setTimer} setLapTime={setLapTime} setLaps={setLaps} />
            </section>

            <section className="lap-section" style={{display: laps.length > 0 ? 'block' : 'none'}}>
                <h2>Laps</h2>
                <div className="lap-display">
                    {laps.map((lap, index) => (
                        <div className="laps-span">
                            <span>lap {laps.length - index}</span>
                            <span key={index}>{lap}</span>
                        </div>

                    ))}
                </div>
            </section>
        </main>
    )
}