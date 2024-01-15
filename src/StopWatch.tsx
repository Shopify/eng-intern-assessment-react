import React from 'react';
import moment from 'moment';

/**
 * Interface for stopwatch component.
 */
interface stopWatchProps {
    time: moment.Duration
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
    const hours = Math.floor(time.asHours());
    const minutes = time.minutes();
    const seconds = time.seconds();
    return(
        <div>
            <p>
                Current Time(Hours, Minutes, Seconds): {hours}:{minutes}:{seconds}
            </p>
        </div>
    )
}