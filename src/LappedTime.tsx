import React, {useState} from "react";

type LappedTimeProps = {
    lappedTime: number[];
};

export default function LappedTime (props:LappedTimeProps) {

    const {lappedTime} = props;

    return (
        <div className="laps">
            <p className="laps_heading">Lapped Time</p>
            {lappedTime.map((lap: number) => {
                
                    let hours: number= Math.floor(lap/ 3600);
                    let minutes: number= Math.floor((lap - (hours * 3600)) / 60);
                    let seconds: number= lap - (hours * 3600) - (minutes * 60);

                    let hoursFormat = hours < 10 ? `0${hours}` : hours;
                    let minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
                    let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

                return (
                    <div key={lap} data-testid="lap_test">
                    <span className="laps_time">{hoursFormat}</span>
                    <span>:</span>
                    <span className="laps_time">{minutesFormat}</span>
                    <span>:</span>
                    <span className="laps_time">{secondsFormat}</span>
                    </div>
                )
            } )}
        </div>
    )
}