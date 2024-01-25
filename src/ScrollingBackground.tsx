import React from 'react';
import './ScrollingBackground.css';
import MarioTrack from '../public/images/mario-track.png';

type ScrollingBackgroundProps = {
    isRunning: boolean;
    workout: number;
};

const ScrollingBackground: React.FC<ScrollingBackgroundProps> = ({ isRunning, workout }) => {
    // The base speed will be adjusted based on the workout factor.
    // The lower the duration, the faster the animation will be.
    const animationDuration = 20 / workout;

    const backgroundStyle = {
        backgroundImage: `url(${MarioTrack})`,
        backgroundRepeat: 'repeat-x',
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
