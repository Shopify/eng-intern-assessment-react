import React from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

//reset indicates no time on stopwatch (00:00:00)
type StopwatchState = "running" | "paused" | "reset";

export default function App() {
    const [time, setTime] = React.useState<number>(0);
    const [state, setState] = React.useState<StopwatchState>("reset");      //set state to reset(0 time) on render

    const runFunc = () => setState("running");

    const pauseFunc = () => setState("paused");

    const resetFunc = () => setState("reset");

    React.useEffect(()=>{
        let interval: NodeJS.Timeout;
        if (state =="running") {
            interval = setInterval(()=>{
                setTime((time)=> time + 10);
            }, 10);
            console.log(time);
    
            return () => { 
                clearInterval(interval); 
            }
        } else if (state == "paused") {
            if (interval) clearInterval(interval);
        } else if (state == "reset") {
            if (interval) clearInterval(interval);
            setTime(0);
        }
    }, [state])

    return(
        <div>
            {/* Stopwatch component meant only to display values, all functionality in App */}
            {/* therefore pass displayable values only */}
            <StopWatch 
                hundredths={Math.floor((time/10)%100)} 
                seconds={Math.floor(((time/1000)%60))} 
                minutes={Math.floor(time/60000)}/>
            <StopWatchButton state={state} controls={{  runFunc, pauseFunc, resetFunc  }}/>
        </div>
    )
}

export type {StopwatchState};