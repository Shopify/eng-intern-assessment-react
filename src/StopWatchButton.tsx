import React from "react";

interface StopWatchButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * A reusable button component for the stopwatch controls.
 * @param {StopWatchButtonProps} props - The component props including label, onClick function, and optional disabled state.
 */
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  // Generate the CSS class for the button based on the label
  const buttonClass = `stopwatch-button stopwatch-button--${label.toLowerCase()}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default StopWatchButton;
