import React, { useEffect, useState } from 'react'
import "./StopWatch.css"


/**
 * @description Interface representing a single lap with hours, minutes and seconds. 
 *   
 * @example const lap1 = Lap (
 *              hours:
 *              minutes:
 *              seconds:
 *          )
 **/
interface Lap {
    hours: number;
    minutes: number;
    seconds: number;
}


/**
 * @description Component representing the stopwatch display. 
 *   
 **/
export default function StopWatch() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [currentTime, setcurrentTime] = useState<number>(0);
    const [laps, setLaps] = useState<Lap[]>([]);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (isActive) {
            timerId = setInterval(() => {
                setcurrentTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [isActive]);

    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const remainingSeconds = currentTime % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return (
        <div className='stopwatch-background'>
            <div className='stopwatch-container'>
                <p className='stopwatch-text'>{formattedHours}</p>
                <span>:</span>
                <p className='stopwatch-text'>{formattedMinutes}</p>
                <span>:</span>
                <p className='stopwatch-text'>{formattedSeconds}</p>
            </div>
        </div>
    );
}
