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
        <button className={active ? 'stopButton' : 'startButton'} onClick={startStop}>{active ? "Stop" : "Start"}</button>
        <button className="resetButton" onClick={reset}>Reset</button>
        <button className="lapsButton" onClick={laps}>Laps</button>
    </div>
    )
    }
      export default StopWatchButton;