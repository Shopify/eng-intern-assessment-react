import React from 'react'

interface StopWatchButtonProps {
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
}

// props parameter is being sent to StopWatchButton
// This is expected to pass the data between the buttons and the functions the correlate to
export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div>

            {/* Four buttons are being set here for different functionalities
            The general button function can be found in the reactjs docs provided
            Each button has an onClick function that is then tied to a function
            These functions are respectively given onStart, onStop, onReset and onLap
            Said functions will be tied into StopWatch.tsx when being used in the App */}
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
    );
}

// Four buttons are needed for this section,
// Start, Stop, Reset and Lap
// Steps were given in README.md
// - The stopwatch should start counting when the user clicks the start button.
// - The stopwatch should stop counting when the user clicks the stop button.
// - The stopwatch should reset to zero when the user clicks the reset button.
// - The stopwatch should record and display laps when user clicks the lap button.

// Based on the react documentation that was given with onClick, I could make 4 different buttons with an onStart, onStop, onReset and onLap
// The four buttons here are modifications of the react tutorial on the tictactoe functionality