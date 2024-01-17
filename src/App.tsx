import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
// import "./style.css"


export default function App() {
    //bool used to determine if the stopwatch is counting
    const [counting, setCounting] = useState(false);
    //int measuring time in seconds
    const [time, setTime] = useState(0);
    //array of ints measuring lap times in seconds
    const [laps, setLaps] = useState([]);
    //int measuring elapsed time of previous lap button press
    const [prevTime, setPrevTime] = useState(0);

    useEffect(() => {
        //use effect used so changes to counting or time cause component to re-render
        const updateTime = () => {
            setTime((prevTime) => prevTime + 0.1);
            //function to update time by 0.1s
        };

        if (counting) {
            setTimeout(updateTime, 100)
            //function to update time every 100ms
        }

    }, [counting, time]);

    const start = () => {
        //start stopwatch counting
        setCounting(true);
    };

    const stop = () => {
        //stop stopwatch counting
        setCounting(false);
    };

    const reset = () => {
        //resets time to 0
        setTime(0);
        //clears laps
        setLaps([]);
    }

    const lap = () => {
        //function to calculate lap time by subtracting time lap button was last pressed from current time
        let lapTime = time - prevTime
        //function to set prevTime to current time every time lap button is pressed
        setPrevTime(time)
        //function to add lapTime to laps array
        setLaps([...laps, lapTime]);
    }



    return (
        <div id="container">
            {/* stopwatch component being given time in seconds */}
            <StopWatch time={time} />
            {/* button being given text to render and function to call on click */}
            <StopWatchButton title="Start" func={start} />
            <StopWatchButton title="Stop" func={stop} />
            <StopWatchButton title="Reset" func={reset} />
            <StopWatchButton title="Lap" func={lap} />
            <ul>
                {/* for each lap and its corresponding index in laps array, render a list item with the lap number and the lap time */}
                {laps.map((lap, index) => (
                    //index is being used to keep track of lap number [0,1,2,3...]
                    <li key={index}>Lap {index + 1}:
                    {/* use the stopwatch component to render the lap time for correct formatting of time */}
                        <StopWatch size="sm" time={lap} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
