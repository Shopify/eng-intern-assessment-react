import React from "react";
import { formatTime } from "./helperFunctions";

// Define props interface for component
interface TimeProps {
    time: number;
}

// Define type of functional component and pass in time props
const StopWatch: React.FC<TimeProps> = ({ time }) => {
    return (
        <>
            {/* Display formatted time from helper function */}
            <p>{formatTime(time)}</p>
        </>
    );
};

export default StopWatch;
