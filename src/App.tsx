import React from 'react'
import { useState } from 'react';

import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'
import { calculateTime } from './StopWatchUtils';

export default function App() {
    const [isStopped, setIsStopped] = useState(true);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);

    function calculateTimeDifference(currentTime: number, prevTime: number) {
        const timeDifference: number = currentTime - prevTime;

        const result: string = calculateTime(timeDifference);

        return result;
    }
    
    return(
        <div>
            <StopWatch isStopped={isStopped} 
                       setIsStopped={setIsStopped} 
                       time={time} 
                       setTime={setTime}
                       laps={laps}
                       setLaps={setLaps}/>
            <StopWatchButton isStopped={isStopped} 
                             setIsStopped={setIsStopped} 
                             time={time} 
                             setTime={setTime}
                             laps={laps}
                             setLaps={setLaps}/>
            <div className="laps">
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>
                            <span>{`Lap ${index + 1}: `}</span>
                            <span>{calculateTimeDifference(lap, (index !== 0 ? laps[index - 1] : 0))}</span>
                        </li>
                        
                    ))}
                </ul>
            </div>
        </div>
    )
}