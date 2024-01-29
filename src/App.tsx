import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { CSSProperties, useState } from 'react'

export default function App() {
    // CSS styling for the components to be displayed.
    const stopwatch_display: CSSProperties = {
        fontFamily:'Courier New',
        fontSize:'20vh',
        textAlign: 'center',
        height: '95vh',
            
    };
    const laps_style: CSSProperties = {
        fontSize:'0.3em',
        fontFamily:'Verdana',
        paddingTop:'5vh',
        overflowY: 'scroll',
        height: '30vh'
    };
    const message: CSSProperties = {
        fontSize:'0.3em',
        fontFamily:'Verdana',
        paddingTop:'5vh',
        color:'white'
    }

    // State keeping track of the time in hours:minutes:secodns
    const [time, setTime] = useState({hours:0, minutes:0, seconds:0});
    const [laps, setLaps] = useState(1);
    const [isRunning, setRunning] = useState(0);
    const [timeInt, setInt] = useState<NodeJS.Timer>();

    const start = () => {
        if (isRunning === 0){
            document.getElementById("message").innerHTML = "Stopwatch Running! <br/>";
            resume();
            setRunning(1);
            setInt(setInterval(resume, 1000));
        }
        if (isRunning === 1) {
            document.getElementById("message").innerHTML = "STOP PRESSING START! IT'S ALREADY RUNNING!!! <br/>";
        }
        if (isRunning === 2) {
            document.getElementById("message").innerHTML = "Resumed! <br/>";
            setRunning(1);
            resume();
            setInt(setInterval(resume, 1000));
        }
        
    }

    var seconds_rotation = time.seconds;
    var minutes_rotation = time.minutes;
    var hours_rotation = time.hours;


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

    const clear = () => {
        document.getElementById("message").innerHTML = "Cleared! <br/>";
        clearInterval(timeInt);
        setRunning(0);
        setTime({hours:0, minutes:0, seconds:0});
        document.getElementById("laps").innerHTML = "";
        seconds_rotation = 0;
        minutes_rotation = 0;
        hours_rotation = 0;
        setLaps(1);
        
    }
    const stop = () => {
        document.getElementById("message").innerHTML = "Stopped! <br/>";
        clearInterval(timeInt);
        setRunning(2);
    }
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
        setInt(setInterval(resume, 1000));
        setTime({hours:0, minutes:0, seconds:0});
    }

    
    return(
        <div style={stopwatch_display}>
            <StopWatch {...time}/>
            <StopWatchButton name={'Start'} bgcolor={'#bbe866'} onClick={start}/>
            <StopWatchButton name={'Stop'} bgcolor={'#fa6969'} onClick={stop}/>
            <StopWatchButton name={'Lap'} bgcolor={'#7e8ded'} onClick={lap}/>
            <StopWatchButton name={'Clear'} bgcolor={'#d6ebe6'} onClick={clear}/>
            <div id='message' style={message}>

            </div>
            <div id='laps' style={laps_style}>

            </div>
        </div>
        

    )
}