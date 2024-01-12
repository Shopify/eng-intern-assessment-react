import React from 'react'
import "./StopWatch.css"

const StopWatch: React.FC = ({}) => {
    return(
        <div className="stopwatch-container">
            <div className="stopwatch-item">
                <span className="number">12</span>
                <span className="label">hrs</span>
            </div>
            <div className="stopwatch-item">
                <span className="number">34</span>
                <span className="label">min</span>
            </div>
            <div className="stopwatch-item">
                <span className="number">56</span>
                <span className="label">sec</span>
            </div>
        </div>
    );
};

export default StopWatch;