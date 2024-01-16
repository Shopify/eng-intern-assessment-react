import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton';
import './css/StopWatch.css'

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
        // Use Date object to get more accurate time
        if (active) {
            setStartTime(Date.now());
            interval.current = setInterval(() => {
                setElapsedTime((prev) => Date.now() - startTime + prev);
            }, 10)
        } else {
            // when the stopwatch is no longer active, ie stop or clear, we clear the interval
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

    const formatTime = (elapsedTime:any) => {
        // convert milisecond units to milisecond, second, minute and hour
        // pad 0's before each time unit if the calculated time unit is a single digit
        let ms = Math.floor(elapsedTime % 1000);
        let s = Math.floor((elapsedTime / 1000) % 60);
        let m = Math.floor((elapsedTime / 60000) % 60);
        let h = Math.floor((elapsedTime / 3600000));
        // padded upto 3 0's before ms because 1 second is 1000 ms
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
            .toString()
            .padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }



    return (
        <div className='StopWatch'>
            <div className='StopWatchDisplay'  data-testid="WatchDisplay">
                {formatTime(elapsedTime)}
            </div>
            <div className='StopWatchButtonGroup'>
            <StopWatchButton
                active={active}
                pauseTimer={pauseTimer}
                startTimer={startTimer}
                clearTimer={clearTimer}
                lapTimer={lapTimer}
            />
            </div>
            <div className = 'LapTimeTable' data-testid='LapList'>
                {laps.length > 0 && (
                    <div>
                        <h2>Lap Times</h2>
                        <div>
                            {laps.map((lap, index) => (
                                <div className='LapTimeEntry' data-testid={`LapTimeEntry${index}`} key={index}>{`Lap ${index+1} : ${formatTime(lap)}`}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}