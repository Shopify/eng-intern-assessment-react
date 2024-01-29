import React from "react";

interface StopWatchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default StopWatchButton;
