import React from 'react'
import StopWatch from './StopWatch';

//reset indicates no time on stopwatch (00:00:00)
type StopwatchState = "running" | "paused" | "reset";

export default function App() {
    const [time, setTime] = React.useState<number>(0);
    const [state, setState] = React.useState<StopwatchState>("reset");      //set state to reset(0 time) on render

    React.useEffect(()=>{
        if (state =="running") {
            let interval: NodeJS.Timeout;

            interval = setInterval(()=>{
                setTime((time)=> time + 10);
            }, 10);
            console.log(time);
    
            return () => { 
                clearInterval(interval); 
            }
        }
    }, [state])

    return(
        <div>
            {/* Stopwatch component meant only to display values, all functionality in App */}
            {/* therefore pass displayable values only */}
            <StopWatch 
                hundreths={Math.floor((time/10)%100)} 
                seconds={Math.floor(((time/1000)%60))} 
                minutes={Math.floor(time/60000)}/>
        </div>
    )
}

export type {StopwatchState};