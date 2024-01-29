import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';
import StopWatchLapList from './StopWatchLapList';
import { formatTime } from '../utils/formatTime';

export default function StopWatch() {
    const [time, setTime] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])

    useEffect(() => {
        if (timerRunning) {
            let intervalId: NodeJS.Timeout;
            intervalId = setInterval(() => setTime(time + 1), 10)
            return () => clearInterval(intervalId);
        }
    }, [time, timerRunning])

    const getStopWatchButtons = () => {
        if (!timerRunning && time > 0) {
            return (
                <>
                    <StopWatchButton variant='start' setTimerRunning={setTimerRunning} />
                    <StopWatchButton variant='reset' setTime={setTime} setLaps={setLaps} />
                </>
            )
        } else if (timerRunning) {
            return (
                <>
                    <StopWatchButton variant='stop' setTimerRunning={setTimerRunning} />
                    <StopWatchButton variant='lap' setTimerRunning={setTimerRunning}
                        timerRunning={timerRunning} setLaps={setLaps} time={time} laps={laps}
                    />
                </>
            )
        }
        if (!timerRunning) {
            return (
                <>
                    <StopWatchButton variant='start' setTimerRunning={setTimerRunning} />
                    <StopWatchButton variant='lap' setTimerRunning={setTimerRunning}
                        timerRunning={timerRunning} setLaps={setLaps} time={time} laps={laps}
                    />
                </>
            )
        }
    }
    return (
        <div style={{width: '300px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}>
            <p style={{fontSize: '80px', marginBottom:'55px'}}className='stopwatch-time'>{formatTime(time)}</p>
            <div style={{display:'flex', justifyContent:'space-between', width:'100%', paddingBottom:'20px'}}className='stopwatch-button-container'> {getStopWatchButtons()}</div>
            <hr style={{color:'black', width:'100%', opacity:0.2}}></hr>
            {laps && <StopWatchLapList laps={laps} />}
        </div>
    )
}

