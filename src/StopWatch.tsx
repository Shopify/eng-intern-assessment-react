import React from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    return(
        <div></div>
    )
}

// Implementation ideas
// Use a counter for timer, start will add 1 to count each second (milliseconds will be added after basic functionality is cleared)
// Stop will stop the counter
// Reset, self-explanatory will reset the counter to 0
// Lap button will display the difference in time from the previous lap button (or 0 if unpressed) to the current lap button press
// Lap button implementation could be done with pointers? Start pointer at 0 and add a new pointer each time lap is pressed
// Display could just take (time at lap button pressed) - (time at previous lap button pressed)