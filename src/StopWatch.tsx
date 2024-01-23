import React from 'react';

interface StopwatchProps {
    time: number; 
}

// Stopwatch functional component receives time as a prop and renders the elapsed time
const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    return (
        <div>
            <div>
                <span>{time}</span> {/* Display the elapsed time */}
            </div>
        </div>
    );
};

export default Stopwatch; 

