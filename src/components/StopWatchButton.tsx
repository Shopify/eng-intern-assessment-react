import React from "react";
import "./../css/Fonts.css";

type StopwatchButtonProps = {
  action: () => void;
  label: string;
  ariaLabel?: string; // optional aria-label prop
};

// StopwatchButton component handles button clicks for the stopwatch
export default function StopwatchButton({
  action,
  label,
  ariaLabel,
}: StopwatchButtonProps) {
  return (
    <button className="button" onClick={action} aria-label={ariaLabel || label}>
      {label}
    </button>
  );
}
