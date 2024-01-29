import React from 'react';


interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <button className="stopwatch-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default StopWatchButton;