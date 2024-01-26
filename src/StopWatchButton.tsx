import React from "react";

interface ButtonProps {
  action: string;
  onClick: () => void;
}

const StopWatchButton: React.FC<ButtonProps> = ({ action, onClick }) => {
  return <button onClick={onClick}>{action}</button>;
};

export default StopWatchButton;
