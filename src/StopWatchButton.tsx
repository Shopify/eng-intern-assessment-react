import React from "react";

// StopWatchButton interface to define the props that it is going to accept
interface StopWatchButtonProps {
  action: string;
  handleClick: () => void;
}

// The StopWatchButton component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  action,
  handleClick,
}) => {
  return (
    <button onClick={handleClick}>
      {action.charAt(0).toUpperCase() + action.slice(1)} {}
    </button>
  );
};

export default StopWatchButton;
