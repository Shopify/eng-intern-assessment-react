import React, { useEffect, useRef, useState } from "react";
import { TimerState } from "./App";

export default function StopWatch({
    timerState,
    lapSignal,
    setLapSignal,
}: {
    timerState: TimerState;
    lapSignal: boolean;
    setLapSignal: (lapSignal: boolean) => void;
}) {
    const [time, setTime] = useState(0);
    // use pauseTime to keep track of how much time was on the clock when it was paused
    const pauseTime = useRef<number>(0);
    // used to trigger the creation of a new lap
    const [laps, setLaps] = useState<string[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (timerState === TimerState.RUNNING) {
            pauseTime.current = time;
            // subtract pauseTime from the initial time to add that much time to the clock
            const initialTime = new Date().getTime() - pauseTime.current;

            interval = setInterval(() => {
                const currentMilliseconds = new Date().getTime() - initialTime;
                setTime(currentMilliseconds);
            }, 10);
        }
        if (timerState === TimerState.RESETTING) {
            pauseTime.current = 0;
            setTime(0);
            setLaps([]);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timerState]);

    const currentHours = Math.floor(time / 360000) % 60;
    const currentMinutes = Math.floor(time / 60000) % 60;
    const currentSeconds = Math.floor(time / 1000) % 60;

    const timeString =
        `${
            String(currentHours).length < 2 ? "0" + currentHours : currentHours
        }:${
            String(currentMinutes).length < 2
                ? "0" + currentMinutes
                : currentMinutes
        }:${
            String(currentSeconds).length < 2
                ? "0" + currentSeconds
                : currentSeconds
        }:${
            String(time % 1000).length < 2
                ? "00" + (time % 1000)
                : String(time % 1000).length < 3
                ? "0" + (time % 1000)
                : time % 1000
        }` || "00:00:00:000";

    useEffect(() => {
        if (!lapSignal) return;
        setLaps([...laps, timeString]);
        setLapSignal(false);
    }, [lapSignal]);

    return (
        <div className="stopwatch-wrapper">
            <div className="stopwatch-border">
                <div className="stopwatch" data-testid="time">
                    {timeString}
                </div>
            </div>
            <div className="laps-wrapper">
                {/* we want the most recent laps to appear on top, so reverse by copy before mapping */}
                {[...laps].reverse().map((lap, index) => (
                    <div key={lap + index} className="lap-border">
                        <div className="lap">{lap}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
