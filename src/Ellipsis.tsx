import React from "react";
import Dot from "./Dot";
import MovingDot from "./MovingDot";

// Interface for the position of a dot
interface DotPosition {
  x: number;
  y: number;
}

// Props for the Ellipsis component
interface EllipsisProps {
  outerRadius: number;
  dotsRadius: number;
  dots: number;
  movingDotRadius: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

// Style properties for a dot
interface DotStyle {
  dotColor: string;
  dotSize: number;
}

/**
 * The Ellipsis component renders a circular arrangement of dots and a moving dot
 * to represent the passage of time in a stopwatch.
 */
const Ellipsis: React.FC<EllipsisProps> = ({
  outerRadius,
  dotsRadius,
  dots,
  movingDotRadius,
  minutes,
  seconds,
  milliseconds,
}) => {
  // Calculate total milliseconds from minutes, seconds, and milliseconds
  const totalMilliseconds = minutes * 60000 + seconds * 1000 + milliseconds;

  // Size and center of the SVG container
  const size = 2 * (outerRadius + 10);
  const cx = size / 2;
  const cy = size / 2;

  // Function to calculate the positions of the dots on the ellipse
  const calculateDotPositions = (
    dots: number,
    radius: number
  ): DotPosition[] => {
    const positions: DotPosition[] = [];
    for (let i = 0; i < dots; i++) {
      const angle = ((2 * Math.PI) / dots) * i - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      positions.push({ x, y });
    }
    return positions;
  };

  // Calculate positions for each dot
  const dotPositions: DotPosition[] = calculateDotPositions(dots, dotsRadius);

  // Function to determine the color and size of each dot based on the current time
  const getColorAndSizeForDot = (
    dotIndex: number,
    totalDots: number,
    currentSecond: number
  ): DotStyle => {
    const dotsPerSecond = totalDots / 60;
    const lastColoredDotIndex = Math.floor(currentSecond * dotsPerSecond);
    let dotColor = "black";
    let dotSize = 1;
    if (dotIndex <= lastColoredDotIndex) {
      dotColor = "#27A397";
      dotSize = 4;
    }
    return { dotColor, dotSize };
  };

  // JSX for rendering the Ellipsis component
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter
            id="circle-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
            <feComponentTransfer in="offsetBlur" result="shadow">
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="#F3F7F7"
          stroke="white"
          strokeWidth="2"
          filter="url(#circle-shadow)"
        />
        {dotPositions.map((dot, index) => {
          const { dotColor, dotSize } = getColorAndSizeForDot(
            index,
            dots,
            seconds
          );
          return (
            <Dot
              key={index}
              index={index}
              x={dot.x}
              y={dot.y}
              color={dotColor}
              size={dotSize}
            />
          );
        })}
      </svg>
      <MovingDot
        radius={movingDotRadius}
        totalMilliseconds={totalMilliseconds}
        currentSecond={seconds}
        currentMillisecond={milliseconds}
      />
    </div>
  );
};

export default Ellipsis;
