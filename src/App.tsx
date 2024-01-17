import React from 'react';
import { useState, useEffect } from 'react';
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton';
import moment from 'moment';

/**     Application background
 * 
 *  General concept:
 *      build a stopwatch that allows the user to
 *      click the start, stop, and reset buttons.
 * 
 *      The timer will be counting up from 0, and have
 *      an accuracy of 1 second.
 * 
 *  Approach template
 *      This will require 2 main aspects to work correctly
 *      1. The time will need to be displayed correctly and
 *          work with the 3 buttons on the display
 *          For this they will be inside of a useState
 *          that will allow for constant rendering on the 
 *          display itself.
 *      2. There will need to be a boolean value that
 *          records if the watch is running or stopped.
 *          This will also be inside of a useState<boolean>
 *      
 *      By passing a time prop to the actual stopwatch
 *      this allows us to use this for updating the component.
 *      This will only be changed by the reset button.
 *      Where the start and stop will change the boolean value
 *      of the isRunning.
 * 
 *      Due to react not actually being multi threaded, We also
 *      have to take into consideration the looping not being
 *      perfect. Without the ability to work have time on one
 *      thread and other things on another thread this adds
 *      some level of variability to timing. As the timer
 *      might have to wait for a different process to run.
 * 
 *      For the lap timer, ive decided that adding a second timer
 *      and incrementing the time, then setting it to zero at the
 *      same time as the main should work fast enough, as this
 *      does not require any other loops, and behind the screen 
 *      should use minimal instructions to increment the secondary
 *      lap counter, to then also record both total time and
 *      lap time.
 *      
 *      
 *  Key Features:
 *      The stopwatch should start counting when the user clicks the start button.
 *      The stopwatch should stop counting when the user clicks the stop button.
 *      The stopwatch should reset to zero when the user clicks the reset button.
 *      The stopwatch should record and display laps when user clicks the lap button.
 */


/**
 *  Purpose:
 *      Main root of react components, holds all
 *      essential functions to allow the functionality
 *      of the stopwatch to work.
 */
export default function App() {
    const [time, setTime] = useState<moment.Duration>(moment.duration(0));
    const [lapTime, setLapTime] = useState<moment.Duration>(moment.duration(0));
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, addLap] = useState<moment.Duration[]>([]);

    // When the timer is on, increase the count
    useEffect(() => {
        const timer = setInterval(() => {
            // check to verify that the timer is active
            if (isRunning) {
                // increase time by 1 second
                setTime((prevTime) => moment.duration(prevTime).add(1, 's'));
                setLapTime((prevLapTime) => moment.duration(prevLapTime).add(1, 's'));
            }
        }, 1000)

        return () => clearInterval(timer);
    }, [isRunning])

    return(
        <div>
            <StopWatch time={time} />
            <StopWatchButton setIsRunning={setIsRunning} setTime={setTime} time={time} addLap={addLap} laps={laps} lapTime={lapTime} setLapTime={setLapTime} />

            {laps.length > 0 && (
                <div>
                <h2>Lap Times:</h2>
                <ul>
                    {laps.map((lap, index) => (
                    <li key={index}>Hours:Minutes:Seconds: {Math.floor(lap.asHours())}:{lap.minutes()}:{lap.seconds()}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    )
}