import React from "react";
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import { useStopWatch } from "./hooks/use-stop-watch";
import "./styles.css";

const App = () => {
    const { time, isRunning, start, stop, reset } = useStopWatch();

    return (
        <div className="stop-watch-container">
            <StopWatch time={time} />
            <div className="buttons-container">
                <StopWatchButton onClick={start} isDisabled={isRunning}>
                    Start
                </StopWatchButton>
                <StopWatchButton onClick={stop}>Stop</StopWatchButton>
                <StopWatchButton onClick={reset}>Reset</StopWatchButton>
            </div>
        </div>
    );
};

export default App;
