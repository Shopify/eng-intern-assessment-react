import React from "react";
import { formatTime } from "./helperFunctions";

interface TimeProps {
    time: number;
}

const StopWatch: React.FC<TimeProps> = ({ time }) => {
    return (
        <section>
            <p>{formatTime(time)}</p>
        </section>
    );
};

export default StopWatch;
