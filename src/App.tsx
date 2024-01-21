import React, {useState} from 'react'
import StopWatch from "./StopWatch/StopWatch";
import './index.scss'
import {Lap} from "./Laps/types";
import LapList from "./Laps/LapList";

export default function App() {
    const [laps, setLaps] = useState<Array<Lap>>([])
    return(
        <div className="app-container">
            <StopWatch setLaps={setLaps}/>
            <LapList laps={laps} />
        </div>
    )
}