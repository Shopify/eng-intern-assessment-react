import React from "react";
import "./../css/NESBackground.css";

// define possible sizes of NESBackgroudn as a type
// example uses include title header, stats and record board
type NESBackgroundProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large"; // optional size prop
};

const NESBackground: React.FC<NESBackgroundProps> = ({
  children,
  size = "medium", // default size is medium
}) => {
  const className = `nes-background ${size}`;
  return <div className={className}>{children}</div>;
};

export default NESBackground;
