import React from "react";

// Interface to define the props for the StopWatchButton component
interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

// Reusable button component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default StopWatchButton;
