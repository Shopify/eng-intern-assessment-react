import React from "react";

// Interface for the properties of the Dot component
interface DotProps {
  x: number; // The x-coordinate of the dot's center
  y: number; // The y-coordinate of the dot's center
  color: string; // The fill color of the dot
  index: number; // The index of the dot (used for key when rendering in a list)
  size: number; // The radius of the dot
}

/**
 * The Dot component represents a single dot in the Ellipsis component.
 * It is rendered as a circle with specified coordinates, color, and size.
 */
const Dot: React.FC<DotProps> = ({ x, y, index, color, size }) => {
  // Render a circle element for the dot
  return <circle key={index} cx={x} cy={y} r={size} fill={color} />;
};

export default Dot;
