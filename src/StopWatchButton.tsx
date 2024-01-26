import React from 'react';
import './assets/stopWatchButton.css';

type StopwatchButtonProps = {
  label: string;
  disable?: boolean ;
  onClick: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ label, disable = false, onClick }) => {
    return <button className="stopwatch-button" onClick={onClick} disabled={disable}>{label}</button>;
};

export default StopwatchButton;
