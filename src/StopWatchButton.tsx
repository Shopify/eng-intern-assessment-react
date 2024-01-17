import React from 'react'

interface StopWatchButtonProps {
    label: string;
    onClick: () => void;
  }
  
  /**
     * This component provides a template for all the buttons to use
     * It simply takes in a different label and onClick function 
     */
  const StopWatchButton: React.FC<StopWatchButtonProps> = ({ label, onClick }) => {
    return (
      <button onClick={onClick}>{label}</button>
    );
  };
  
  export default StopWatchButton;