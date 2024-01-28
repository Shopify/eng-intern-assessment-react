import React from 'react';

// Interface to define the props for the StopWatchButton component
interface StopWatchButtonProps {
  onClick: () => void;
  label: string; 
}

// Reusable button component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} >
      {label}
    </button>
  );
};

export default StopWatchButton;
