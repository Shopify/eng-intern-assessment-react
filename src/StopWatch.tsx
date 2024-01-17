import React from 'react';

interface StopWatchProps {
    time: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
    return <h1>{time}</h1>;
};

export default StopWatch;
