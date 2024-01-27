import React from 'react'

export default function StopWatchButton(props) {
    return(
        <div>
            <button 
                className="startButton" 
                onClick={() => props.onStart()}
            >
                Start
            </button>
            
            <button 
                className="stopButton" 
                onClick={() => props.onStop()}
            >
                Stop
            </button>
            
            <button
                className="resetButton" 
                onClick={() => props.onReset()}
            >
                Reset
            </button>
            
            <button 
                className="lapButton" 
                onClick={() => props.onLap()}
            >
                Lap
            </button>
        </div>
    )
}

// Four buttons are needed for this section,
// Start, Stop, Reset and Lap
// Steps were given in README.md
// - The stopwatch should start counting when the user clicks the start button.
// - The stopwatch should stop counting when the user clicks the stop button.
// - The stopwatch should reset to zero when the user clicks the reset button.
// - The stopwatch should record and display laps when user clicks the lap button.

// Based on the react documentation that was given with onClick, I could make 4 different buttons with an onStart, onStop, onReset and onLap
// Each of these buttons would respectively be tied to their functionality
// The four buttons here are modifications of the react tutorial on the tictactoe functionality