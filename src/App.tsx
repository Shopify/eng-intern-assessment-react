// Renders the stopwatch and handles its functionality.

import React, {useEffect, useRef, useState} from 'react'
import DisplayComponent from './StopWatch'
import ButtonComponent from './StopWatchButton'

export default function App() {

    const[time, setTime] = useState(0);
    const[counting, setCounting] = useState(true);
 
    useEffect(() => {
        let interval = null;

        if (counting) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
    }, [counting])
    
    return(
        <div className="stopwatch">
        <div className="time">
            <DisplayComponent time={time}/>
        </div>
        <div className="button">
            <ButtonComponent />
        </div>
        <div className="laps">

        </div>
        </div>
    )
}
