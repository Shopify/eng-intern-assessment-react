import React, { useState } from 'react'
import "./stylesheets/stopWatchButton.css"

type Props = {
    setTimeInSeconds: Function,
    setLap: Function,
    clearLap: Function
}


export default function StopWatchButton(props:Props) {
    const { setTimeInSeconds } = props;
    const { setLap } = props;
    const [intervalId, setIntervalId] = useState<number>(0);
    const [currentState, setCurrentState] = useState("Start");

    const handleStartPauseButton = () => {
        if (currentState == "Start") {
            setCurrentState("Pause")
            handlePlayButton(Object);
        }
        else if (currentState === "Pause"){
            setCurrentState("Start")
            handleStopButton();
        }

    }

    const handleLap=(e:object) => {
        props.setLap()
    }

    const handlePlayButton = (e: object) => {
        const interval:any = setInterval(() => {
            setTimeInSeconds((previousState:number) => previousState + 1);
        }, 1000);

        setIntervalId(interval);
    }

    const handleStopButton = () => {
        clearInterval(intervalId);
    }

    const handleReset = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
        setCurrentState("Start");
        props.clearLap();
    }

    return(
        <div className="stopwatch-controls-container">
            <button className='start-stop' onClick={handleStartPauseButton} type="button">{currentState}</button>
            <button className='reset' onClick={handleReset} type="button">Reset</button>
            <button className='lap' onClick={handleLap} type="button">Lap</button>
        </div>
    );
}
