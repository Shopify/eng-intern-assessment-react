import React from "react";
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import { useStopWatch } from "./hooks/use-stop-watch";
import { formatTime } from "./helpers/format-time";
import "./styles.css";

const App = () => {
    const {
        time,
        isRunning,
        isStopped,
        isReset,
        laps,
        toggleStartPause,
        stop,
        reset,
        recordLap,
    } = useStopWatch();

    return (
        <div className="stop-watch-container">
            <StopWatch time={time} />
            <div className="buttons-container">
                <StopWatchButton
                    onClick={toggleStartPause}
                    isDisabled={isStopped && !isReset}
                >
                    {isStopped ? "Start" : isRunning ? "Pause" : "Resume"}
                </StopWatchButton>
                <StopWatchButton
                    onClick={stop}
                    isDisabled={isStopped || isReset}
                >
                    Stop
                </StopWatchButton>
                <StopWatchButton onClick={reset} isDisabled={isReset}>
                    Reset
                </StopWatchButton>
                <StopWatchButton onClick={recordLap} isDisabled={!isRunning}>
                    Lap
                </StopWatchButton>
            </div>
            <ol className="lap-list" data-testid="lap-list" reversed>
                {laps.map((lapTime) => (
                    <li>{formatTime(lapTime)}</li>
                ))}
            </ol>
        </div>
    );
};

export default App;
