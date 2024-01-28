
import React from 'react';

//type setting
interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
}

//basic button template
const StopwatchButton: React.FC<StopWatchButtonProps> = ({onClick, label}) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

export default StopwatchButton;
