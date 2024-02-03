import React from 'react';

// Define the Props type for the StopWatchButton component
type Props = {
    onStart: () => void; // Function to handle the start button click event
    onStop: () => void; // Function to handle the stop button click event
    onLap: () => void; // Function to handle the lap button click event
    onReset: () => void; // Function to handle the reset button click event
}

// Define the StopWatchButton functional component
export default function StopWatchButton({ onStart, onStop, onLap, onReset }: Props) {

    return (
        // Render the buttons for start, stop, lap, and reset
        <div className='buttons'>
            <button className='button' id='start' onClick={onStart}>Start</button>
            <button className='button' id='stop' onClick={onStop}>Stop</button> 
            <button className='button' id='lap' onClick={onLap}>Lap</button>
            <button className='button' id='reset' onClick={onReset}>Reset</button>
        </div>
    );
}
