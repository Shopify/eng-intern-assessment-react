import React from 'react'

    interface StopWatchButtonProps {
        active: boolean;
        startStop: () => void;
        reset: ()  => void;
    }

    const StopWatchButton = ({
        active,
        startStop,
        reset
    }:StopWatchButtonProps) => {
    return(
    <div>
        <button onClick={startStop}>{active ? "Stop" : "Start"}</button>
        <button onClick={reset}>Reset</button>
    </div>
    )
    }
      export default StopWatchButton;