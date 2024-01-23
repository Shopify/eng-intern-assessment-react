import React from 'react';

interface StopwatchProps {
    time: number; 
}

// Stopwatch functional component receives time as a prop and renders the elapsed time
const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
    return (
        <div>
            <div>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
        </div>
    );
};

export default Stopwatch; 

