/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import timeGenerator from './timeGenerator';

/**
 * The stopwatch time element
 *
 * @param time - the time to be displayed
 * @return JSX Element of the time element
 */
export default function StopWatch(props: { time: number }) {
    return (
        <div>
            <p data-testid="timer-text" className="timer-text">{ timeGenerator(props.time) }</p>
        </div>
    );
}