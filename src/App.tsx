import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./styles.css";

export default function App() {
    const [time, setTime] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval: any;

        if (isRunning) {
            interval = setInterval(() => setTime((time) => time + 10), 10);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        if (time) {
            const prevLaps = laps.slice(0, laps.length - 1);
            const currentLaps: number =
                time - prevLaps.reduce((acc, val) => acc + val, 0);
            setLaps([...prevLaps, currentLaps]);
        } else {
            setLaps([]);
        }
    }, [time]);

    return (
        <>
            <StopWatch time={time} />
            <StopWatchButton
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                time={time}
                setTime={setTime}
                laps={laps}
                setLaps={setLaps}
            />
        </>
    );
}
