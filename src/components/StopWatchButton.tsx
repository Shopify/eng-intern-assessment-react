import React from "react";

import { twMerge } from "tailwind-merge";

interface ButtonProps {
  action: string;
  onClick: () => void;
  className?: string;
}

const StopWatchButton: React.FC<ButtonProps> = ({
  action,
  onClick,
  className,
}) => {
  return (
    <button
      className={twMerge("rounded-full p-3 min-w-28 bg-gray-300", className)}
      onClick={onClick}
    >
      {action}
    </button>
  );
};

export default StopWatchButton;
