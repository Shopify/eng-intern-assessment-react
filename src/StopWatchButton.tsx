import React from 'react'
import './styles.css'

/**
 * Props for StopWatchButton component
 * @param isActive is true if the stopwatch is active (running), fasle otherwise.
 * @param onStart is a void function that starts the stopwatch.
 * @param onStop is a void function that stops the stopwatch.
 * @param onReset is a void function that reset the stopwatch.
 * @param onLap is a void function that records a lap.
 */
interface StopWatchButtonProps{
    isActive: boolean;
    onStart:() => void;
    onStop:() => void;
    onReset:() => void;
    onLap:() => void;
}

/**
 * StopWatchButton component for creating the button to control the stopwatch.
 * @param isActive indicates whether the stopwatch is active or not.
 * @param onStart is a function to handle the start button click.
 * @param onStop is function to handle the stop button click.
 * @param onReset is function to handle the reset button click.
 * @param onLap is function to handle the lap button click.
 * @returns element representing the buttons that will be use in StopWatch.
 */
export default function StopWatchButton({isActive, onStart, onStop, onReset, onLap}: StopWatchButtonProps) {
    return(
        <div className='button-container'>
            {isActive ? (
            <div>
                <button onClick={onLap} className="lap-button">Lap</button>
                <button onClick={onStop} className="stop-button">Stop</button>
            </div>
            ) : (
            <div>
                <button onClick={onReset} className="reset-button" >Reset</button>
                <button onClick={onStart} className="start-button">Start</button>
            </div>
        )}
        </div>
    )
}