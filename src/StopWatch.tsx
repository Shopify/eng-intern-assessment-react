import React from 'react'
import StopWatchButton, { centerStyle, textStyle } from './StopWatchButton';

export default function StopWatch() {
    const [seconds, setSeconds] = React.useState(0);
    const [running, setRunState] = React.useState(false);
    const [lapsList, setLaps] = React.useState<number[]>([1]);

    function setRunning() {
        setRunState(true);
    }

    function setStop() {
        setRunState(false);
    }

    function updateLaps() {
        setLaps([11]);
    }

    function resetStopwatch() {
        setRunState(false);
        setSeconds(0);
        setLaps([]);
    }

    function LapTimes(){
        return(
            <div style={centerStyle}>
                <ul style={unnumberListStyle}>
                    {lapsList.map(function (lapTime, index) {
                        return (
                            <li key={index}>
                                Lap {index + 1} : {formatHMS(lapTime)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
    
    return(
        <div className='Stopwatch'>
            <div style={swStyle}>Stopwatch</div>
            <div style={swStyle}>Time: {formatHMS(seconds)}</div>
            <StopWatchButton setRunning={setRunning} setStop={setStop} updateLaps={updateLaps} resetStopwatch={resetStopwatch}/>
            <LapTimes />
        </div>
    )
}


function formatHMS (timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds) % 60;
    const fraction = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 100);

    const formattedTime = `${
        String(hours).padStart(2, "0")}:${
        String(minutes).padStart(2, "0")}:${
        String(seconds).padStart(2, "0")}.${
        String(fraction).padStart(2, "0")}`;

    return formattedTime;
};

const swStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    fontSize: "32px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px', // Adjust the value based on your preference      
}

const unnumberListStyle = {
    fontSize: "24px",
    listStyleType: "none",
    padding: 0,
  };