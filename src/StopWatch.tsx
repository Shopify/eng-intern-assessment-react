import React, { useEffect, useRef, useState } from 'react'

export default function StopWatch() {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const [active, setActive] = useState(false);
    const interval = useRef(null);

    const startTimer = () => {
        setActive(true);
    }


    useEffect(() => {
        // Use Date object to get a more accurate time
        if (active) {
            // 
            setStartTime(Date.now() - elapsedTime);
            interval.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10)
        } else {
            clearInterval(interval.current);
        }

        return () => clearInterval(interval.current);
    }, [active, elapsedTime, startTime])

    const pauseTimer = () => {
        setActive(false);
    }

    const clearTimer = () => {
        setActive(false);
        setElapsedTime(0);
        setStartTime(0);
        setLaps([]);
    }

    const lapTimer = () => {
            setLaps(((prevLaps) => [...prevLaps, elapsedTime]));
            console.log(laps);
    }

    const formatTime = () => {
        // convert milisecond units to milisecond, second, minute and hour
        // pad 0 before each time unit if the calculated time unit is a single digit
        let ms = Math.floor(elapsedTime % 1000).toString().padStart(2, "0");
        let s = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, "0");
        let m = Math.floor((elapsedTime / 60000) % 60).toString().padStart(2, "0");
        let h = Math.floor((elapsedTime / 3600000)).toString().padStart(2, "0");
        return { h, s, m, ms }
    }

    const { h, m, s, ms } = formatTime();


    return (
        <div>
            {h}<br></br>
            {m}<br></br>
            {s}<br></br>
            {ms}<br></br>
            {elapsedTime}
            <div className="button-container">
                {active ?
                <button onClick={startTimer}>Start</button> :
                <button onClick={pauseTimer}>Pause</button>}
                <button onClick={clearTimer}>Reset</button>
                <button onClick={lapTimer}>Lap</button>
            </div>
            {laps.length > 0 && (
                <div>
                    <h2>Lap Times</h2>
                    <ul>
                        {laps.map((lap, index) => (
                            <li key={index}>{lap}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}