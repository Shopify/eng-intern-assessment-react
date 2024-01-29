import React, {useState} from "react";

type LappedTimeProps = {
    lappedTime: number[];
};

export default function LappedTime (props:LappedTimeProps) {

    const {lappedTime} = props;


    return (
        <div className="laps">
            <p className="laps_heading">Lapped Time</p>
            {lappedTime.map((lap) => {
                return (
                    <div>
                    <p className="laps_recorded">{lap}</p>
                    </div>
                )
            } )}
        </div>
    )
}