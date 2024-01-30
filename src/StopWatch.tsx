import React, {useEffect, useState} from 'react';
import StopWatchButton from './StopWatchButton';

//this component will build the visual time aspect of the stopwatch
export default function StopWatch() {
    //checks the time
    const [isTime, setTime] = useState(0); 
    //checks if timer is active 
    const [isActive, setIsActive] = useState(false);

    const [laps, setLaps] = useState([])

    const [seconds, setSeconds] = useState(0); 
    const [minutes, setMinutes] = useState(0); 
    const [hours, setHours] = useState(0); 
    const [miliSeconds, setMiliSeconds] = useState(0); 

    //this entire section is used to increment the time 
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
    
        if (isActive) {
          intervalId = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [isActive]);


    
    //handles start/stop  when clicked 
    const handleStartStop = () => { 
        setIsActive(!isActive); 
    }; 
    //handles reset functionality when clicked 
    const handleReset = () => {
        setTime(0);
        setIsActive(false); 
        setLaps([]);
    };

    const handleLaps = () => {
        const lapTime = isTime;
        setLaps((prevLaps) => [...prevLaps, lapTime]);
    }

    //formats the current time display 
    const formatTime = (time: number): string => {
        let hours = Math.floor(time / 3600000);
        const remainingTime = time % 3600000;
        let minutes = Math.floor((remainingTime / 60000) % 60);
        let seconds = Math.floor((remainingTime / 1000) % 60);
        let milliseconds = Math.floor((remainingTime / 10) % 100);
    
        if (minutes >= 60) {
            const additionalHours = Math.floor(minutes / 60);
            hours += additionalHours;
            minutes %= 60;
        }
        
        const formattedMinutes = ("0" + minutes).slice(-2);
        const formattedSeconds = ("0" + seconds).slice(-2);
        const formattedMilliseconds = ("0" + milliseconds).slice(-2);
    
        return `${hours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    };

    return(
    //all of this shows up on the actual application 
    //the stopWatchButton connects the handling of the buttons while format time displays the time
    <div>
        <div className="stopwatch-container">
            <div className="lapMap"> 
                <p>{formatTime(isTime)}</p>
                <div>
                    {laps.map((lap, index) => (
                        <div key={index}>
                            Lap {index + 1}: {formatTime(lap)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="button-container">
                <StopWatchButton
                    active={isActive}
                    startStop={handleStartStop}
                    reset={handleReset}   
                    laps={handleLaps}
                />
            </div>
        </div>
    );
    }