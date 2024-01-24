import React, { useEffect } from 'react'
import { calculateTime } from './StopWatchUtils';

export default function StopWatch(props: any) {

    const { isStopped, time, setTime, laps} = props;

    useEffect(() => {
        let intervalId: any;

        if (!isStopped) {
            // increment timer value every 10 milliseconds
            intervalId = setInterval(() => setTime((prev: any) => prev + 10), 10);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isStopped])

    
    return(
        <div style={{display: "flex", justifyContent: "center", padding: 20}}>
            <h2>{calculateTime(time)}</h2>
        </div>
    )
}