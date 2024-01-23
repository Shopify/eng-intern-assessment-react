import React from "react";
import "../styles.css";

interface StopWatchButtonProps {
  text: string;
  handleClick: () => void;
  buttonStyle?: string;
  alt?: string;
}

export default function StopWatchButton({
  text,
  handleClick,
  buttonStyle,
  alt,
}: StopWatchButtonProps) {
  return (
    <div className={buttonStyle} onClick={handleClick} title={alt}>
      {text ? text : <img src={alt} alt={alt} />}
    </div>
  );
}
