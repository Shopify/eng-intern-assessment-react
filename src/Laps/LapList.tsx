import {formatTime} from "../utils";
import React from "react";
import {Lap} from "./types";
import './Laps.scss'
const LapList = ({laps}: { laps: Array<Lap> }) => (
        <div className="lap-list">
            {laps.map((lap) => (
                <div className="lap-row" key={lap.lapNumber}>
                    <div>Lap: {lap.lapNumber}</div>
                    <div>{formatTime(lap.lapTime)}</div>
                </div>
            ))}
        </div>
    )


export default LapList