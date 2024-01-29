import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { CSSProperties, useState } from 'react'

export default function App() { 
    // State variable keeping track of the time (hours:minutes:seconds).
    const [time, setTime] = useState({hours:0, minutes:0, seconds:0});
    // State variable to keep track of how many laps have been made so far.
    const [laps, setLaps] = useState(1);
    // State variable to store whether the watch is running, paused, stopped
    // 0 -> stopped,  1 -> running,  2 -> paused
    const [isRunning, setRunning] = useState(0);
    // State variable to track the time intervals while the watch is running.
    const [timeInt, setInt] = useState<NodeJS.Timer>();

    // CSS styling for the components.
    const stopwatch_display: CSSProperties = {
        fontFamily:'Courier New',
        fontSize:'20vh',
        textAlign: 'center',
        height: '95vh',
        backgroundColor: 'orange',
        borderRadius: '15px'
            
    };
    const laps_style: CSSProperties = {
        fontSize:'0.3em',
        fontFamily:'Verdana',
        paddingTop:'5vh',
        overflowY: 'scroll',
        height: '30vh',
        bottom: '1vh'
    };
    const message: CSSProperties = {
        fontSize:'0.3em',
        fontFamily:'Fantasy',
        paddingTop:'5vh',
    }

    // the start function would start the watch after correctly setting the state variables. If the watch was paused, it will resume.
    const start = () => {
        // if the watch is stopped, start the watch and set the time interval to 1000ms (1 sec).
        if (isRunning === 0){
            document.getElementById("message").innerHTML = "Stopwatch Running! <br/>";
            resume();
            setRunning(1);
            setInt(setInterval(resume, 1000));
        }
        // if the watch is already running, inform the user that it is already running.
        if (isRunning === 1) {
            document.getElementById("message").innerHTML = "STOP PRESSING START! IT'S ALREADY RUNNING!!! <br/>";
        }
        // if watch is stopped, call resume and set the variables accordingly
        if (isRunning === 2) {
            document.getElementById("message").innerHTML = "Resumed! <br/>";
            setRunning(1);
            resume();
            setInt(setInterval(resume, 1000));
        }
        
    }

    // variables to store the current time (specially for the laps).
    var seconds_rotation = time.seconds;
    var minutes_rotation = time.minutes;
    var hours_rotation = time.hours;

    // resume function updates the timer, 1 minute every 60 seconds, and 1 hour every 60 minutes.
    const resume = () => {
        if (seconds_rotation === 60) {
            minutes_rotation++;
            seconds_rotation = 0;
        }
        if (minutes_rotation === 60) {
            hours_rotation++;
            minutes_rotation=0;
        }
        seconds_rotation++;
        return setTime({hours:hours_rotation, minutes:minutes_rotation, seconds:seconds_rotation});
    };

    // Reset function stops the stopwatch and resets the time to 00:00:00. It also clears and resets the laps and current time variable to fully restart the clock's timer to 0.
    const reset = () => {
        document.getElementById("message").innerHTML = "Reset! <br/>";
        clearInterval(timeInt);
        setRunning(0);
        setTime({hours:0, minutes:0, seconds:0});
        document.getElementById("laps").innerHTML = "";
        seconds_rotation = 0;
        minutes_rotation = 0;
        hours_rotation = 0;
        setLaps(1);
        
    }

    // stop function pauses the watch by clearing the interval and setting running state to 2 (pause).
    const stop = () => {
        document.getElementById("message").innerHTML = "Stopped! <br/>";
        clearInterval(timeInt);
        setRunning(2);
    }

    // lap function to display the current lap, update the lap state by 1, and reset the time to 00:00:00 and either resume or pause the timer based on the current running state.
    const lap = () => {
        let lapHours: string = time.hours < 10 ? '0'+time.hours.toString() : time.hours.toString();
        let lapMinutes: string = time.minutes < 10 ? '0'+time.minutes.toString() : time.minutes.toString();
        let lapSeconds: string = time.seconds < 10 ? '0'+time.seconds.toString() : time.seconds.toString();
        let lapTime: string = lapHours + ":" + lapMinutes + ":" + lapSeconds;

        document.getElementById("laps").innerHTML =  "Lap " + laps.toString() + ": " + lapTime+"<br/>" + document.getElementById("laps").innerHTML;
        document.getElementById("message").innerHTML = "Lap created! <br/>";

        setLaps(laps => laps+1);
        clearInterval(timeInt);
        seconds_rotation = 0; minutes_rotation = 0; hours_rotation = 0;
        isRunning===1 ? setInt(setInterval(resume, 1000)) : "";
        setTime({hours:0, minutes:0, seconds:0});
    }

    // Display each component: The Stopwatch display, the buttons, the running state message, and the laps.
    return(
        <div style={stopwatch_display}>
            <StopWatch {...time}/>
            <StopWatchButton name={'Start'} bgcolor={'#bbe866'} onClick={start}/>
            <StopWatchButton name={'Stop'} bgcolor={'#fa6969'} onClick={stop}/>
            <StopWatchButton name={'Lap'} bgcolor={'#7e8ded'} onClick={lap}/>
            <StopWatchButton name={'Reset'} bgcolor={'#d6ebe6'} onClick={reset}/>
            <div id='message' style={message}>
                First ever stopwatch!
            </div>
            <div id='laps' style={laps_style}>

            </div>
        </div>
        

    )
}