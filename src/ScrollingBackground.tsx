import React from 'react';
import './ScrollingBackground.css';

type ScrollingBackgroundProps = {
    isRunning: boolean;
    workout: number;
};

const ScrollingBackground: React.FC<ScrollingBackgroundProps> = ({ isRunning, workout }) => {
    // Base speed is 20 seconds, divided by workout stat for faster scrolling with higher workout
    const animationDuration = 20 / workout; 

    const backgroundStyle = {
        animation: `scrollBackground ${animationDuration}s linear infinite`,
        animationPlayState: isRunning ? 'running' : 'paused',
    };

    return (
        <div className="scrolling-background" style={backgroundStyle}>
            {/* Background content */}
        </div>
    );
};

export default ScrollingBackground;
