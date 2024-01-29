import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
//import { time } from "console";

export default function StopWatch() {

    //defining variables that will change states
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [laps, setLaps] = useState<Array<string>>(["00:00:00"]); //array that records/stores the laps
    const [totalTime, setTotalTime] = useState<Array<string>>(["00:00:00"]); //array that records/stores the total time elapsed when lap was recorded
    const [run, setRun] = useState<boolean>(false); //tracks start/stop

    //function to format single digit numbers with 0s, making the numbers easier to read for the user
    const formatZero = (num: number): string => {
        if (num < 10) {
            return "0" + num;
        } else return num.toString();
    };

    //function to record laps, takes a boolean as a parameter to track whether or not the array should be empty on reset
    const recordLap = (reset: boolean) => {
        if (reset) {
            setLaps([]);
        } else {
            let lastLap: string = totalTime.slice(-1).toString(); //take the time for the last lap
            let newLap: string = formatZero(hours) + ":" + formatZero(minutes) + ":" + formatZero(seconds); //take the current time

            //turn the last lap and current time into Date objects for further calculation
            let time1 = new Date(`2011-10-10T${lastLap}`);
            let time2 = new Date(`2011-10-10T${newLap}`);

            //calculate the difference between the last lap and current time
            let secDiff = Math.abs(time2.getSeconds() - time1.getSeconds());
            let minDiff = Math.abs(time2.getMinutes() - time1.getMinutes());
            let hrsDiff = Math.abs(time2.getHours() - time1.getHours());

            //create a string with the difference in time
            let resultLap: string = `${formatZero(hrsDiff)}:${formatZero(minDiff)}:${formatZero(secDiff)}`;

            setLaps([...laps, resultLap]);  //adding the difference as a lap in the lap array
            setTotalTime([...totalTime, newLap]); //adding the current time to the totalTime array
        }
    };

    //using the useEffect hook for the timer with window.setInterval as a timer
    useEffect(() => {
        let interval: number;

        //if the start button is pressed, start the interval and calculate the seconds, minutes, hours from that interval at every second
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

        //if not running, then stop the timer where it is
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
