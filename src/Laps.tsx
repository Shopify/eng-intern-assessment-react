import React from "react";

import "./Laps.css";

type LapProps = {
    laps: string[];
};

export default function Laps({ laps }: LapProps) {

    // Calculates the diff between 2 laps, and returns formatted time 
    const calculateLapDiff = (currLap: string, prevLap: string) => {
        // Convert time into ms count
        const parseTime = (timeStr: string) => {
            const [minutes, seconds, milliseconds] = timeStr.split(":").map(Number);
            return minutes * 60000 + seconds * 1000 + milliseconds;
        };

        // Find ms time difference between the laps
        const time1 = parseTime(currLap);
        const time2 = parseTime(prevLap);
        const timeDiff = time1 - time2;

        // Format time into minutes, seconds and milliseconds
        const minutes = Math.floor(timeDiff / 60000)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor((timeDiff % 60000) / 1000)
            .toString()
            .padStart(2, "0");
        const milliseconds = ((timeDiff % 100)).toString().padStart(2, "0");
        const resultString = `${minutes}:${seconds}:${milliseconds}`;
        return resultString;
    };

    return (
        <div className="laps-container">
            <div className="laps-title">
                <span className="lap-column">Lap #</span>
                <span className="lap-column">Lap Time</span>
                <span className="lap-column">Total Time</span>
            </div>

            {laps.map((lap, idx) => (
                <div key={idx} className="lap-row">
                    <span className="lap-column">Lap {idx + 1}</span>
                    <span className="lap-column">
                        {idx !== 0 ? calculateLapDiff(lap, laps[idx - 1]) : lap}
                    </span >
                    <span className="lap-column">{lap}</span>
                </div>
            ))}
        </div>
    );
}
