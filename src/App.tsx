import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton';

/**     Application background
 * 
 *  General concept:
 *      build a stopwatch that allows the user to
 *      click the start, stop, and reset buttons.
 * 
 *      The timer will be counting up from 0, and have
 *      an accuracy of 2 decimal points allowing for the
 *      user to have a greater amount of accuracy
 *      within the timer
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
 */

/**
 *  Purpose:
 *      Main root of react components, holds all
 *      essential functions to allow the functionality
 *      of the stopwatch to work.
 */
export default function App() {
    const [time, setTime] = React.useState<number>(0.00);
    const [isRunning, setIsRunning] = React.useState<boolean>(false);
    return(
        <div>
            <StopWatch time={time} />
            <StopWatchButton setIsRunning={setIsRunning} setTime={setTime} />
        </div>
    )
}