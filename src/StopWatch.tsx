import React, {useState, useEffect, CSSProperties} from "react"
import StopWatchButton from "./StopWatchButton";
import "./StopWatch.css"


// for further localization if needed
export const buttonContent = {
    start: "Start",
    stop: "Stop",
    lap: "Lap",
    reset: "Reset",
}


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
            const currentTime = elapsedTime // make a reference for current time when lap is clicked, increase accuracy
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
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };

    // render shortest and longest lap in green and red respectively
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
                display: "flex",
                justifyContent: "space-between",
                color: shouldApplyColor ? reversedIndex === shortestLapIndex ? "green" : (reversedIndex === longestLapIndex ? "red" : "white") : "white",
                fontFamily: "sans-serif",
                fontWeight: "lighter",
                fontSize: "20px",
                marginTop: "10px",
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
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                fontFamily: "sans-serif",
                fontWeight: "lighter",
                fontSize: "20px",
            }

            // role should not be changed, otherwise test will fail
            return (
                <li key={laps.length + 1} style={lapStyle}>
                    <span>Lap {laps.length + 1}</span>
                    <span role={"currentLapTime"}>{formatTime(elapsedTime - lastLapTime)}</span>
                </li>
            )
        }
    }


    const startButtonStyle: React.CSSProperties = {
        border: "3px solid #0A2A12",
        backgroundColor: "#0A2A12",
        color: "#45CA57",
    }

    const stopButtonStyle: React.CSSProperties = {
        border: "3px solid #330E0A",
        backgroundColor: "#330E0A",
        color: "#EB524C",
    }

    const resetButtonStyle: React.CSSProperties = {
        border: "3px solid #323232",
        backgroundColor: "#323232",
        color: "white",
    }

    const resetButtonStyleDisabled: React.CSSProperties = {
        border: "3px solid #1C1B1E",
        backgroundColor: "#1C1B1E",
        color: "#99989C",
    }

    const buttonSectionStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "-5vh",
        marginBottom: "5vh",
    }

    const lapSectionStyle: React.CSSProperties = {
        listStyleType: "none",
        margin: "0",
        padding: "0",
        overflow: "auto",
        paddingLeft: "30px",
        paddingRight: "30px",
    }

    const overallStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        height: "90vh"
    }

    return (
        <React.Fragment>
            <div style={overallStyle}>
                <div>
                    <div>
                        <h1 className={"stopWatchTime"}>{formatTime(elapsedTime)}</h1>
                    </div>
                    <div style={buttonSectionStyle}>
                        <StopWatchButton buttonName={isRunning ? buttonContent["lap"] : (elapsedTime > 0 ? buttonContent["reset"] : buttonContent["lap"])}
                                         buttonFunction={lapReset}
                                         disabled={(elapsedTime === 0 && !isRunning)}
                                         style={(elapsedTime === 0 && !isRunning) ? resetButtonStyleDisabled : resetButtonStyle}
                        />
                        <StopWatchButton buttonName={isRunning ? buttonContent["stop"] : buttonContent["start"]}
                                         buttonFunction={toggleStartStop}
                                         disabled={false}
                                         style={isRunning ? stopButtonStyle : startButtonStyle}
                        />
                    </div>
                </div>
                <div style={{flexGrow: 1, overflowY: "auto"}} className={"lapContainer"}>
                    <ul style={lapSectionStyle}>
                        {renderCurrentLap()}
                        {renderLaps()}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}