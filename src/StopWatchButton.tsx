import React from 'react';

interface StopwatchButtonProps {
  onClick: () => void;
  label: string;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="stopwatch-button">
      {label}
    </button>
  );
};

export default StopwatchButton;
