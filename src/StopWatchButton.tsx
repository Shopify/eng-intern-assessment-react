import React from 'react';

type StopwatchButtonProps = {
  label: string;
  disable?: boolean ;
  onClick: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ label, disable = false, onClick }) => {
    return <button onClick={onClick} disabled={disable}>{label}</button>;
};

export default StopwatchButton;
