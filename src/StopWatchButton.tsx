/**
 * @file StopWatchButton.tsx
 * @desc Custom React component for a stopwatch button
 * @author Hadi Naqvi
 */

import React, { useState } from 'react'
import { buttonStyle } from './styles'

/**
 * StopWatchButtonProps interface that defines expected props for the StopWatchButton component
 * @interface StopWatchButtonProps
 * @property {string} time - The name of the button
 * @property {function} onclick - The callback function executed upon clicking the button
 * @property {colour} colour - The colour of the button
 */
interface StopWatchButtonProps {
    name: string;
    onClick: () => void;
    colour: string;
}

/**
 * StopWatchButton component, a control button for a stopwatch
 * @param {string} name - The name of the button
 * @param {function} laps - The callback function executed upon clicking the button
 * @param {colour} - The colour of the button
 * @returns {JSX.Element} - React component representing a stopwatch button
 */
export default function StopWatchButton({name, onClick, colour}: StopWatchButtonProps) {
    return(
        <div>
            <button onClick={onClick} style={buttonStyle(colour)}>
                {name}
            </button>
        </div>
    )
}