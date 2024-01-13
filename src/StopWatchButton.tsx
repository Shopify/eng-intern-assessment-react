import React from "react";

interface StopWatchButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  const buttonClass = `stopwatch-button stopwatch-button--${label.toLowerCase()}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default StopWatchButton;
