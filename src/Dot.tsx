import React from "react";

interface DotProps {
  x: number;
  y: number;
  color: string;
  index: number;
  size: number;
}

const Dot: React.FC<DotProps> = ({ x, y, index, color, size }) => {
  return <circle key={index} cx={x} cy={y} r={size} fill={color} />;
};

export default Dot;
