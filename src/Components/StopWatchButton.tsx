// A separate component that represents the start, stop, and reset buttons.

import React from "react";

interface StopWatchButtonProps {
  onClick?: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>Click</button>
    </>
  );
};

export default StopWatchButton;
