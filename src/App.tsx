// Renders the stopwatch and handles its functionality.

import React, {useEffect, useRef, useState} from 'react'
import DisplayComponent from './StopWatch'
import { LapButtonComponent, ResetButtonComponent, StartButtonComponent, StopButtonComponent } from './StopWatchButton';
import './App.css'

export default function App() {

    const[time, setTime] = useState(0);
    const[counting, setCounting] = useState(false);
    const[laps, setLaps] = useState<number[]>([]);
 
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
    
    const handleLap = () => {
        setLaps([...laps, time])
    }
    
    return(
        <div className="stopwatch">
            <div className="time">
                <DisplayComponent time={time}/>
            </div>
            <div className="buttons">
                {!counting && (<StartButtonComponent setCounting={setCounting}/>)}
                {counting && (<StopButtonComponent setCounting={setCounting}/>)}
                {counting && (<LapButtonComponent onLap={handleLap}/>)}
                {!counting && (<ResetButtonComponent setTime={setTime} setLaps={setLaps}/>)}
            </div>
            <div className="laps">
                    {laps.map((lapTime, index) => (
                        <div key={index}>
                            Lap {index + 1}: <DisplayComponent time={lapTime} />
                        </div>
                    ))}
            </div>
        </div>
    )
}
