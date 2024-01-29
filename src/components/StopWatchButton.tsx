import React from 'react';

// Properties for a StopWatchButton component.
interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
}

// A StopWatch component that renders a button, requires a function and label (string).
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} style={{ margin: '5px' }}>
      {label}
    </button>
  );
};

export default StopWatchButton;