/**
 * @file StopWatch.tsx
 * @desc Custom React component for a stopwatch display
 * @author Hadi Naqvi
 */

import React, { CSSProperties } from 'react'
import { stopwatchContainerStyle, timeStyle, lapsStyle } from './styles';


/**
 * StopWatchProps interface that defines expected props for the StopWatch component
 * @interface StopWatchProps
 * @property {string} time - The time to be displayed on the stopwatch
 * @property {number} laps - The number of recorded laps to be displayed
 */
interface StopWatchProps {
    time: string;
    laps: number;
}

/**
 * StopWatch component that displays the current time and number of laps
 * @param {string} time - The current time displayed by the stopwatch
 * @param {number} laps - The number of laps being displayed
 * @returns {JSX.Element} - React component representing a stopwatch display
 */
export default function StopWatch({ time, laps }: StopWatchProps) {
    return (
        <div style={stopwatchContainerStyle}>
            {/* Stopwatch display */}
            <h1 style={timeStyle}>{time}</h1>

            {/* Laps display */}
            <h1 style={lapsStyle}>Laps: {laps}</h1>
        </div>
    );
}