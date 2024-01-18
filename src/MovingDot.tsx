import React from "react";

// Interface for the properties of the MovingDot component
interface MovingDotProps {
  radius: number; // The radius where the moving dot should be placed
  totalMilliseconds: number; // The total elapsed time in milliseconds
  currentSecond: number; // The current second (not used in this version)
  currentMillisecond: number; // The current millisecond (not used in this version)
}

/**
 * The MovingDot component represents a dot that moves along the circumference
 * of an imaginary circle, indicating the passage of time in the stopwatch.
 */
const MovingDot: React.FC<MovingDotProps> = ({ radius, totalMilliseconds }) => {
  // Size and center of the SVG container
  const size = 2 * (radius + 10);
  const cx = size / 2;
  const cy = size / 2;

  // Calculate the angle for the moving dot based on total milliseconds
  // The angle is adjusted to start from the top (-90 degrees)
  const angle = ((2 * Math.PI) / 60000) * totalMilliseconds - Math.PI / 2; // 60000 ms in a minute
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

  // Render the moving dot within an SVG container
  return (
    <svg
      width={size - 20}
      height={size - 20}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 30, left: 30 }}
    >
      <circle cx={x} cy={y} r="6" fill="#27A397" />
    </svg>
  );
};

export default MovingDot;
