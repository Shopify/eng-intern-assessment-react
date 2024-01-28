import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';
import StopWatchLapList from './StopWatchLapList';


export const formatTime = (time: number): string => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const ms = Math.floor(time % 100)

    let result = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`

    if (hours > 0){ 
        result = `${hours.toString().padStart(2, '0')}:${result}`
    }

    return result
}

export default function StopWatch() {
    const [time, setTime] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])

    useEffect(() => {
        if (timerRunning) {
            let intervalId: NodeJS.Timeout;
            intervalId = setInterval(() => setTime(time + 10), 10)
            return () => clearInterval(intervalId);

        }
    }, [time, timerRunning])

    const getStopWatchButtons = () => {
        
        if (!timerRunning && time > 0){ 
            return (
            <>
                <StopWatchButton variant='start' setTimerRunning={setTimerRunning}/>
                <StopWatchButton variant='reset' setTime={setTime} setLaps={setLaps} />
            </>
            )
        } else if (timerRunning) { 
            return (
                <>
                    <StopWatchButton variant='stop' setTimerRunning={setTimerRunning} />
                    <StopWatchButton variant='lap' setTimerRunning={setTimerRunning} 
                        timerRunning={timerRunning}  setLaps={setLaps} time={time} laps={laps}
                    />
                </>
                )
        }
        if (!timerRunning){ 
            return (
                <>
                    <StopWatchButton variant='start' setTimerRunning={setTimerRunning}/>
                    <StopWatchButton variant='lap' setTimerRunning={setTimerRunning} 
                timerRunning={timerRunning}  setLaps={setLaps} time={time} laps={laps}
            />
                </>
                )
        }


    }
    return (
        <><div>{formatTime(time)}</div><StopWatchLapList laps={laps} />
           {getStopWatchButtons()}
        </>
    )
}

