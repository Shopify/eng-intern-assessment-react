import React from "react";

interface MovingDotProps {
  radius: number;
  totalMilliseconds: number;
  currentSecond: number;
  currentMillisecond: number;
}

const MovingDot: React.FC<MovingDotProps> = ({ radius, totalMilliseconds }) => {
  const size = 2 * (radius + 10);
  const cx = size / 2;
  const cy = size / 2;

  // Calculate the angle based on total milliseconds
  const angle = ((2 * Math.PI) / 60000) * totalMilliseconds - Math.PI / 2; // 60000 ms in a minute
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

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
