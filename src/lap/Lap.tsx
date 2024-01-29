import React from "react";
import './styles.css'

type LapProps = {
    lapNumber: number;
    time: string;
}

export default function Lap({lapNumber, time}: LapProps) {
    return (
        <div className="lap">
            <div className="lapName">Lap {lapNumber}</div>
            <div className="lapChaser" />
            <div className="lapTime">{time}</div>
        </div>
    )
}