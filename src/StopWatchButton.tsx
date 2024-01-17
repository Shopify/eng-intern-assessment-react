import React, { MouseEvent } from "react";

/**
 * Props for the StopWatchButton component.
 */

interface StopWatchButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  id: string;
  disabled?: boolean;
}

/**
 * A button component for controlling a stopwatch.
 *
 * @param {Function} props.onClick - the function to be called when the button is clicked.
 * @param {string} props.label - the label/text displayed on the button.
 * @param {string} props.id - the ID attribute for the button.
 * @param {boolean} props.disabled - optional prop to enable/disable button functionality.
 *
 * StopWatch -> StopWatchButton
 */

export default function StopWatchButton({
  onClick,
  label,
  id,
  disabled,
}: StopWatchButtonProps): JSX.Element {
  return (
    <button
      className="stopwatch-button"
      id={disabled ? "stopwatch-button-disabled" : id}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
