import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
//import { time } from "console";

export default function StopWatch() {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [laps, setLaps] = useState<Array<string>>(["00:00:00"]);
    const [totalTime, setTotalTime] = useState<Array<string>>(["00:00:00"]);
    const [run, setRun] = useState<boolean>(false);

    const formatZero = (num: number): string => {
        if (num < 10) {
            return "0" + num;
        } else return num.toString();
    };

    const recordLap = (reset: boolean) => {
        if (reset) {
            setLaps([]);
        } else {
            let lastLap: string = totalTime.slice(-1).toString();
            let newLap: string = formatZero(hours) + ":" + formatZero(minutes) + ":" + formatZero(seconds);

            let time1 = new Date(`2011-10-10T${lastLap}`);
            let time2 = new Date(`2011-10-10T${newLap}`);

            let secDiff = Math.abs(time2.getSeconds() - time1.getSeconds());
            let minDiff = Math.abs(time2.getMinutes() - time1.getMinutes());
            let hrsDiff = Math.abs(time2.getHours() - time1.getHours());

            let resultLap: string = `${formatZero(hrsDiff)}:${formatZero(minDiff)}:${formatZero(secDiff)}`;

            setLaps([...laps, resultLap]);
            setTotalTime([...totalTime, newLap]);
        }
    };

    useEffect(() => {
        let interval: number;

        if (run) {
            interval = window.setInterval(() => {
                setSeconds((seconds: number) => {
                    if (seconds >= 59) {
                        setMinutes((minutes: number) => {
                            if (minutes >= 59) {
                                setHours((hours: number) => hours + 1);
                                return 0;
                            } else {
                                return minutes + 1;
                            }
                        });

                        return 0;
                    } else {
                        return seconds + 1;
                    }
                });

                return 0;
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [run]);

    return (
        <div>
            <div className="timeDisplay">
                {formatZero(hours)} : {formatZero(minutes)} : {formatZero(seconds)}
                <StopWatchButton
                    setRun={setRun}
                    setSeconds={setSeconds}
                    setMinutes={setMinutes}
                    setHours={setHours}
                    recordLap={recordLap}
                />
                <ol> {laps.toString()} </ol>
                <ol> {totalTime.toString()} </ol>
            </div>
        </div>
    );
}
