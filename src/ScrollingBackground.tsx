import React from "react";
import "./ScrollingBackground.css";
import MarioTrack from "../public/images/mario-track.png";

type ScrollingBackgroundProps = {
  isRunning: boolean;
  workout: number;
};

const ScrollingBackground: React.FC<ScrollingBackgroundProps> = ({
  isRunning,
  workout,
}) => {
  // calc animation duration based on the workout level
  // using 20s as a base duration
  // if workout is zero or isRunning is false, we don't want to move the background -> pause the animation
  const animationDuration = isRunning ? 20 / Math.max(workout, 1) : Infinity; // infinity to pause animation

  const backgroundStyle = {
    backgroundImage: `url(${MarioTrack})`,
    backgroundRepeat: "repeat-x",
    animation: `scrollBackground ${animationDuration}s linear infinite`,
    animationPlayState: isRunning ? "running" : "paused", // control animation state based on isRunning
  };

  return (
    <div className="scrolling-background" style={backgroundStyle}>
      {/* Background content */}
    </div>
  );
};

export default ScrollingBackground;
