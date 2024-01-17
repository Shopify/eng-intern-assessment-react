import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
}

export default function StopWatchButton({
  onClick,
  label,
  disabled,
}: ButtonProps) {
  /**
   * Provides proper styling depending on button functionality.
   */
  const buttonStyle =
    label == "Start" || label == "Resume"
      ? "buttonStart"
      : label == "Pause"
      ? "buttonPause"
      : "buttonOther";

  return (
    <button
      id="button"
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
