import React from "react";

interface StopWatchButtonProps {
  Icon: React.JSX.Element;
  handleClick: () => void;
  buttonStyle?: string;
  alt?: string;
}

export default function StopWatchButton({
  Icon,
  handleClick,
  buttonStyle,
  alt,
}: StopWatchButtonProps) {
  return (
    <div className={buttonStyle} onClick={handleClick} title={alt}>
      {Icon}
    </div>
  );
}
