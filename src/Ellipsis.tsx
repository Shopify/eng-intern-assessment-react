import React from "react";
import Dot from "./Dot";
import MovingDot from "./MovingDot";

interface DotPosition {
  x: number;
  y: number;
}

interface EllipsisProps {
  outerRadius: number; // This will be the radius of the outer circle
  dotsRadius: number; // This will be the radius where the dots are placed
  dots: number;
  movingDotRadius: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

interface DotStyle {
  dotColor: string;
  dotSize: number;
}

const Ellipsis: React.FC<EllipsisProps> = ({
  outerRadius,
  dotsRadius,
  dots,
  movingDotRadius,
  minutes,
  seconds,
  milliseconds,
}) => {
  const totalMilliseconds = minutes * 60000 + seconds * 1000 + milliseconds;

  const size = 2 * (outerRadius + 10); // Add some padding around the outer circle
  const cx = size / 2;
  const cy = size / 2;

  // Styles to center the SVG container
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  const calculateDotPositions = (
    dots: number,
    radius: number
  ): DotPosition[] => {
    const positions: DotPosition[] = [];
    for (let i = 0; i < dots; i++) {
      // Subtract Math.PI / 2 to start from the top (12 o'clock position)
      const angle = ((2 * Math.PI) / dots) * i - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      positions.push({ x, y });
    }
    return positions;
  };

  const dotPositions: DotPosition[] = calculateDotPositions(dots, dotsRadius);

  // Function to determine the color of a dot based on the current second
  const getColorAndSizeForDot = (
    dotIndex: number,
    totalDots: number,
    currentSecond: number
  ): DotStyle => {
    const dotsPerSecond = totalDots / 60; // Assuming 60 seconds in a minute
    // Calculate the index of the last dot that should be colored for the current second
    const lastColoredDotIndex = Math.floor(currentSecond * dotsPerSecond);
    let dotColor = "black";
    let dotSize = 1;
    if (dotIndex <= lastColoredDotIndex) {
      dotColor = "#27A397";
      dotSize = 4;
    }
    return { dotColor: dotColor, dotSize: dotSize };
  };

  return (
    <div style={containerStyle}>
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
            {/*Softer blur*/}
            <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
            {/* Subtle offset */}
            <feComponentTransfer in="offsetBlur" result="shadow">
              <feFuncA type="linear" slope="0.2" />
              {/*Lowering opacity*/}
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer circle */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="#F3F7F7"
          stroke="white"
          strokeWidth="2"
          filter="url(#circle-shadow)" // Apply the shadow filter here
        />
        {/* Dots */}
        {dotPositions.map((dot, index) => {
          const { dotColor, dotSize } = getColorAndSizeForDot(
            index,
            dots,
            seconds
          );
          return (
            <Dot
              index={index} // Don't forget to use a key for list items
              x={dot.x}
              y={dot.y}
              color={dotColor}
              size={dotSize}
            />
          );
        })}
      </svg>
      {/* MovingDot component */}
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
