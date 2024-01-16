// A separate component that represents the start, stop, and reset buttons.

import React from "react";

interface StopWatchButtonProps {
  onClick?: () => void;
  label: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  );
};

export default StopWatchButton;
