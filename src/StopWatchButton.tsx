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
    }
    //components for button to work as needed 
    const StopWatchButton = ({
        active,
        startStop,
        reset,
    }:StopWatchButtonProps) => {
        ////if active then stop button if not then start button
        //reset button
    return(
    <div>
        <button onClick={startStop}>{active ? "Stop" : "Start"}</button>
        <button onClick={reset}>Reset</button>
    </div>
    )
    }
      export default StopWatchButton;