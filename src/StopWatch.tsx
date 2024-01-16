import React, {useState, useEffect} from 'react'
import StopWatchButton from "./StopWatchButton";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


export default function StopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState(0);

    const toggleStartStop = () => {
        setIsRunning(!isRunning);
    }

    const lapReset = () => {
        if (isRunning) {
            const currentTime = elapsedTime
            const lapTime = currentTime - lastLapTime;
            setLaps(prevLaps => [...prevLaps, lapTime]);
            setLastLapTime(lapTime + lastLapTime);
        } else {
            setIsRunning(false);
            setElapsedTime(0);
            setLaps([]);
            setLastLapTime(0);
        }
    }


    // Time elapsing and resetting
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
            }, 10);

        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = (time % 1000) / 10;

        // mm:ss:msms
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const getShortestAndLongestLapIndices = () => {
        let shortestLapIndex = 0;
        let longestLapIndex = 0;
        for (let i = 0; i < laps.length; i++) {
            if (laps[i] < laps[shortestLapIndex]) {
                shortestLapIndex = i;
            }
            if (laps[i] > laps[longestLapIndex]) {
                longestLapIndex = i;
            }
        }
        return {shortestLapIndex, longestLapIndex};
    }

    const {shortestLapIndex, longestLapIndex} = getShortestAndLongestLapIndices();

    let renderLaps = () => {
        return laps.slice().reverse().map((lap, index) => {
            const reversedIndex = laps.length - index - 1;
            const shouldApplyColor = laps.length >= 2;
            const lapStyle = {
                display: 'flex',
                justifyContent: 'space-between',
                color: shouldApplyColor ? reversedIndex === shortestLapIndex ? 'green' : (reversedIndex === longestLapIndex ? 'red' : 'black') : 'black',
            }
            return (
                <li key={index} style={lapStyle}>
                    <span>Lap {laps.length - index}</span>
                    <span>{formatTime(lap)}</span>
                </li>

            )
        });
    }

    let renderCurrentLap = () => {
        if (isRunning || elapsedTime !== 0) {
            const lapStyle = {
                display: 'flex',
                justifyContent: 'space-between',
            }
            return (
                <li key={laps.length + 1} style={lapStyle}>
                    <span>Lap {laps.length + 1}</span>
                    <span>{formatTime(elapsedTime - lastLapTime)}</span>
                </li>
            )
        }
    }


    return (
        <React.Fragment>
            <div>
                <h1>{formatTime(elapsedTime)}</h1>
            </div>
            <div>
                <StopWatchButton buttonName={isRunning ? "Stop" : "Start"}
                                 buttonFunction={toggleStartStop}
                                 disabled={false}
                />
                <StopWatchButton buttonName={isRunning ? "Lap" : (laps.length > 0 ? "Reset" : "Lap")}
                                 buttonFunction={lapReset}
                                 disabled={laps.length === 0 && !isRunning}
                />
            </div>
            <div>
                <ul>
                    {renderCurrentLap()}
                    {renderLaps()}
                </ul>
            </div>
        </React.Fragment>
    )
}