import React from "react";

// Interface to define the props for the StopWatchButton component
interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

// Reusable button component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ className, onClick, label, disabled = false }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default StopWatchButton;
