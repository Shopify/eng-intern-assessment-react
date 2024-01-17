import React, { useState, useRef, useEffect } from 'react'
import Stopwatch from './StopWatch'
import moment from 'moment'
import Box from '@mui/joy/Box'
export default function App() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [laps, setLaps] = useState<string[]>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startStopwatch = () => {
        if (!isRunning) {
            setIsRunning(true);
            setStartTime(moment());
            timerRef.current = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
            }, 10);
        } else {
            setIsRunning(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const resetStopwatch = () => {
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(0);
        setLaps([]);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
    const formatTime = (milliseconds: number): string => {
        const duration = moment.duration(milliseconds);
        return `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}:${String(Math.floor(duration.milliseconds() / 10)).padStart(2, '0')}`;
    };
    const lap = () => {
        if (startTime && isRunning) {
            const lapTime = moment.duration(moment().diff(startTime)).asMilliseconds();
            console.log(lapTime)
            setLaps((prevLaps) => [...prevLaps, formatTime(lapTime)]);
            setStartTime(moment());
        }
    };
    return (
        <>
            <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stopwatch {...{ elapsedTime, isRunning, startStopwatch, resetStopwatch, lap, laps }} />
            </Box>

        </>
    )
}