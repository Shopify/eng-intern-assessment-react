import React from "react";
import { formatTime } from "./helpers/format-time";

interface StopWatchProps {
    /** Time to display in milliseconds*/
    time: number;
}

const StopWatch = ({ time }: StopWatchProps) => {
    return <div className="stop-watch-display">{formatTime(time)}</div>;
};

export default StopWatch;
