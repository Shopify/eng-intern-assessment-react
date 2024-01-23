import React from "react";

// Function to format time
function formatTime(currentTime: number): string {
    const minutes: number = Math.floor(currentTime / 60);
    const seconds: number = currentTime % 60;
    const minutesFormatted: string = String(minutes).padStart(1, "0");
    const secondsFormatted: string = seconds.toFixed(2);
    const [secondInteger, decimalPart] = secondsFormatted.split(".");
    const millisecondsFormatted: string = decimalPart.padEnd(2, "0");

    return `${minutesFormatted}:${secondInteger}.${millisecondsFormatted}`;
}

interface StopwatchProps {
    time: number;
    laps?: number[];
}

const Stopwatch: React.FC<StopwatchProps> = ({ time, laps }) => {
    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <div>
                <h2>Laps</h2>
                {laps.map((lap, index) => (
                    <div key={index}>
                        {`Lap ${index + 1}:`}
                        <div>
                            {`Total Time: ${formatTime(lap)}`}
                            <div>
                                {" "}
                                {`Lap Time: ${
                                    index >= 1 ? formatTime(lap - laps[index - 1]) : formatTime(lap)
                                }`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stopwatch;
