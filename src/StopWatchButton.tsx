import React, { useState } from 'react'

// props type definitions
type Props = {
    timer: number,
    setTimer: Function,
    setLapTime: Function,
    setLaps: Function
}

export default function StopWatchButton(props: Props) {

    // destructure props
    const { timer, setTimer, setLapTime, setLaps } = props;

    // state variables to keep track of if time is running, current time, and interval id
    const [timeRunning, setTimeRunning] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [intervalID, setIntervalID] = useState<number>(0);

    // starts stopwatch timer
    const startTimer = () => {
        let interval:any = setInterval(() => {
            setTimer((prevTimer:number) => prevTimer + 1)
        }, 1000)

        setIntervalID(interval);
        setTimeRunning(true);
    }

    // stops stopwatch timer
    const stopTimer = () => {
        clearInterval(intervalID);
        setTimeRunning(false);
    }

    // resets variable states
    const resetTimer = () => {
        clearInterval(intervalID);
        setTimer(0);
        setLapTime(0);
        setCurrentTime(0);
        setLaps([]);
        setTimeRunning(false);
    }

    // records stopwatch lap time
    const lapTimer = () => {
        const prevTime = currentTime;
        setCurrentTime(timer);
        setLapTime(timer - prevTime);
    };

    //render stopwatch button component
    return(
        <div className="stopwatch-btns">
            <button className="start-btn" onClick={startTimer} style={{display: !timeRunning ? 'block' : 'none'}}>Start</button>
            <button className="stop-btn" onClick={stopTimer} style={{display: !timeRunning ? 'none' : 'block'}}>Stop</button>
            <button className="lap-btn" onClick={lapTimer} style={{display: !timeRunning ? 'none' : 'block'}}>Lap</button>
            <button className="reset-btn" onClick={resetTimer}>Reset</button>
        </div>
    )
}