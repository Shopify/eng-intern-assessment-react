import React, { useEffect, useState, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles.css'

export default function StopWatch() {
    //State to track the elapsed time in milliseconds.
    const [time, setTime] = useState<number>(0);

    //State to track stop watch display
    const [stopWatchTime, setStopWatchTime] = useState<string>('');

    //State to track if the stopwatch is currently running 
    const [isActive, setIsActice] = useState<boolean>(false);

    //State to store the lap times.
    const [laps, setLaps] = useState<number[]>([]);
    
    // State to track the last recorded lap.
    const [lastLap, setLastLap] = useState(0);

    //useRef to store the stopwatch interval for clearing 
    const interval = useRef<NodeJS.Timeout | null>(null);

    /**
     * Effect hook to manage and update time interval when the stopwatch is active.
     * Time set up with setInterval when the setTime calls for every 10 seconds.
     * Make sure to clean up the memory when the component isActive changes.
     */
    useEffect(() => {
        // Clean up any existing interval
        clearInterval(interval.current);
    
        // Set a new interval only if isActive is false
        if (isActive) {
            interval.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    
        // Function to clear the interval when the component unmounts or when isActive changes
        return () => clearInterval(interval.current);
    }, [isActive]);
    
    /**
     * Effect hook to update the stopwatch display time whenever the time changes
     */
    useEffect(() => {
        setStopWatchTime(formatTime(time));
    }, [time]);

    /**
     * Hanlde the start button click event and set the active state to active
     */
    const handleStartButton = () => {
        setIsActice(true);
    }

    /**
     * Handle the stop button click event and set the active state to inactive
     */
    const handleStopButton = () => {
        setIsActice(false);
        if(!isActive){
            setLastLap(time);
        }
    }

    /**
     * Handle the reset button click event and set the active state to inactive 
     * also reset the time to 0 and clear all the lap.
     */
    const handleResetButton = () => {
        setIsActice(false);
        setTime(0);
        setLaps([]);
        setLastLap(0);
    }
    
    /**
     *  Handles the lap button click event, adds a lap time if the stopwatch is active.
     * Record teh current lap time.
     */
    const handleLapButton = () =>{
        if(isActive){
            const lapTime = time - lastLap
            setLaps([...laps, lapTime]);
            setLastLap(time);
        }  
    }

    /**
     * Formats time in milliseconds to the string representation in HH:MM:SS.SSS => 00:00:00.00
     * @param {number} time in milliseconds.
     * @returns {string} formatted time string.
     */
    const formatTime = (time: number): string => {
        //Calculate hours from 1 hours = 3600000 milliseconds and 1 day = 24 hours in range 0 to 23.
        const hours = Math.floor((time / 3600000) % 24);

        //Calculate minutes from 1 minute = 60000 milliseconds and 1 hour = 60 minutes in range 0 to 59.
        const minutes = Math.floor((time / 60000) % 60);

        //Calculate minutes from 1 second = 1000 milliseconds and 1 minute = 60 seconds in range 0 to 59.
        const seconds = Math.floor((time / 1000) % 60);

        //Calculate millisecond by extracting the millisecond and dividing by 10 to get tenths of second.
        const milliseconds = Math.floor((time % 1000) / 10);

        /**
         * Function to format the individual details of time in 2 two digits.
         * @param {number} digits 
         * @returns  formatted time details string.
         */
        const formatTimeDetails = (digits:  number) : string => digits.toString().padStart(2, '0');

        return `${formatTimeDetails(hours)}:${formatTimeDetails(minutes)}:${formatTimeDetails(seconds)}:${formatTimeDetails(milliseconds)}`
    };

  return (
    <div className='main-container'>
        <h1>Stop Watch</h1>
        <div>{stopWatchTime}</div>
        <StopWatchButton 
            onStart={handleStartButton} 
            onStop={handleStopButton} 
            onReset={handleResetButton} 
            onLap={handleLapButton} 
            isActive = {isActive}
        />
        <ul className='lap-container'>
              {/**Create shallow copy of the array without modify the orginal array and reverse them 
               * so that it will display the lastest to oldest lap.
              */}
            {laps.slice().reverse().map((lap, index) => (
                <li key={index} className='lap-item'>
                      {/* Display lap number (from latest to oldest) */}
                    <span className="lap-number">{`Lap ${laps.length - index}`}</span>
                    <span className="lap-time">{formatTime(lap)}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}
