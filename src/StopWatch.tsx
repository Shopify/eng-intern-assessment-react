import React, { useState, useEffect } from 'react';
import './StopWatch.css';
import StopWatchButton from './StopWatchButton';

type Lap = {
    lapNumber: number;
    time: string;
  };  

  export default function StopWatch() {
    const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(0);
    const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<Lap[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number>(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;//update using Javascript built-in timer (may need to be improved upon later-on due to javascript inconcistencies)
        if (isRunning) {
            interval = setInterval(() => {
                setTimeInMilliseconds((prevTime) => prevTime + 10);
            }, 10); 
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    function calculateTime(timeInMilliseconds: number): Array<number|string> {//calulate minutes, seconds and milliseconds from timeInMilliseconds
        let minutes: number = Math.floor(timeInMilliseconds / 60000);
        let seconds: number = Math.floor((timeInMilliseconds % 60000) / 1000);
        let milliseconds: number = timeInMilliseconds % 1000;
    
        let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes.toString();
        let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds.toString();
        let millisecondsFormatted = (milliseconds).toString().padStart(3, "0");;;
        return [minutesFormatted, secondsFormatted, millisecondsFormatted];
    }

    // Utility function to convert time string to milliseconds
    function timeToMilliseconds(time: string): number {
        const [minutes, seconds, milliseconds] = time.split(':').map(Number);
        return minutes * 60000 + seconds * 1000 + milliseconds;
    }

    // Compute min and max times before rendering
    const minTime = Math.min(...laps.map(lap => timeToMilliseconds(lap.time)));
    const maxTime = Math.max(...laps.map(lap => timeToMilliseconds(lap.time)));


    useEffect(() => {
        let timerArray: Array<number | string> = calculateTime(timeInMilliseconds);
        setTimerArray(timerArray);
    }, [timeInMilliseconds]);

    const handleStartStop = () => {//flip isRunning when start stop is clicked
        setIsRunning(!isRunning);
    };

    const handleReset = () => {//reset the timer to 0 milliseconds, set isRunning to false and empty the laps array 
        setTimeInMilliseconds(0);
        setIsRunning(false);
        setLaps([]);
        setLastLapTime(0);
    };

    const handleLap = () => {
        const lapTime = timeInMilliseconds - lastLapTime;
        const newLap = {
            lapNumber: laps.length + 1,
            time: calculateTime(lapTime).join(':')
        };
        setLaps([...laps, newLap]);
        setLastLapTime(timeInMilliseconds);
    };

    return(
        <div className='stopwatch-div'>
            <div className='stopwatch-time'>{`${timerArray[0]}:${timerArray[1]}.${timerArray[2]}`}</div>
            <StopWatchButton onClick={handleStartStop} label={isRunning ? 'Stop' : 'Start'} />
            <StopWatchButton onClick={isRunning ? handleLap : handleReset} label={isRunning ? 'Lap' : 'Reset'} />
            <div className="laps-table">
            {laps.map((lap) => {
                    const lapTimeInMilliseconds = timeToMilliseconds(lap.time);
                    let textStyle = {};
                    if (lapTimeInMilliseconds === minTime) {
                        textStyle = { color: 'green' };
                    } else if (lapTimeInMilliseconds === maxTime) {
                        textStyle = { color: 'red' };
                    }

                    return (
                        <div key={lap.lapNumber} style={textStyle}>
                            Lap {lap.lapNumber}: {lap.time}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}