import React, {useState} from 'react'
import "./styles.css";

//Lap type
type Lap = {
    lapNum: number;
    lapTime: number;
}
type Props = {
    laps: Array<Lap>;
}

export default function Laps({laps}: Props) {
    
    //Displaying lap format using stopwatch calculations
    //Laps div is scrollable to maintain page size
    return(
        <div>
            <h2>Laps:</h2>
            {laps.length>0&&<div className='laps'>
                <ul data-testid="laps">
                {laps.map((lap)=>
                    <li className='lap' key={lap.lapNum} data-testid="lap">
                        Lap: {lap.lapNum} Time:&nbsp;
                        {Math.floor(lap.lapTime/360000)}:
                        {Math.floor((lap.lapTime % 360000)/6000).toString().padStart(2,"0")}:
                        {Math.floor((lap.lapTime%6000)/100).toString().padStart(2, "0")}:
                        {Math.floor(lap.lapTime%100).toString().padStart(2, "0")}
                        </li>
                )}</ul>
            </div>}
        </div>
    )
}