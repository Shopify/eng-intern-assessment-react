import React from 'react';
import moment from 'moment';

/**
* Interface for stopwatch buttons.
*/
interface stopWatchProps {
    setTime: React.Dispatch<React.SetStateAction<moment.Duration>>
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
}

/**
* Purpose:
*      Interface that has 3 buttons to add functionality
*      to the stopwatch itself.
* 
* Params:
*       setTime - useState Function - set's current time
*       setIsRunning = useState Function - set's boolean if running or not
*/
export default function StopWatchButton({setTime, setIsRunning}: stopWatchProps) {
    return(
        <div>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Stop</button>
            <button onClick={() => setTime(moment.duration(0))}>Reset</button>
        </div>
    )
}