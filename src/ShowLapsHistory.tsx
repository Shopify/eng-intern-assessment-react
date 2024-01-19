// Import Libraries & Components
import React from "react";
import "./stylesheets/showLapsHistory.css"

// Define the prop types for the ShowLapsHistory component
type Props = {
    showLaps: String[]
}

export default function ShowLapsHistory(props: Props) {
    let count = 0;

    return (
        <div className="laps-main-content">

            {/* 
                Uses a ternary operator to check if `showLaps` has any value or not. If it does, we are mapping through the array of strings, and adding each of those laps inside a div, with a unique KEY assigned to the div. If the prop does not contain any value, we are simply printing a line.
            */}

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
