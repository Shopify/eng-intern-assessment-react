import React from 'react'
import StopWatch, { formatHMS } from './StopWatch'
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [seconds, setSeconds] = React.useState(0);
    const [previousLapSecond, setprevSeconds] = React.useState(0);
    const [running, setRunState] = React.useState(false);
    const [lapsList, setLaps] = React.useState<number[]>([]);

    React.useEffect(() => {
        let updateInterval: NodeJS.Timer;
    
        if (running) {
          updateInterval = setInterval(() => {
            setSeconds((seconds) => seconds + 0.01);
          }, 10);
        }
    
        return () => clearInterval(updateInterval);
    }, [running])

    function setRunning() {
        setRunState(true);
    }

    function setStop() {
        setRunState(false);
    }

    function updateLaps() {
        if (running) {        
            const currentSeconds: number = seconds; // ensures that seconds are not changed in the middle
            const currentLapTime: number = (seconds - previousLapSecond);

            setLaps((prevList) => [...prevList, currentLapTime]);
            setprevSeconds(currentSeconds);
        }
    }

    function resetStopwatch() {
        setRunState(false);
        setSeconds(0);
        setLaps([]);
        setprevSeconds(0);
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
        <div className='App'>
            
            <StopWatch seconds={seconds}/>
            <StopWatchButton running={running} setRunning={setRunning} setStop={setStop} updateLaps={updateLaps} resetStopwatch={resetStopwatch}/>
            <LapTimes />
        </div>
    )
}

const unnumberListStyle = {
    fontSize: "24px",
    listStyleType: "none",
    padding: 0,
};

export const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}