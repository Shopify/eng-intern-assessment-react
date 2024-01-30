import React from "react";
import './styles.css';
import Lap from '../lap/Lap';

type LapsBoxProps = {
    laps: string[]
}

export default function LapsBox({ laps }: LapsBoxProps) {
    return (
        <div className="lapsContainer">
            <h2>Laps</h2>
            <div className="lapTimes">
                {laps.map((lap, i) => <Lap key={i} lapNumber={i} time={lap}/>)}
            </div>
        </div>
    )
}