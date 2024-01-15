import React from 'react'

/**
 * Interface for stopwatch component.
 */
interface stopWatchProps {
    time: number
}

/**
 * Purpose:
 *      Interface to receive time. Allows for displaying of
 *      time using state from App function.
 * 
 * Params:
 *      time - number - current time
 */
export default function StopWatch({time}: stopWatchProps) {
    return(
        <div>
            <p>
                Time Remaining: {time}
            </p>
        </div>
    )
}