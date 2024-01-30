import React from "react";
import './styles/LappedTime.scss';

type LappedTimeProps = {
    lappedTime: number[];
};

export default function LappedTime (props:LappedTimeProps) {

    const {lappedTime} = props;

    // keeps track of how many laps have been recorded
    let lapCount: number = 0;

    return (
        <div className="laps">
            <p className="laps_heading">Lapped Time</p>
            <div className="laps_recorded">
                {lappedTime.map((lap: number, index) => {

                    let hours: number= Math.floor(lap/ 3600);
                    let minutes: number= Math.floor((lap - (hours * 3600)) / 60);
                    let seconds: number= lap - (hours * 3600) - (minutes * 60);

                    let hoursFormat = hours < 10 ? `0${hours}` : hours;
                    let minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
                    let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

                    lapCount= index +1;

                    let lapFormat: string = `Lap ${lapCount}: ${hoursFormat}:${minutesFormat}:${secondsFormat}`;

                return (
                    <div key={index} data-testid="lap_test">
                        <p className="laps_time">{lapFormat}</p>
                    </div>
                )
                } )}
            </div>
        </div>
    )
}