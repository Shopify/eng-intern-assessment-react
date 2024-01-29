import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

// StopWatch functional component to handle the stopwatch logic
export default function StopWatch() {
    // State variables to manage the stopwatch state
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [elapsedMilliSecond, setElapsedMilliSecond] = useState(0);
    const [isLapClicked, setIsLapClicked] = useState(false);
    const [lapElaspedMilliSecond, setLapElapsedMilliSecond] = useState(0);
    const [lapList, setLapList] = useState([]);

    // useEffect to handle the intervals for updating elapsed time and lap time
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let lapInterval: NodeJS.Timeout | null = null;

        // Check if the stopwatch is running.
        if (isTimeRunning) {
            // Set interval to update elapsed time every 10 milliseconds
            interval = setInterval(() => {
                setElapsedMilliSecond(prevElapsedMilliSec => prevElapsedMilliSec + 10);
            }, 10);

            // Check if lap button is clicked
            if (isLapClicked) {
                // Log and update lap list with formatted lap time
                console.log(formatMilliSeconds(lapElaspedMilliSecond));
                setLapList(currLapList => [formatMilliSeconds(lapElaspedMilliSecond), ...currLapList]);
                setLapElapsedMilliSecond(0);
                setIsLapClicked(false);
            }

            // Set interval to update lap time every 10 milliseconds
            lapInterval = setInterval(() => {
                setLapElapsedMilliSecond(prevElapsedMilliSec => prevElapsedMilliSec + 10);
            }, 10);
        }

        // Cleanup function to clear intervals when component is unmounted or dependencies change
        return () => {
            clearInterval(interval);
            clearInterval(lapInterval);
        };
    }, [isTimeRunning, isLapClicked]);

    // Function to format milliseconds into a readable time format
    function formatMilliSeconds(milliSecond: number) {
        let second = Math.floor(milliSecond / 1000);
        let minute = Math.floor(second / 60);
        let hour = Math.floor(minute / 60);
        let hundrethSecond = (milliSecond / 10) % 100;
        let hundrethSecondFormat = hundrethSecond < 10 ? `0${hundrethSecond}` : hundrethSecond;

        return `${hour}h : ${minute % 60}m : ${second % 60}s.${hundrethSecondFormat}`;
    }

    // Function to display lap table rows
    function displayLapTable() {
        return lapList.map((lap, i) => (
            <tr key={i}>
                <td>{lapList.length - i}</td>
                <td>{lap}</td>
            </tr>
        ));
    }

    // Function to handle reset button click
    function handleReset() {
        setElapsedMilliSecond(0);
        setIsTimeRunning(false);
        setLapElapsedMilliSecond(0);
        setLapList([]);
    }

    // JSX structure for rendering the stopwatch UI
    return (
        <div>
            <div className="stopwatchContainer">
                <div className="displayContainer">
                    {/* Display elapsed time in a formatted manner */}
                    <h1>{formatMilliSeconds(elapsedMilliSecond)}</h1>
                </div>
                {/* Display the current running lap time */}
                <div className="lapDisplay">Lap: {formatMilliSeconds(lapElaspedMilliSecond)}</div>
                <div className="buttonContainer">
                    {!isTimeRunning && <StopWatchButton className="startButton" onClick={() => setIsTimeRunning(true)} label={elapsedMilliSecond === 0 ? "Start" : "Resume"} />}
                    {isTimeRunning && <StopWatchButton className="lapButton" onClick={() => isTimeRunning && setIsLapClicked(true)} label="Lap" />}
                    {isTimeRunning && <StopWatchButton className="stopButton" onClick={() => setIsTimeRunning(false)} label="Stop" />}
                    {<StopWatchButton className="resetButton" onClick={() => handleReset()} label="Reset" />}
                </div>
            </div>

            <div className="lapTableContainer">
                {/* Display lap table if there are recorded laps */}
                {lapList.length > 0 && (
                    <table className="lapTable">
                        <thead>
                            <tr>
                                <th>Lap No.</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>{displayLapTable()}</tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
