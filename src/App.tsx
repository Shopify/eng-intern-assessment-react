import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    /* Time shown on StopWatch component, in 10ms */
    const [time, setTime] = useState(0);
    /* Is StopWatch started? */
    const [started, setStarted] = useState(false);
    /* Array for storing laps */
    const [laps, setLaps] = useState([0]);

    /* Get number of 0.01s(10ms) from time */
    const getTenMS = (time: number) => {
        return time % 100;
    }

    /* Get number of seconds from time */
    const getSecond = (time: number) => {
        return Math.floor(time / 100) % 60;
    }

    /* Get number of minutes from time */
    const getMinute = (time: number) => {
        return Math.floor(time / (100 * 60));
    }

    /* Loop for StopWatch time increment */
    useEffect(() => {
        var id: any;
        if (started) {
            id = setInterval(() => {
                /* Increment time by 10ms */
                setTime(time + 1);
                /* Sync time with most recent lap */
                setLaps(laps.map((lap, index) => {
                    return index == laps.length - 1 ? lap + 1 : lap;
                }));
            }, 10)
        }
        return () => clearInterval(id);
    }, [time, laps, started])

    /* UI */
    return (
        <div style={{width: '100%', height: '100%', background: 'black'}}>
            <StopWatch 
                minutes={getMinute(time).toString().padStart(2, '0')}
                seconds={getSecond(time).toString().padStart(2, '0')}
                tenMilliseconds={getTenMS(time).toString().padStart(2, '0')}
            />
            <StopWatchButton
                setStarted={setStarted}
                setLaps={setLaps}
                setTime={setTime}
                laps={laps}
            />
            <div data-testid="Laps" style={{width: '100%', height: '100%', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '800', wordWrap: 'break-word'}}>
                {laps.map((lap, index) => 
                    <div key={index}>Lap {index + 1}----           
                    {getMinute(lap).toString().padStart(2, '0')}:
                    {getSecond(lap).toString().padStart(2, '0')}.
                    {getTenMS(lap).toString().padStart(2, '0')}</div>)}
            </div>
        </div>
    );
}