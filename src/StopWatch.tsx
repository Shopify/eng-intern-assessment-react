//Import required modules - UseState to declare state of variable and useEffect allows hooking
import React, {useState, useEffect} from 'react'
import StopWatchButton from './StopWatchButton';
import '../css/StopWatchStyles.css';


//Define the component for the StopWatch
const StopWatch = () => {
    
    //Create state variables
    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [isStarted, setStarted] = useState(false);

    //Function to handle the Start/stop button
    const handleStartButton = () => {
        setRunning(!isRunning);  //Like a lightswitch - Flips the state if timer is going on/off
        setStarted(true);      //Timer started
    }

    //Function to handle reset button - Resets timer to 0, deletes all laps
    const handleResetButton = () => {
        setTime(0);
        setLaps([]);
        setStarted(false); 
        setRunning(false); //Stops the timer
    }

    //Functions handles lap button - Add the current time to laps array
    const handleLapButton = () => {
        if (time > 0) {
        setLaps(laps.concat(time));
        }
    }

    //Create a display Component
    interface TimerDisplayInterface {
        time: number;
    }

    //Function formats time to HH:MM:SS:MS
    const formatTime = (time: number) => {
        let date = new Date(time);
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();
        let milliseconds = Math.floor(date.getUTCMilliseconds() / 10);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }

    //Create a display with the formatted time;
    const TimerDisplay: React.FC<TimerDisplayInterface> = ({ time }) => {
    return <h1>{formatTime(time)}</h1>;
}


    //useEffect to update timer for the running state
    useEffect (() => {
        let timer: ReturnType<typeof setInterval> | undefined;

        //If StopWatch is running, start timer by adding 10ms 
        if (isRunning) {
            timer = setInterval (() => {
                setTime(prevTime => prevTime +10);
            }, 10);
        }
        //Clean up function that when isRunning state or time changes, timer stops and cleanup process occurs
        return () => {
            if (timer) {
            clearInterval(timer);
            }
        };
    }, [isRunning]); 

    //Render the stopwatch component 
    return (
        <div className = "STOPWATCH">
            <h2> STOPWATCH </h2>
            <div className="timer_Container">
            <TimerDisplay time={time} />


            <div className="time_Labels">
                <span>HOURS</span>
                <span className = "buttonLabels">MINUTES</span>
                <span className = "buttonLabels" >SECONDS</span>
                <span className = "buttonLabels">MILLISECONDS</span>
            </div>
            </div>

        <div className = "Button_Container">
            <StopWatchButton onClick = 
                {handleStartButton} 
                buttonLabel = {isRunning? 'Stop': (isStarted ? 'Resume' : 'Start')}
            />

            <StopWatchButton onClick = 
                {handleLapButton}
                buttonLabel = "Lap"
            />

            <StopWatchButton onClick = 
                {handleResetButton}
                buttonLabel = "Reset"
            />
            </div>
            <div className="Lap_Container">
            {laps.map((lap,numLaps) => (
                <h3 key = {numLaps}> Lap {numLaps+1}: {formatTime(lap)} </h3>
            ))}
            </div>

        </div>
    );

}


//Export component for use
export default StopWatch;