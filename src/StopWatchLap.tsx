import React from "react";

interface LapProps {
    laps: Array<any>;
}

const StopWatchLap: React.FC<LapProps> = ({laps}) => {
    return (
        <section>
            {laps.length > 0 && (
                <ul className="laps">
                    {laps.map((lap, index) => (
                        <li key={index}>{lap}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default StopWatchLap;