import React from 'react';

// Defining interface for props 
interface Props {
  onClick: () => void;
  label: string;
}

// Stopwatch button component
const StopwatchButton: React.FC<Props> = ({ onClick, label }) => {
      // Rendering the Stopwatch button component with label and onClick props
  return (
    <button className="control-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default StopwatchButton;
