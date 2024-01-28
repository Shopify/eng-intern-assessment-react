/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import timeGenerator from './timeGenerator';

/**
 * Generates a row in a grid of list items
 *
 * @param lapNumber - the number for each laps
 * @param absTime - the absolute time
 * @param lapTime - the lap time
 * @return JSX Element that is the grid of items
 */
export default function LapComponent(props: { lapNumber: number, absTime: number, lapTime: number }) {
    return(
        <div>

            {/** Creates a grid for the 3 items */}
            <div className="lap-grid">
                <p>{ (props.lapNumber + 1) + "." }</p>
                <p>{ timeGenerator(props.absTime) }</p>
                <p>{ timeGenerator(props.lapTime) }</p>
            </div>
            <hr></hr>
        </div>
    )
}