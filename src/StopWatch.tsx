import React, { useEffect, useState } from 'react'
import './css/stopwatch.css'
import StopWatchButton from './StopWatchButton';
import { ButtonType } from './constants';


export default function StopWatch() {
    const [time, setTime] = useState<number>(0);

    const [isTicking, setIsTicking] = useState<Boolean>(false);

    const [lapList, setLapList] = useState<String[]>([]);


    // This hook will handle updating the clock time every 10ms
    useEffect(() => {
        let id : NodeJS.Timer;
        if (isTicking) {
            id = setInterval(() => {
                setTime(time + 1)
            }, 10);
        }
        return () => clearInterval(id)
    }, [isTicking, time])

    const hours = Math.floor(time / 360000);

    const minutes = Math.floor((time % 360000) / 6000);

    const seconds = Math.floor((time % 6000) / 100);

    const milliseconds = time % 100;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2,"0")}`
    
    // Some button functions
    const toggleTimer = () => {
        setIsTicking(!isTicking);
        console.log(isTicking);
    }

    const resetTimer = () => {
        setIsTicking(false);
        setTime(0);
        setLapList([]);
    }


    const takeLap = () => {
        if (isTicking) {
            const temp = lapList;
            temp.push(timeString)
            setLapList(temp)
        }
    }
    useEffect(() => {

    }, lapList)
    return(
        <div className='container'>
            <p data-testid='time-string' className="stopwatch-time">
                {timeString}
            </p>
            <div className='row-container'>
                <StopWatchButton data-testid='start-stop-button' onClick={toggleTimer} type={isTicking ? ButtonType.STOP : ButtonType.START}/>
                <StopWatchButton data-testid='reset-button' onClick={resetTimer} type={ButtonType.RESET}/>
                <StopWatchButton data-testid='lap-button' onClick={takeLap} type={ButtonType.LAP} disabled={!isTicking}/>
            </div>
            <ul data-testid="laps-list">
                {lapList.length > 0 && [...lapList].reverse().map((time: String, index: number) => {
                    return <li key={index} className='lap-time'>{`Lap ${index + 1}: ${time}`}</li>
                })}
            </ul>
        </div>
    )
}