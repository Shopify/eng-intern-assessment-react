import React, { useState, useRef } from 'react'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch';
import './styles.css'

const ONE_SECOND_MS: number = 1000;
const ONE_MINUTE_MS: number = ONE_SECOND_MS * 60;
const ONE_HOUR_MS: number = ONE_MINUTE_MS * 60;

export class Time {
    ms: number;
    s: number;
    min: number;
    hour: number;
    private getNumOrZero = (n: number) => Math.floor(Math.max(0, n))
    constructor(elapsed_ms: number) {
        this.hour = this.getNumOrZero(elapsed_ms / ONE_HOUR_MS);
        const wholeHoursInMs = this.hour * ONE_HOUR_MS;
        this.min = this.getNumOrZero((elapsed_ms / ONE_MINUTE_MS) - wholeHoursInMs);
        const wholeMinutesInMs = this.min * ONE_MINUTE_MS;
        this.s = this.getNumOrZero((elapsed_ms - wholeMinutesInMs) / ONE_SECOND_MS);
        const wholeSecondsInMs = this.s * ONE_SECOND_MS;
        this.ms = elapsed_ms - wholeMinutesInMs - wholeSecondsInMs;
    }

    display() {
        return `${this.hour}:${this.min.toString().padStart(2,'0')}:${this.s.toString().padStart(2,'0')}:${this.ms.toString().padStart(3,'0')}`
    }
};

const useTimer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lapStart, setLapStart] = useState(undefined);
    const [isRunning, setIsRunning] = useState(false);
    const countRef = useRef(null);

    const handleStart = () => {
      const startTime = Date.now();
      setLapStart(Date.now());
      countRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    };

    const handleLap = (lap_callback: ()=>void) => {
        if(!isRunning) return;
        setLapStart(Date.now());
        lap_callback();
    };

    const handleStop = () => {
        clearInterval(countRef.current);
        setIsRunning(false);
    };

    const handleReset = () => {
        clearInterval(countRef.current);
        setElapsedTime(0);
        setLapStart(undefined);
        setIsRunning(false) ;
    };

    return { elapsedTime, lapTime: lapStart ? Date.now()-lapStart : 0, handleStart, handleStop, handleReset, handleLap };
}

interface Lap {
    total_t: Time;
    lap_t: Time;
};

interface Laps_Props {
    laps: Lap[];
};

function Laps(props: Laps_Props) {
    const style: React.CSSProperties = {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        color: "white",
        backgroundColor: "black",
        padding: 20,
        borderRight: "1px solid grey"
    };
    const inner_style: React.CSSProperties = {
        display: "flex",
        gap: 20,
        justifyContent: "space-between"
    };
    const p_style: React.CSSProperties = {
        fontWeight: "bold"
    };
    return (
        <div style={style} hidden={true}>
            <p className='bold-p'>Laps:</p>
            <div style={inner_style}>
                <p className='bold-p'>End Time</p>
                <p className='bold-p'>Length</p>
            </div>
            {
                props.laps.map((lap, index)=>{
                    return (
                        <div id={`lap-${index}`} style={inner_style}>
                            <p id={`lapTotal-${index}`}>{lap.total_t.display()}</p>
                            <p id={`lapLength-${index}`}>{lap.lap_t.display()}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

interface LapView_Props {
    enabled: boolean;
    children: React.ReactNode;
};

function LapView(props: LapView_Props) {
    const style = {
        width: "100%",
        display: props.enabled ? "flex" : "none",
    };
    return (
        <div style={style}>
            {props.children}
        </div>
    );
};

function Controller(props: {children: React.ReactNode}) {
    const style: React.CSSProperties = {
        display: "flex",
        gap: 20,
        padding: 50,
        backgroundColor: "black",
        borderBottom: "2px solid white"
    };
    return(
        <div id="Controls" style={style}>
            {props.children}
        </div>
    );
}

function ViewArea(props: {children: React.ReactNode}) {
    const style: React.CSSProperties = {
        display: "flex",
        height: "100%"
    };
    return(
        <div style={{display: "flex"}}>
            {props.children}
        </div>
    );
};

export default function App() {
    const timer = useTimer();
    const [laps, setLaps] = useState([] as Lap[]);
    const [lapsEnabled, setLapsEnabled] = useState(false);
    // Other:
    const total_t = new Time(timer.elapsedTime);
    const lap_t = new Time(timer.lapTime);

    const lap_callback = () => {
        laps.push({total_t: total_t, lap_t: lap_t});
        setLapsEnabled(true);
    };

    const reset = () => {
        timer.handleReset();
        setLaps([]);
        setLapsEnabled(false);
    }

    // Render
    const style: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
        height: "100vh"
    };
    return(
        <div id="App" style={style}>
            <Controller>
                <StopWatchButton name="Start" callback={timer.handleStart}/>
                <StopWatchButton name="Stop" callback={timer.handleStop}/>
                <StopWatchButton name="Reset" callback={reset}/>
                <StopWatchButton name="Lap" callback={()=>timer.handleLap(lap_callback)}/>
            </Controller>
            <ViewArea>
                <LapView enabled={lapsEnabled}>
                    <Laps laps={laps}/>
                    <StopWatch
                        caption='Lap Time'
                        time={lap_t}
                    />
                </LapView>
                <StopWatch
                    caption='Total Time'
                    time={total_t}
                />
            </ViewArea>
        </div>
    );
}