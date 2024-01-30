import React from "react";
import './styles/LappedTime.scss';

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

                    let lapFormat: string = `${hoursFormat}:${minutesFormat}:${secondsFormat}`

                return (
                    <div key={lap} data-testid="lap_test">
                        <p className="laps_time">{lapFormat}</p>
                    </div>
                )
            } )}
        </div>
    )
}