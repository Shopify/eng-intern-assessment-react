import React, { useState } from 'react'

export default function StopWatch() {
    const [time, setTime] = useState(0)
    const [start, setStart] = useState(false)

    useEffect(()=>{
        let interval: number;
        if (start) {
            interval = setInterval(()=> setTime(time+1), 10)
        }
        return () => clearInterval(interval);
    }, [start, time])

    return(
        <div>
            <p>{time}</p>
        </div>
    )
}