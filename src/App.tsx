// Renders the stopwatch and handles its functionality.

import React, {useEffect, useRef, useState} from 'react'
import DisplayComponent from './StopWatch'
import { LapButtonComponent, ResetButtonComponent, StartButtonComponent, StopButtonComponent } from './StopWatchButton';

export default function App() {

    const[time, setTime] = useState(0);
    const[counting, setCounting] = useState(false);
 
    useEffect(() => {
        let interval: NodeJS.Timer = null;
    
        if (counting) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (interval) {
            clearInterval(interval);
        }
    
        // Cleanup function to clear the interval when 'counting' changes value
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [counting]);
    
    return(
        <div className="stopwatch">
        <div className="time">
            <DisplayComponent time={time}/>
        </div>
        <div className="button">
            {!counting && (<StartButtonComponent setCounting={setCounting} setTime={setTime}/>)}
            {counting && (<StopButtonComponent setCounting={setCounting} setTime={setTime}/>)}
            {counting && (<LapButtonComponent setCounting={setCounting} setTime={setTime}/>)}
            {!counting && (<ResetButtonComponent setCounting={setCounting} setTime={setTime}/>)}
        </div>
        <div className="laps">

        </div>
        </div>
    )
}
