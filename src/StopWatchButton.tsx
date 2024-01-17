import React from "react";
import { TimerState } from "./App";

export default function StopWatchButton({
    timerState,
    setTimerState,
    lapSignal,
    setLapSignal,
}: {
    timerState: TimerState;
    setTimerState: (timerState: TimerState) => void;
    lapSignal: boolean;
    setLapSignal: (lapSignal: boolean) => void;
}) {
    return (
        <div className="button-wrapper">
            <div>
                <div className="button-text">
                    {timerState === TimerState.RUNNING ? "Stop" : "Start"}
                </div>
                <button
                    onClick={() => {
                        if (timerState === TimerState.RUNNING) {
                            setTimerState(TimerState.PAUSED);
                        } else if (
                            [TimerState.PAUSED, TimerState.RESETTING].includes(
                                timerState
                            )
                        ) {
                            setTimerState(TimerState.RUNNING);
                        }
                    }}
                    name={timerState === TimerState.RUNNING ? "Stop" : "Start"}
                    className={`button ${
                        timerState === TimerState.RUNNING
                            ? "stop-button"
                            : "start-button"
                    }`}
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
                >
                    <div className="visual-button"></div>
                </button>
                <div className="button-line"></div>
            </div>
        </div>
    );
}
