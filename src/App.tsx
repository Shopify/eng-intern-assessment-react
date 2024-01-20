import React, { useState, useRef } from 'react'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch';

function Controls(props: {children: React.ReactNode}) {
    const style: React.CSSProperties = {
        display: "flex",
        gap: 20,
        padding: 50,
        backgroundColor: "grey"
    };
    return(
        <div id="Controls" style={style}>
            {props.children}
        </div>
    );
}

const useTimer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const countRef = useRef(null);

    const handleStart = () => {
      const startTime = Date.now();
      countRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

    const handlePause = () => {
      clearInterval(countRef.current);
    }

    const handleReset = () => {
      clearInterval(countRef.current);
      setElapsedTime(0);
    }

    return { elapsedTime, handleStart, handlePause, handleReset };
}

const useCounter = (max: number, callback: any) => {
    const [value, setValue] = useState(0);

    const increment = () => {
        if(value == max) {
            callback()
            setValue(0);
        }
        else setValue((prevValue)=>prevValue+1);
    }

    const reset = () => {
        setValue(0);
    }

    return { value, increment, reset };
};

class Lap {
    constructor(
        public ms: number,
        public s: number,
        public min: number,
        public hour: number
    ) {}
};

function Laps(props: {laps: Lap[]}) {
    const style: React.CSSProperties = {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        color: "white",
        backgroundColor: "black",
        padding: 20
    };
    console.log(props.laps)
    return (
        <div style={style}>
            <p>Laps:</p>
            {
                props.laps.map((lap, index)=>{
                    return <p id={`lap-${index}`}>{lap.hour} : {lap.min} : {lap.s} : {lap.ms}</p>
                })
            }
        </div>
    );
};

export default function App() {
    const timer_ms = useTimer();
    const time_hour = useCounter(24, undefined);
    const time_min = useCounter(60, time_hour.increment);
    const time_s = useCounter(60, time_min.increment);
    //-----
    const lap_hour = useCounter(24, undefined);
    const lap_min = useCounter(24, lap_hour.increment);
    const lap_s = useCounter(60, lap_min.increment);
    const lap_ms = useState(0)[0];
    const [start_ms, setStart_ms] = useState(0);
    //----
    const laps = useState([])[0];

    if(timer_ms.elapsedTime >= 1000) {
        timer_ms.handleReset()
        timer_ms.handleStart()
        time_s.increment()
    }

    if(start_ms && timer_ms.elapsedTime === start_ms) {
        lap_s.increment()
    }

    // Callback Functions to change state
    const start = () => {
        timer_ms.handleStart()
    };

    const stop = () => {
        //if(isRunning) setIsRunning(false);
        timer_ms.handlePause()
    };

    const reset = () => {
        timer_ms.handleReset();
        time_s.reset();
        time_min.reset();
        time_hour.reset();
    };

    const lap_click = () => {
        const lap = new Lap(
            timer_ms.elapsedTime,
            time_s.value,
            time_min.value,
            time_hour.value
        );

        laps.push(lap);

        setStart_ms(timer_ms.elapsedTime);
        lap_s.reset();
        lap_min.reset();
        lap_hour.reset();
    };

    // Render Components
    const style: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
    };
    return(
        <div id="App" style={style}>
            <Controls>
                <StopWatchButton name="Start" callback={start}/>
                <StopWatchButton name="Stop" callback={stop}/>
                <StopWatchButton name="Reset" callback={reset}/>
                <StopWatchButton name="Lap" callback={lap_click}/>
            </Controls>
            <div style={{display: "flex"}}>
                <Laps laps={laps}/>
                <StopWatch
                    time_ms={timer_ms.elapsedTime}
                    time_s={time_s.value}
                    time_min={time_min.value}
                    time_hour={time_hour.value}
                />
                <StopWatch
                    time_ms={lap_ms}
                    time_s={lap_s.value}
                    time_min={lap_min.value}
                    time_hour={lap_hour.value}
                />
            </div>
        </div>
    );
}
