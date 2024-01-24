import React, { useEffect } from 'react'

export default function StopWatch(props: any) {

    const { isStopped, time, setTime } = props;

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

    // hours calculation
    const hours = Math.floor((time / (1000 * 60 * 60)) % 60);

    // minutes calculation
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    // seconds calculation
    const seconds = Math.floor((time / 1000) % 60);

    // milliseconds calculation
    const milliseconds = (time / 10) % 1000;
    
    return(
        <div style={{display: "flex", justifyContent: "center", padding: 20}}>
            <h2>{("0" + hours.toString()).slice(-2) + ":"}</h2>
            <h2>{("0" + minutes.toString()).slice(-2) + ":"}</h2>
            <h2>{("0" + seconds.toString()).slice(-2) + ":"}</h2>
            <h2>{("0" + milliseconds.toString()).slice(-2)}</h2>
        </div>
    )
}