import React from "react";
import "./stylesheets/showLapsHistory.css"

type Props = {
    showLaps: String[]
}

export default function ShowLapsHistory(props: Props) {
    let count = 0;

    return (
        <div className="laps-main-content">
            
            {props.showLaps.length ? 
                props.showLaps.map(function(value) {
                    return <div key={count++} className="boxes">
                        <p> <span>Lap {count}:</span> {value} </p>
                    </div>
                }) :
                <p> There are currently no laps to display. Click on 'Start' to start the stopwatch and then on 'Lap' to record each lap! </p>
            }
            
        </div>
        
    )
}

