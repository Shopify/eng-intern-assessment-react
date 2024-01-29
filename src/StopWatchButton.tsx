import React from 'react'

    //set up interface for Button
    interface StopWatchButtonProps {
        //is running
        active: boolean;
        //is stopped or started
        startStop: () => void;
        //is reset
        reset: ()  => void;
        //is lap functionality 
        laps: () => void;
    }
    //components for button to work as needed 
    const StopWatchButton = ({
        active,
        startStop,
        reset,
        laps
    }:StopWatchButtonProps) => {
        ////if active then stop button if not then start button
        //reset button
    return(
    <div>
        <button onClick={startStop}>{active ? "Stop" : "Start"}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={laps}>Laps</button>
    </div>
    )
    }
      export default StopWatchButton;