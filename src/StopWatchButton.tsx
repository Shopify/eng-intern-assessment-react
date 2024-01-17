import React from "react";
import { TimerState } from "./App";

export default function StopWatchButton({
    timerState,
    setTimerState,
    setLapSignal,
}: {
    timerState: TimerState;
    setTimerState: (timerState: TimerState) => void;
    setLapSignal: (lapSignal: boolean) => void;
}) {
    const handleStartAndStop = () => {
        if (timerState === TimerState.RUNNING) {
            setTimerState(TimerState.PAUSED);
        } else if (
            [TimerState.PAUSED, TimerState.RESETTING].includes(timerState)
        ) {
            setTimerState(TimerState.RUNNING);
        }
    };

    const isRunning = timerState === TimerState.RUNNING;

    return (
        <div className="button-wrapper">
            <div>
                <div className="button-text">
                    {isRunning ? "Stop" : "Start"}
                </div>
                <button
                    onClick={handleStartAndStop}
                    name={isRunning ? "Stop" : "Start"}
                    className={`button ${
                        isRunning ? "stop-button" : "start-button"
                    }`}
                    data-testid={isRunning ? "stop-button" : "start-button"}
                >
                    <div className="visual-button"></div>
                </button>
                <div className="button-line"></div>
            </div>
            <div>
                <div className="button-text">Reset</div>
                <button
                    onClick={() => {
                        setTimerState(TimerState.RESETTING);
                    }}
                    name="reset"
                    className="button reset-button"
                    data-testid="reset-button"
                >
                    <div className="visual-button"></div>
                </button>
                <div className="button-line"></div>
            </div>
            <div>
                <div className="button-text">Lap</div>
                <button
                    onClick={() => {
                        setLapSignal(true);
                    }}
                    name="lap"
                    className="button lap-button"
                    data-testid="lap-button"
                >
                    <div className="visual-button"></div>
                </button>
                <div className="button-line"></div>
            </div>
        </div>
    );
}
