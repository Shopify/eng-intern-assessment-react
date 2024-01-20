// Import Libraries & Components
import React, { useState } from 'react'
import "./stylesheets/stopWatchButton.css"

// Define the prop types for the ShowWatchButton component
type Props = {
    setTimeInSeconds: Function,
    setLap: Function,
    clearLap: Function
}

export default function StopWatchButton(props:Props) {
    const { setTimeInSeconds } = props;
    const [intervalId, setIntervalId] = useState<number>(0);
    const [currentState, setCurrentState] = useState("Start");

    /*
    Parameter: None, Does not take in any parameters.
    Functionality: Handles the logic whenever the `start` and `pause` buttons are clicked. Essentially this controls when to start and stop the stopwatch
    Returns: Void, Does not return anything.
    */
    const handleStartPauseButton = () => {
        if (currentState == "Start") {
            setCurrentState("Pause");
            const interval:any = setInterval(() => {
                setTimeInSeconds((previousState:number) => previousState + 1);
            }, 1000);
            setIntervalId(interval);
        }
        else if (currentState === "Pause"){
            setCurrentState("Start");
            clearInterval(intervalId);
        }
    }

    /*
    Parameter: None, Does not take in any parameters.
    Functionality: Handles the logic for the reset button. Clears the `timeLaps` state and sets the stopwatch back to its initial value.
    Returns: Void, Does not return anything.
    */
    const handleReset = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
        setCurrentState("Start");
        props.clearLap();
    }

    return(
        <div className="stopwatch-controls-container">
            <button data-testid="start-pause-btn" className='start-stop' onClick={handleStartPauseButton}>{currentState}</button>
            <button data-testid="reset-btn" className='reset' onClick={handleReset}>Reset</button>
            <button data-testid="lap-btn" className='lap' onClick={(e:object) => {props.setLap()}}>Lap</button>
        </div>
    );
}
