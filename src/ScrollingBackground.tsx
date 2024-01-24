import React from 'react';
import './ScrollingBackground.css';

type ScrollingBackgroundProps = {
    isRunning: boolean;
    workout: number;
};

const ScrollingBackground: React.FC<ScrollingBackgroundProps> = ({ isRunning, workout }) => {
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
