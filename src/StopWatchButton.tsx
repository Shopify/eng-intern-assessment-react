import React from 'react';

type StopWatchButtonProps = {
  label: string;
  onClick: () => void;
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
}) => {
  return <button onClick={onClick}>{label}</button>;
};

export default StopWatchButton;
