import React from 'react';

type StopwatchButtonProps = {
  label: string;
  action: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ label, action }) => {
  return (
    <button onClick={action}>
      {label}
    </button>
  );
};

export default StopwatchButton;