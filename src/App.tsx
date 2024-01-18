import React from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

//reset indicates no time on stopwatch (00:00:00)
type StopwatchState = "running" | "paused" | "reset";

export default function App() {
    const [time, setTime] = React.useState<number>(0);

    //useRef used to preserve lap history when stopwatch paused
    const laps= React.useRef<number[]>([]);                   //NOTE: laps are stored as absolute times
    const [showLaps, setShowLaps] = React.useState<boolean>(false);  
    const [curLapTime, setCurLapTime] = React.useState<number>(0);  
    const [stopwatchState, setStopwatchState] = React.useState<StopwatchState>("reset");      //set state to reset(0 time) on render

    const getDisplayTime = (time: number) => {
        return {
            hundredths: Math.floor((time/10)%100),
            seconds: Math.floor(((time/1000)%60)),
            minutes: Math.floor(time/60000)
        }
    }

    const runFunc = () => setStopwatchState("running");

    const pauseFunc = () => setStopwatchState("paused");

    const resetFunc = () => setStopwatchState("reset");

    //NOTE: laps are stored as absolute times
    const lapFunc = () => {
        laps.current.push(curLapTime);
        setCurLapTime(0);
    };

    //triggered when switching between running, paused, and reset states
    React.useEffect(()=>{
        let interval: NodeJS.Timeout;

        //start the timer
        if (stopwatchState =="running") {                        
            interval = setInterval(()=>{
                setTime((time)=> time + 10);
                setCurLapTime((curLapTime) => curLapTime + 10);
            }, 10);
            console.log(time);
    
            return () => { 
                clearInterval(interval); 
            }

        //stop the timer
        } else if (stopwatchState == "paused") {                 
            if (interval) clearInterval(interval);

        //set time to 0
        } else if (stopwatchState == "reset") {                  
            if (interval) clearInterval(interval);      //additional check that timer has stopped
            laps.current = [];                          //clear all laps
            setTime(0);
        }
    }, [stopwatchState])

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around',
        fontFamily: 'sans-serif'
    }

    const lapStyle: React.CSSProperties = {
        width: '34rem',
        padding: '0',
        
        backgroundColor: 'black',
        color: 'white', 
        borderStyle: 'none',
        borderRadius: '1rem'
        
    }

    const buttonStyle: React.CSSProperties = {
        width: '36rem%',
        padding: '1rem',
        paddingLeft: '12rem',
        fontSize: '2rem', 
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white', 
        borderStyle: 'none',
        borderRadius: '1rem'  
    }

    const listStyle: React.CSSProperties = {
        width: '36rem',
        paddingLeft: '12rem',
        listStyle: 'none',
        lineHeight: '1.5rem',
        fontWeight: 'bold',
        fontSize: '1rem'
    }

    return(
        <div style={containerStyle}>
            {/* Stopwatch component meant only to display values, all functionality in App */}
            {/* therefore pass displayable values only */}
            <StopWatch 
                hundredths={Math.floor((time/10)%100)} 
                seconds={Math.floor(((time/1000)%60))} 
                minutes={Math.floor(time/60000)}/>
                <StopWatchButton stopwatchState={stopwatchState} controls={{  runFunc, pauseFunc, resetFunc, lapFunc  }}/>
                <div style={lapStyle}>
                <button onClick={()=>{setShowLaps(!showLaps)}} style={buttonStyle} data-testid="show-lap-button">{showLaps? 'Hide Laps' : 'Show Laps'}</button>               
                {showLaps?
                    <ul style={listStyle} data-testid="lap-list">
                        {/* recorded laps */}
                        {laps.current.map((val, i) => {
                            const lapTime = getDisplayTime(laps.current[i]);
                            return <li key={i}>Lap {i + 1}: 
                                {String(lapTime.minutes).padStart(2, '0')}:
                                {String(lapTime.seconds).padStart(2, '0')}:
                                {String(lapTime.hundredths).padStart(2, '0')}</li>;
                        })}

                        {/* actively incrementing lap */}
                        {stopwatchState != "reset" ?
                            <li className='current-lap'>Lap {laps.current.length + 1}: 
                                {String(getDisplayTime(curLapTime).minutes).padStart(2, '0')}:
                                {String(getDisplayTime(curLapTime).seconds).padStart(2, '0')}:
                                {String(getDisplayTime(curLapTime).hundredths).padStart(2, '0')}
                            </li>
                        : null
                        }
                    </ul>
                    :null
                }               
                </div>
        </div>
    )
}

export type {StopwatchState};