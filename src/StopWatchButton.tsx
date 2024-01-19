import React, {useState} from 'react'
import './StopWatchButton.css'

export default function StopWatchButton() {
    // Initiate time state with a value of 0
    const [timer, setTimer] = useState(0);
    const [laps, setLaps] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    // Starts the timer once the 'Start' button is clicked.
    const startStopWatch = () => {
        if (intervalId) return;
        setIntervalId(setInterval(() => {
            setTimer((prevTimer) => prevTimer + 10); // increment by 10
        }, 10));
    }
    
    // Pauses the stop watch timer once the 'Pause' button is clicked.
    const pauseStopWatch = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    }
    
    // Handles resetting the stop watch timer once the 'Stop' button is clicked.
    const resetTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setTimer(0);
        setLaps([]);
    }

    // Displays the timer once the 'Lap' button is clicked.
    const lapDisplay = () => {
        setLaps((prevLaps) => [...prevLaps, timer]);
    }

    // Convert timer to seconds + milliseconds for better precision.
    const seconds = Math.floor(timer / 1000);
    const milliseconds = timer % 1000;

    return(
        <div className= "button-container">
            <button className = "button" onClick={startStopWatch}>Start</button>
            <button className = "button" onClick={pauseStopWatch}>Stop</button>
            <button className = "button" onClick={resetTimer}>Reset</button>
            <button className = "button" onClick={lapDisplay}>Lap</button>
            <h1 className= "timer-1" >{seconds}.{milliseconds}</h1> 

            <div className= "laps-container">
                {laps.map((lap, i) => (
                    <p key={i}>Lap {i + 1}: {lap}</p>
                ))}
            </div>
            
        </div>
    )
}